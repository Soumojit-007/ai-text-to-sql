from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.query import Query
from app.api.deps import get_current_user
router = APIRouter(prefix="/history", tags=["history"])

@router.get("/")
def get_history(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)   # ✅ ADD
):
    return db.query(Query)\
        .filter(Query.user_id == user.id)\
        .order_by(Query.created_at.desc())\
        .all()