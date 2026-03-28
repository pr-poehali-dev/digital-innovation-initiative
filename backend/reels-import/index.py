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


def handler(event: dict, context) -> dict:
    """Импортирует видео с Яндекс.Диска в S3 и сохраняет в БД."""
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
    urls = body.get('urls', [])
    titles = body.get('titles', [])

    schema = os.environ['MAIN_DB_SCHEMA']
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    imported = []
    for i, public_url in enumerate(urls):
        title = titles[i] if i < len(titles) else f"Reel {i+1}"
        direct_url = get_yandex_direct_url(public_url)

        req = urllib.request.Request(direct_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            video_data = resp.read()

        key = f"reels/{uuid.uuid4()}.mp4"
        s3.put_object(Bucket='files', Key=key, Body=video_data, ContentType='video/mp4')
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

        cur.execute(f"""
            INSERT INTO {schema}.reels (title, video_url, cover_url, sort_order)
            VALUES ('{title}', '{cdn_url}', NULL, {i})
            RETURNING id
        """)
        new_id = cur.fetchone()[0]
        imported.append({'id': new_id, 'title': title, 'video_url': cdn_url})

    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True, 'imported': imported}),
    }
