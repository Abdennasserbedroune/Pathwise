"""Versioned API routes."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/status", tags=["meta"], summary="API status")
def read_status() -> dict[str, str]:
    """Return a simple status payload for the versioned API."""

    return {"status": "ok"}
