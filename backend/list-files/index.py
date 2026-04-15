import os
import json
import boto3


def handler(event: dict, context) -> dict:
    """Листает файлы в S3 бакете и возвращает список по папкам."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': '',
        }

    prefix = (event.get('queryStringParameters') or {}).get('prefix', '')

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    key_id = os.environ['AWS_ACCESS_KEY_ID']
    resp = s3.list_objects_v2(Bucket='files', Prefix=prefix, MaxKeys=1000)
    contents = resp.get('Contents', [])
    truncated = resp.get('IsTruncated', False)

    files = []
    for obj in contents:
        key = obj['Key']
        url = f"https://cdn.poehali.dev/projects/{key_id}/bucket/{key}"
        files.append({'key': key, 'url': url, 'size': obj['Size']})

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'files': files, 'count': len(files), 'truncated': truncated, 'key_id': key_id}),
    }