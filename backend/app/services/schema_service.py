from app.db.session import SessionLocal
from sqlalchemy import text
from app.services.cache_service import get_cache, set_cache
import json

def get_db_schema():
    db = SessionLocal()
    try:
        result = db.execute(text("""
            SELECT table_name, column_name, data_type
            FROM information_schema.columns
            WHERE table_schema = 'public'
        """))
        schema = {}
        for row in result:
            table = row.table_name
            column = f"{row.column_name} ({row.data_type})"

            if table not in schema:
                schema[table] = []
            schema[table].append(column)
        return schema
    finally:
        db.close()


# 🔥 NEW (added, not replacing existing)
def get_db_schema_cached():
    cache_key = "db_schema"

    cached = get_cache(cache_key)
    if cached:
        return json.loads(cached)

    schema = get_db_schema()
    set_cache(cache_key, json.dumps(schema))

    return schema