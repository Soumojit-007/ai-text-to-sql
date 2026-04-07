import hashlib
import json


def generate_cache_key(query: str) -> str:
    return hashlib.md5(query.encode()).hexdigest()


def serialize_response(data):
    try:
        return json.dumps(data)
    except Exception:
        return str(data)


def deserialize_response(data):
    try:
        return json.loads(data)
    except Exception:
        return data