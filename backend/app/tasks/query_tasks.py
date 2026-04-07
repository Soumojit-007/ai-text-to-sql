from app.tasks.celery_worker import celery_app
from app.services.sql_service import generate_sql
from app.services.validation_service import validate_sql
from app.services.execution_service import execute_sql
from app.db.session import SessionLocal


@celery_app.task(bind=True, autoretry_for=(Exception,), retry_backoff=5, max_retries=3)
def process_query_task(self, question: str):
    db = SessionLocal()

    try:
        # Step 1: Generate SQL
        sql_query = generate_sql(question)

        # Step 2: Validate
        is_valid, error = validate_sql(sql_query)
        if not is_valid:
            return {"error": error}

        # Step 3: Execute
        result = execute_sql(sql_query, db)

        return {
            "question": question,
            "sql": sql_query,
            "result": result
        }

    finally:
        db.close()