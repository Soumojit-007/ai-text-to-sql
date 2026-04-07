from celery import Celery
from app.core.config import Settings

celery_app = Celery(
    "worker",
    broker=Settings.REDIS_URL,
    backend=Settings.REDIS_URL
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)