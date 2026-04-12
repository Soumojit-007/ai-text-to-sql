from sqlalchemy import Column , Integer , String , DateTime , Text , ForeignKey
from datetime import datetime

from app.db.base import Base

class Query(Base):
    __tablename__ = "queries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    question = Column(Text, nullable=False)
    sql_query = Column(Text)
    result = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer , nullable=True)