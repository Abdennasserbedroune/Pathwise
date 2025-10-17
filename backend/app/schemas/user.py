"""Pydantic representations for users."""

from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import EmailStr

from app.schemas.base import SchemaBase


class UserBase(SchemaBase):
    """Shared properties for user payloads."""

    email: EmailStr
    name: str | None = None
    image_url: str | None = None
    email_verified_at: datetime | None = None


class UserCreate(UserBase):
    """Schema used when creating a user from the API."""

    pass


class UserUpdate(SchemaBase):
    """Schema used when updating a user."""

    name: str | None = None
    image_url: str | None = None


class UserRead(UserBase):
    """Read model returned from the API."""

    id: UUID
    created_at: datetime
    updated_at: datetime
