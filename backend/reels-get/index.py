import os
import json
import psycopg2


def handler(event: dict, context) -> dict:
    """Возвращает список reels из базы данных."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    schema = os.environ['MAIN_DB_SCHEMA']

    cur.execute(f"""
        SELECT id, title, video_url, cover_url, sort_order
        FROM {schema}.reels
        ORDER BY sort_order ASC, created_at ASC
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    reels = [
        {'id': r[0], 'title': r[1], 'video_url': r[2], 'cover_url': r[3], 'sort_order': r[4]}
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'reels': reels}),
    }
