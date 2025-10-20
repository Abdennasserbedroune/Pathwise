"""Schemas for lightweight, free resume analysis endpoints."""

from __future__ import annotations

from typing import Dict, List, Optional

from pydantic import Field, StringConstraints
from typing_extensions import Annotated

from app.schemas.base import SchemaBase


ResumeText = Annotated[str, StringConstraints(min_length=50, max_length=100_000)]


class ResumeAnalyzeRequest(SchemaBase):
    """Request payload for analyzing raw resume text."""

    text: ResumeText = Field(
        ..., description="Plaintext contents of the resume. No files required."
    )
    job_title: Optional[str] = Field(
        default=None, description="Optional target job title to tailor hints."
    )
    job_description: Optional[str] = Field(
        default=None,
        description="Optional job description to help keyword matching.",
    )


class SectionPresence(SchemaBase):
    summary: bool
    experience: bool
    education: bool
    projects: bool
    skills: bool
    certifications: bool


class ContactSignals(SchemaBase):
    has_email: bool
    has_phone: bool
    email_count: int = 0
    phone_count: int = 0


class Metric(SchemaBase):
    key: str
    label: str
    value: float
    max: float = 100.0
    details: Optional[str] = None


class FeedbackItem(SchemaBase):
    severity: str
    message: str
    recommendation: Optional[str] = None


class ResumeAnalyzeResponse(SchemaBase):
    overall_score: float = Field(ge=0.0, le=100.0)
    metrics: Dict[str, Metric]
    sections: SectionPresence
    contact: ContactSignals
    detected_skills: List[str] = Field(default_factory=list)
    word_count: int
    sentence_count: int
    truncated: bool = False
    feedback: List[FeedbackItem] = Field(default_factory=list)
