import os
import json
import uuid
import urllib.request
import urllib.parse
import psycopg2
import boto3


def get_yandex_direct_url(public_url: str) -> str:
    """Получает прямую ссылку на скачивание файла с Яндекс.Диска."""
    api = "https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key="
    api_url = api + urllib.parse.quote(public_url, safe='')
    req = urllib.request.Request(api_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read())
    return data["href"]


def download_and_upload(public_url: str, s3, aws_key_id: str) -> str:
    """Скачивает видео с ЯД и загружает в S3, возвращает CDN URL."""
    direct_url = get_yandex_direct_url(public_url)
    req = urllib.request.Request(direct_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        video_data = resp.read()
    key = f"reels/{uuid.uuid4()}.mp4"
    s3.put_object(Bucket='files', Key=key, Body=video_data, ContentType='video/mp4')
    return f"https://cdn.poehali.dev/projects/{aws_key_id}/bucket/{key}"


def handler(event: dict, context) -> dict:
    """Импортирует видео с Яндекс.Диска в S3. Поддерживает INSERT (items без id) и UPDATE (items с id)."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    body = json.loads(event.get('body') or '{}')
    items = body.get('items', [])

    schema = os.environ['MAIN_DB_SCHEMA']
    aws_key_id = os.environ['AWS_ACCESS_KEY_ID']
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=aws_key_id,
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    results = []
    for item in items:
        public_url = item.get('url')
        title = item.get('title', 'Reels')
        sort_order = item.get('sort_order', 0)
        replace_id = item.get('id')

        cdn_url = download_and_upload(public_url, s3, aws_key_id)

        if replace_id:
            cur.execute(f"""
                UPDATE {schema}.reels
                SET video_url = '{cdn_url}', title = '{title}', cover_url = NULL
                WHERE id = {int(replace_id)}
                RETURNING id
            """)
            row = cur.fetchone()
            results.append({'id': row[0] if row else replace_id, 'title': title, 'video_url': cdn_url, 'action': 'updated'})
        else:
            cur.execute(f"""
                INSERT INTO {schema}.reels (title, video_url, cover_url, sort_order)
                VALUES ('{title}', '{cdn_url}', NULL, {int(sort_order)})
                RETURNING id
            """)
            new_id = cur.fetchone()[0]
            results.append({'id': new_id, 'title': title, 'video_url': cdn_url, 'action': 'inserted'})

    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True, 'results': results}),
    }
