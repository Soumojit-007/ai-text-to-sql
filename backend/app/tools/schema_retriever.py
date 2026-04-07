from app.db.vector import collection


def get_schema_context(query: str) -> str:
    results = collection.query(
        query_texts=[query],
        n_results=3
    )

    docs = results.get("documents", [])

    return "\n".join([doc for sublist in docs for doc in sublist])


def schema_tool(query: str) -> str:
    return get_schema_context(query)