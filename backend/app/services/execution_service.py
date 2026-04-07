from sqlalchemy.orm import Session
from sqlalchemy import text


def execute_sql(query: str, db: Session):
    try:
        result = db.execute(text(query))
        rows = result.fetchall()

        return [dict(row._mapping) for row in rows]

    except Exception as e:
        return {"error": str(e)}