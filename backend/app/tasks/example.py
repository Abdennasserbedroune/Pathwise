"""Example Celery tasks."""

from app.core.celery_app import celery_app


@celery_app.task(name="tasks.echo")
def echo(message: str) -> str:
    """Return the message back to the caller."""

    return message
