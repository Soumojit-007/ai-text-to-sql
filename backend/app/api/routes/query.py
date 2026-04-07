from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.query_schema import QueryRequest, QueryResponse
from app.api.deps import get_db
from app.models.query import Query as QueryModel
from app.services.sql_service import generate_sql
from app.services.validation_service import validate_sql
from app.services.execution_service import execute_sql

router = APIRouter(prefix="/query", tags=["query"])


@router.post("/", response_model=QueryResponse)
def process_query(query_data: QueryRequest, db: Session = Depends(get_db)):
    # Step 1: Generate SQL
    sql_query = generate_sql(query_data.question)

    # Step 2: Validate SQL
    is_valid, error = validate_sql(sql_query)

    if not is_valid:
        raise HTTPException(status_code=400, detail=error)

    # Step 3: Execute SQL
    result = execute_sql(sql_query, db)

    # Step 4: Save to DB
    query_entry = QueryModel(
        question=query_data.question,
        sql_query=sql_query,
        result=str(result)
    )

    db.add(query_entry)
    db.commit()

    return QueryResponse(
        question=query_data.question,
        sql=sql_query,
        result=result
    )