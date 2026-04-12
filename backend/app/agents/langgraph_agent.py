from typing import TypedDict, Optional, List
from langgraph.graph import StateGraph

from app.services.sql_service import generate_sql, clean_sql
from app.services.execution_service import execute_sql
from app.services.validation_service import validate_sql
from app.services.cache_service import set_cache
from app.utils.helpers import generate_cache_key, serialize_response
from app.db.session import SessionLocal
from app.tools.schema_retriever import retrieve_schema
# 🔥 STATE
class AgentState(TypedDict):
    question: str
    context: Optional[str] = None

    sql: Optional[str]
    result: Optional[List[dict]]

    error: Optional[str]


# 🔥 NODE 1: GENERATE SQL
def sql_node(state: AgentState):
    if state.get("error"):
        return state
    
    schema = retrieve_schema(state["question"])
    user_context = state.get("context" , "")

    prompt = f"""
    You are given database schema:
    {schema}

    Additional user context(if any):
    {user_context}

    Convert the following question into SQL:

    {state['question']}

    Return ONLY SQL query.
    """

    sql = generate_sql(prompt)
    # print("Before the clean" , sql)
    sql = clean_sql(sql)
    # print("After the clean" , sql)
    state["sql"] = sql
    return state


# 🔥 NODE 2: VALIDATE
def validate_node(state: AgentState):
    if state.get("error"):
        return state

    is_valid, error = validate_sql(state["sql"])

    if not is_valid:
        state["error"] = error

    return state


# 🔥 NODE 3: EXECUTE
def execute_node(state: AgentState):
    if state.get("error"):
        return state

    db = SessionLocal()
    try:
        result = execute_sql(state["sql"], db)
        state["result"] = result
    except Exception:
        state["error"] = "Query execution failed"
    finally:
        db.close()

    return state


# 🔥 NODE 4: CACHE
def cache_node(state: AgentState):
    if state.get("error"):
        return state

    key = generate_cache_key(state["question"]) + (state.get("context") or "")

    value = serialize_response({
        "sql": state["sql"],
        "result": state["result"]
    })

    set_cache(key, value)

    return state


# 🔥 BUILD GRAPH
def build_agent():
    graph = StateGraph(AgentState)

    graph.add_node("sql", sql_node)
    graph.add_node("validate", validate_node)
    graph.add_node("execute", execute_node)
    graph.add_node("cache", cache_node)

    # ✅ FIXED ENTRY POINT
    graph.set_entry_point("sql")

    # ✅ FIXED FLOW
    graph.add_edge("sql", "validate")
    graph.add_edge("validate", "execute")
    graph.add_edge("execute", "cache")

    return graph.compile()