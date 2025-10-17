"""Models for comparison batches and membership."""

from __future__ import annotations

import enum
import uuid
from typing import List, TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    Enum,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base, TimestampMixin, UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from .resume import ResumeAnalysis, ResumeUpload
    from .user import User


class ComparisonBatchStatus(enum.StrEnum):
    """Workflow states for resume comparison batches."""

    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class ComparisonBatch(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Groups of resume uploads processed together for comparison."""

    __tablename__ = "comparison_batches"

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    job_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    job_posting_url: Mapped[str | None] = mapped_column(String(1024), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[ComparisonBatchStatus] = mapped_column(
        Enum(ComparisonBatchStatus, name="comparison_batch_status"),
        default=ComparisonBatchStatus.PENDING,
        nullable=False,
    )

    user: Mapped["User"] = relationship(back_populates="comparison_batches")
    members: Mapped[List["BatchMember"]] = relationship(
        back_populates="batch", cascade="all, delete-orphan"
    )
    analyses: Mapped[List["ResumeAnalysis"]] = relationship(
        back_populates="comparison_batch"
    )


class BatchMember(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Link table associating uploads and analyses with a comparison batch."""

    __tablename__ = "batch_members"
    __table_args__ = (
        UniqueConstraint(
            "batch_id",
            "resume_upload_id",
            name="uq_batch_members_batch_resume",
        ),
        UniqueConstraint(
            "resume_analysis_id",
            name="uq_batch_members_resume_analysis",
        ),
    )

    batch_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("comparison_batches.id", ondelete="CASCADE"), nullable=False
    )
    resume_upload_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("resume_uploads.id", ondelete="CASCADE"), nullable=False
    )
    resume_analysis_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("resume_analyses.id", ondelete="SET NULL"), nullable=True
    )
    position: Mapped[int | None] = mapped_column(Integer, nullable=True)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    label: Mapped[str | None] = mapped_column(String(255), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    batch: Mapped["ComparisonBatch"] = relationship(back_populates="members")
    resume_upload: Mapped["ResumeUpload"] = relationship(back_populates="batch_members")
    resume_analysis: Mapped["ResumeAnalysis" | None] = relationship(
        back_populates="batch_member"
    )
