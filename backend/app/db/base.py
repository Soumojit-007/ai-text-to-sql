from sqlalchemy.orm import declarative_base

Base = declarative_base()

# 🔥 IMPORT ALL MODELS HERE (VERY IMPORTANT)
from app.models.user import User
from app.models.query import Query