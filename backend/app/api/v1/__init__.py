"""Versioned API routes."""

from fastapi import APIRouter

from . import analyze

router = APIRouter()

# Mount sub-routers
router.include_router(analyze.router)


@router.get("/status", tags=["meta"], summary="API status")
def read_status() -> dict[str, str]:
    """Return a simple status payload for the versioned API."""

    return {"status": "ok"}
