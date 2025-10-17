"""Resume-related ORM models."""

from __future__ import annotations

import enum
import uuid
from datetime import datetime
from typing import List, Optional, TYPE_CHECKING

from sqlalchemy import (
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base, TimestampMixin, UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from .comparison import BatchMember, ComparisonBatch
    from .user import User


class ResumeUploadStatus(enum.StrEnum):
    """Processing lifecycle for uploaded resumes."""

    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class ResumeAnalysisType(enum.StrEnum):
    """Scopes of resume analyses."""

    SINGLE = "single"
    COMPARISON = "comparison"


class ResumeAnalysisStatus(enum.StrEnum):
    """Processing state for resume analyses."""

    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class ResumeUpload(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Metadata about resume file uploads."""

    __tablename__ = "resume_uploads"

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    original_filename: Mapped[str] = mapped_column(String(512), nullable=False)
    stored_filename: Mapped[str] = mapped_column(String(512), nullable=False)
    storage_bucket: Mapped[str | None] = mapped_column(String(255), nullable=True)
    content_type: Mapped[str | None] = mapped_column(String(128), nullable=True)
    file_size_bytes: Mapped[int | None] = mapped_column(Integer, nullable=True)
    upload_status: Mapped[ResumeUploadStatus] = mapped_column(
        Enum(ResumeUploadStatus, name="resume_upload_status"),
        default=ResumeUploadStatus.PENDING,
        nullable=False,
    )
    processed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    failure_reason: Mapped[str | None] = mapped_column(Text, nullable=True)

    user: Mapped["User"] = relationship(back_populates="resume_uploads")
    analyses: Mapped[List["ResumeAnalysis"]] = relationship(
        back_populates="resume_upload", cascade="all, delete-orphan"
    )
    batch_members: Mapped[List["BatchMember"]] = relationship(
        back_populates="resume_upload", cascade="all, delete-orphan"
    )


class ResumeAnalysis(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Analysis results referencing a resume upload."""

    __tablename__ = "resume_analyses"

    resume_upload_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("resume_uploads.id", ondelete="CASCADE"), nullable=False
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    comparison_batch_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("comparison_batches.id", ondelete="SET NULL"), nullable=True
    )
    analysis_type: Mapped[ResumeAnalysisType] = mapped_column(
        Enum(ResumeAnalysisType, name="resume_analysis_type"),
        default=ResumeAnalysisType.SINGLE,
        nullable=False,
    )
    status: Mapped[ResumeAnalysisStatus] = mapped_column(
        Enum(ResumeAnalysisStatus, name="resume_analysis_status"),
        default=ResumeAnalysisStatus.PENDING,
        nullable=False,
    )
    model_version: Mapped[str | None] = mapped_column(String(100), nullable=True)
    overall_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    job_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    job_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    resume_upload: Mapped["ResumeUpload"] = relationship(back_populates="analyses")
    user: Mapped["User"] = relationship(back_populates="resume_analyses")
    comparison_batch: Mapped[Optional["ComparisonBatch"]] = relationship(
        back_populates="analyses"
    )
    scores: Mapped[List["AnalysisScore"]] = relationship(
        back_populates="analysis", cascade="all, delete-orphan"
    )
    feedback_items: Mapped[List["FeedbackItem"]] = relationship(
        back_populates="analysis", cascade="all, delete-orphan"
    )
    batch_member: Mapped[Optional["BatchMember"]] = relationship(
        back_populates="resume_analysis", uselist=False
    )


class AnalysisScore(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Quantitative metrics produced during an analysis."""

    __tablename__ = "analysis_scores"
    __table_args__ = (
        UniqueConstraint(
            "analysis_id",
            "metric_key",
            name="uq_analysis_scores_analysis_metric",
        ),
    )

    analysis_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("resume_analyses.id", ondelete="CASCADE"), nullable=False
    )
    metric_key: Mapped[str] = mapped_column(String(100), nullable=False)
    metric_label: Mapped[str | None] = mapped_column(String(255), nullable=True)
    category: Mapped[str | None] = mapped_column(String(100), nullable=True)
    score_value: Mapped[float | None] = mapped_column(Float, nullable=True)
    max_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    weight: Mapped[float | None] = mapped_column(Float, nullable=True)
    explanation: Mapped[str | None] = mapped_column(Text, nullable=True)

    analysis: Mapped["ResumeAnalysis"] = relationship(back_populates="scores")


class FeedbackSeverity(enum.StrEnum):
    """Severity levels for feedback items."""

    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class FeedbackItem(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Actionable feedback surfaced from an analysis."""

    __tablename__ = "feedback_items"

    analysis_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("resume_analyses.id", ondelete="CASCADE"), nullable=False
    )
    category: Mapped[str | None] = mapped_column(String(100), nullable=True)
    title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    recommendation: Mapped[str | None] = mapped_column(Text, nullable=True)
    severity: Mapped[FeedbackSeverity] = mapped_column(
        Enum(FeedbackSeverity, name="feedback_severity"),
        default=FeedbackSeverity.MEDIUM,
        nullable=False,
    )
    reference_context: Mapped[str | None] = mapped_column(Text, nullable=True)

    analysis: Mapped["ResumeAnalysis"] = relationship(back_populates="feedback_items")
