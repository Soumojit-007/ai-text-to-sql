from app.db.vector import collection
from app.services.schema_service import get_db_schema_cached


def get_schema_context(query: str) -> str:
    results = collection.query(
        query_texts=[query],
        n_results=3
    )

    docs = results.get("documents", [])

    # flatten safely
    return "\n".join([doc for sublist in docs for doc in sublist]) if docs else ""


def schema_tool(query: str) -> str:
    return get_schema_context(query)


def retrieve_schema(query: str = ""):
    # 🔥 Step 1: Try vector search
    rag_context = get_schema_context(query)

    if rag_context:
        return rag_context

    # 🔥 Step 2: fallback to DB schema
    schema = get_db_schema_cached()

    formatted = ""
    for table, columns in schema.items():
        formatted += f"\nTable {table}:\n"   # ✅ FIXED spacing bug
        for col in columns:
            formatted += f" - {col}\n"

    return formatted