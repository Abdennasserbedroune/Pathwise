"""Core Pydantic models used across the API."""

from pydantic import BaseModel, ConfigDict


class SchemaBase(BaseModel):
    """Base class for Pydantic schemas with ORM support."""

    model_config = ConfigDict(from_attributes=True)
