"""Health check endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.get("", tags=["health"], summary="Service healthcheck")
def read_health() -> dict[str, str]:
    """Return a simple status response used by container orchestrators."""
    return {"status": "ok"}
