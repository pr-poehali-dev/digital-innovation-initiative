import os
import json
import base64
import uuid
import psycopg2
import boto3


def handler(event: dict, context) -> dict:
    """Загружает reel-видео в S3 и сохраняет запись в БД."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    schema = os.environ['MAIN_DB_SCHEMA']
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    method = event.get('httpMethod', 'POST')

    if method == 'DELETE':
        body = json.loads(event.get('body') or '{}')
        reel_id = body.get('id')
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {schema}.reels WHERE id = {int(reel_id)}")
        conn.commit()
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
        }

    body = json.loads(event.get('body') or '{}')
    title = body.get('title', 'Reel')
    video_b64 = body.get('video')
    cover_b64 = body.get('cover')
    sort_order = int(body.get('sort_order', 0))

    video_key = f"reels/{uuid.uuid4()}.mp4"
    video_data = base64.b64decode(video_b64)
    s3.put_object(Bucket='files', Key=video_key, Body=video_data, ContentType='video/mp4')
    video_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{video_key}"

    cover_url = None
    if cover_b64:
        cover_key = f"reels/covers/{uuid.uuid4()}.jpg"
        cover_data = base64.b64decode(cover_b64)
        s3.put_object(Bucket='files', Key=cover_key, Body=cover_data, ContentType='image/jpeg')
        cover_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{cover_key}"

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cover_sql = f"'{cover_url}'" if cover_url else "NULL"
    cur.execute(f"""
        INSERT INTO {schema}.reels (title, video_url, cover_url, sort_order)
        VALUES ('{title}', '{video_url}', {cover_sql}, {sort_order})
        RETURNING id
    """)
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True, 'id': new_id, 'video_url': video_url, 'cover_url': cover_url}),
    }
