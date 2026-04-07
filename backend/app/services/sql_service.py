from app.services.llm_service import get_llm
from app.tools.schema_retriever import get_schema_context


def generate_sql(question: str) -> str:
    llm = get_llm()

    schema_context = get_schema_context(question)

    prompt = f"""
    You are an expert SQL generator.

    Schema:
    {schema_context}

    Convert the following question into SQL:
    {question}

    Return ONLY SQL query.
    """

    response = llm.invoke(prompt)

    return response.content.strip()