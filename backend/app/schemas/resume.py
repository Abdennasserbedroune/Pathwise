"""Schemas for resume uploads and analyses."""

from __future__ import annotations

from datetime import datetime
from typing import List
from uuid import UUID

from pydantic import Field

from app.db.models import (
    FeedbackSeverity,
    ResumeAnalysisStatus,
    ResumeAnalysisType,
    ResumeUploadStatus,
)
from app.schemas.base import SchemaBase


class AnalysisScoreBase(SchemaBase):
    """Shared fields for analysis score payloads."""

    metric_key: str
    metric_label: str | None = None
    category: str | None = None
    score_value: float | None = None
    max_score: float | None = None
    weight: float | None = None
    explanation: str | None = None


class AnalysisScoreRead(AnalysisScoreBase):
    """Read schema for analysis scores."""

    id: UUID
    analysis_id: UUID
    created_at: datetime
    updated_at: datetime


class FeedbackItemBase(SchemaBase):
    """Shared fields for feedback payloads."""

    category: str | None = None
    title: str | None = None
    message: str
    recommendation: str | None = None
    severity: FeedbackSeverity = FeedbackSeverity.MEDIUM
    reference_context: str | None = None


class FeedbackItemRead(FeedbackItemBase):
    """Read schema for feedback items."""

    id: UUID
    analysis_id: UUID
    created_at: datetime
    updated_at: datetime


class ResumeAnalysisBase(SchemaBase):
    """Shared properties for resume analysis payloads."""

    resume_upload_id: UUID
    user_id: UUID
    comparison_batch_id: UUID | None = None
    analysis_type: ResumeAnalysisType = ResumeAnalysisType.SINGLE
    status: ResumeAnalysisStatus = ResumeAnalysisStatus.PENDING
    model_version: str | None = None
    overall_score: float | None = None
    summary: str | None = None
    job_title: str | None = None
    job_description: str | None = None
    completed_at: datetime | None = None


class ResumeAnalysisRead(ResumeAnalysisBase):
    """Read schema for resume analyses."""

    id: UUID
    created_at: datetime
    updated_at: datetime
    scores: List[AnalysisScoreRead] = Field(default_factory=list)
    feedback_items: List[FeedbackItemRead] = Field(default_factory=list)


class ResumeUploadBase(SchemaBase):
    """Shared properties for resume upload payloads."""

    original_filename: str
    stored_filename: str
    storage_bucket: str | None = None
    content_type: str | None = None
    file_size_bytes: int | None = None
    upload_status: ResumeUploadStatus = ResumeUploadStatus.PENDING
    processed_at: datetime | None = None
    failure_reason: str | None = None


class ResumeUploadCreate(ResumeUploadBase):
    """Schema used when creating a resume upload."""

    user_id: UUID


class ResumeUploadRead(ResumeUploadBase):
    """Read schema including related analyses."""

    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime
    analyses: List[ResumeAnalysisRead] = Field(default_factory=list)


ResumeAnalysisRead.model_rebuild(
    update_locals={
        "AnalysisScoreRead": AnalysisScoreRead,
        "FeedbackItemRead": FeedbackItemRead,
    }
)
ResumeUploadRead.model_rebuild(
    update_locals={
        "ResumeAnalysisRead": ResumeAnalysisRead,
    }
)
