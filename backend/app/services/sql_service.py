from app.services.llm_service import get_llm
from app.tools.schema_retriever import get_schema_context


def generate_sql(question: str) -> str:
    llm = get_llm()

    schema_context = get_schema_context(question)

    prompt = f"""
    You are an expert SQL generator.
    You are given database schema:

    {schema_context}

    Convert the following question into SQL:
    {question}

    Return ONLY SQL query.
    """

    response = llm.invoke(prompt)

    return response.content.strip()

def clean_sql(sql: str) -> str:
    sql = sql.replace("```sql", "").replace("```", "").strip()
    sql = sql.rstrip(";")
    if "limit" not in sql.lower():
        sql += " LIMIT 100"
    return sql