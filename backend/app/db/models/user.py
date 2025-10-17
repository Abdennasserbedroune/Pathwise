"""User model mirroring NextAuth expectations."""

from __future__ import annotations

from datetime import datetime
from typing import List, TYPE_CHECKING

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base, TimestampMixin, UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from .comparison import ComparisonBatch
    from .resume import ResumeAnalysis, ResumeUpload


class User(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """User accounts synchronized with NextAuth."""

    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(320), nullable=False, unique=True)
    name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(1024), nullable=True)
    email_verified_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    resume_uploads: Mapped[List["ResumeUpload"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    resume_analyses: Mapped[List["ResumeAnalysis"]] = relationship(
        back_populates="user"
    )
    comparison_batches: Mapped[List["ComparisonBatch"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
