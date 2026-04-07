from pydantic import BaseModel
from datetime import datetime
from typing import Any, List, Optional


# Request Schema
class QueryRequest(BaseModel):
    question: str


# Response Schema
class QueryResponse(BaseModel):
    question: str
    sql: str
    result: Any


# DB Schema (History)
class QueryHistory(BaseModel):
    id: int
    user_id: Optional[int]
    question: str
    sql_query: Optional[str]
    result: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True