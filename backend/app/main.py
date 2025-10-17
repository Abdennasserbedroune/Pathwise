"""Application entrypoint."""

from fastapi import FastAPI

from app.api.routes import api_router
from app.core.config import settings

app = FastAPI(title=settings.project_name)
app.include_router(api_router, prefix=settings.api_v1_prefix)


@app.get("/", tags=["meta"], summary="API metadata")
def read_root() -> dict[str, str]:
    """Return a simple payload describing the API."""

    return {"message": "Welcome to Pathwise"}
