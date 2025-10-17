"""Application API routers."""

from fastapi import APIRouter

from . import health
from .v1 import router as v1_router

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health")
api_router.include_router(v1_router)
