"""Application entrypoint."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import api_router
from app.core.config import settings

app = FastAPI(title=settings.project_name)

# CORS configuration to allow the frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.api_v1_prefix)


@app.get("/", tags=["meta"], summary="API metadata")
def read_root() -> dict[str, str]:
    """Return a simple payload describing the API."""

    return {"message": "Welcome to Pathwise"}
