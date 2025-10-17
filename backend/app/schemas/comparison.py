"""Schemas for comparison batches and members."""

from __future__ import annotations

from datetime import datetime
from typing import List
from uuid import UUID

from pydantic import Field

from app.db.models import ComparisonBatchStatus
from app.schemas.base import SchemaBase


class BatchMemberBase(SchemaBase):
    """Shared properties for batch membership payloads."""

    batch_id: UUID
    resume_upload_id: UUID
    resume_analysis_id: UUID | None = None
    position: int | None = None
    is_primary: bool = False
    label: str | None = None
    notes: str | None = None


class BatchMemberRead(BatchMemberBase):
    """Read schema that includes related records."""

    id: UUID
    created_at: datetime
    updated_at: datetime
    resume_upload: "ResumeUploadRead | None" = None
    resume_analysis: "ResumeAnalysisRead | None" = None


class ComparisonBatchBase(SchemaBase):
    """Shared properties for comparison batch payloads."""

    user_id: UUID
    name: str | None = None
    description: str | None = None
    job_title: str | None = None
    job_posting_url: str | None = None
    notes: str | None = None
    status: ComparisonBatchStatus = ComparisonBatchStatus.PENDING


class ComparisonBatchRead(ComparisonBatchBase):
    """Read schema for comparison batches."""

    id: UUID
    created_at: datetime
    updated_at: datetime
    members: List[BatchMemberRead] = Field(default_factory=list)
    analyses: List["ResumeAnalysisRead"] = Field(default_factory=list)


# Resolve forward references once importing modules is complete.
from app.schemas.resume import ResumeAnalysisRead, ResumeUploadRead

BatchMemberRead.model_rebuild(
    update_locals={
        "ResumeUploadRead": ResumeUploadRead,
        "ResumeAnalysisRead": ResumeAnalysisRead,
    }
)
ComparisonBatchRead.model_rebuild(
    update_locals={
        "BatchMemberRead": BatchMemberRead,
        "ResumeAnalysisRead": ResumeAnalysisRead,
    }
)
