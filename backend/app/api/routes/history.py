from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.query import Query

router = APIRouter(prefix="/history", tags=["history"])

@router.get("/")
def get_history(db: Session = Depends(get_db)):
    queries = db.query(Query).order_by(Query.created_at.desc()).limit(50).all()

    return queries