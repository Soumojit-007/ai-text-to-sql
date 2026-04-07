from app.services.llm_service import get_llm


def sql_generator_tool(question: str, schema: str) -> str:
    llm = get_llm()

    prompt = f"""
    Schema:
    {schema}

    Convert to SQL:
    {question}

    Return only SQL.
    """

    response = llm.invoke(prompt)

    return response.content.strip()