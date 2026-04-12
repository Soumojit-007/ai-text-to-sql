from fastapi import APIRouter
from app.schemas.query_schema import QueryRequest
from app.services.sql_service import generate_sql, clean_sql
from app.tools.schema_retriever import retrieve_schema

router = APIRouter(prefix="/generate-sql", tags=["generate-sql"])


@router.post("/")
def generate_sql_only(query: QueryRequest):

    schema = retrieve_schema(query.question)

    prompt = f"""
You are an expert SQL generator.

Convert the following natural language question into a clean, valid SQL query.

=====================
DATABASE SCHEMA:
{schema}

USER QUESTION:
{query.question}

ADDITIONAL CONTEXT:
{query.context}
=====================

INSTRUCTIONS:

1. If DATABASE SCHEMA is NOT empty:
   - Use ONLY the tables and columns present in the schema
   - Do NOT invent or assume any new table or column names

2. If DATABASE SCHEMA is empty:
   - Infer reasonable table and column names based on the question
   - Use conventional naming such as: id, name, email, salary, created_at, user_id

3. Keep the query SIMPLE and practical:
   - Avoid unnecessary joins unless clearly required
   - Prefer a single table when possible

4. Handle ambiguity carefully:
   - "top" → ORDER BY a relevant numeric column (e.g., salary, amount, count) DESC
   - If no clear metric exists, use id or a reasonable default

5. Always:
   - Use LIMIT when question implies restriction (e.g., top 5)
   - Use ORDER BY when ranking is implied
   - Use valid PostgreSQL syntax

6. Do NOT:
   - Add explanations
   - Add comments
   - Use markdown formatting
   - Ask questions

7. Output MUST:
   - Contain ONLY the SQL query
   - Be clean and executable

=====================
OUTPUT:
Return ONLY the SQL query.
"""

    sql = generate_sql(prompt)
    sql = clean_sql(sql)

    return {"sql": sql}