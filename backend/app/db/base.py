"""Base metadata for Alembic migrations."""

from app.db.base_class import Base
from app.db import models  # noqa: F401

__all__ = ["Base"]
