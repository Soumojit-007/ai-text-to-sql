from sqlalchemy import text
from app.db.session import SessionLocal


def query_executor_tool(sql: str):
    db = SessionLocal()

    try:
        result = db.execute(text(sql))
        rows = result.fetchall()

        return [dict(row._mapping) for row in rows]

    except Exception as e:
        return {"error": str(e)}

    finally:
        db.close()