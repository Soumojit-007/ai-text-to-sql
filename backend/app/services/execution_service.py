from sqlalchemy.orm import Session
from sqlalchemy import text


def execute_sql(query: str, db: Session):
    try:
        result = db.execute(text(query))

        # ✅ Handle SELECT
        if result.returns_rows:
            rows = result.fetchall()
            return [dict(row._mapping) for row in rows]

        # ✅ Handle INSERT / UPDATE / DELETE
        db.commit()
        return {"message": "Query executed successfully"}

    except Exception as e:
        return {"error": str(e)}