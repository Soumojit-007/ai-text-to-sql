from app.db.redis import redis_client
from app.core.constants import CACHE_TTL_SECONDS

def get_cache(key: str):
    return redis_client.get(key)

def set_cache(key: str, value: str):
    redis_client.setex(key, CACHE_TTL_SECONDS, value)