from langgraph.graph import StateGraph
from typing import TypedDict

from app.tools.sql_generator import sql_generator_tool
from app.tools.schema_retriever import schema_tool
from app.tools.query_executor import query_executor_tool


class AgentState(TypedDict):
    question: str
    schema: str
    sql: str
    result: list


def retrieve_schema(state: AgentState):
    state["schema"] = schema_tool(state["question"])
    return state


def generate_sql(state: AgentState):
    state["sql"] = sql_generator_tool(state["question"], state["schema"])
    return state


def execute_query(state: AgentState):
    state["result"] = query_executor_tool(state["sql"])
    return state


def build_agent():
    graph = StateGraph(AgentState)

    graph.add_node("schema", retrieve_schema)
    graph.add_node("sql", generate_sql)
    graph.add_node("execute", execute_query)

    graph.set_entry_point("schema")
    graph.add_edge("schema", "sql")
    graph.add_edge("sql", "execute")

    return graph.compile()