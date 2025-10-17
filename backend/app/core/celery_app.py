"""Celery application instance."""

from celery import Celery

from app.core.config import settings

celery_app = Celery(
    "pathwise",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
)

celery_app.conf.update(
    task_default_queue="default",
    timezone="UTC",
    enable_utc=True,
)

celery_app.autodiscover_tasks(["app.tasks"])
