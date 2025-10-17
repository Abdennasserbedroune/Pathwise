from __future__ import annotations

from dataclasses import dataclass, field
from typing import List


@dataclass(slots=True)
class ResumeAnalysis:
    """Stores the result of a single AI-driven resume analysis."""

    id: str
    user_id: str
    candidate_name: str
    target_role: str
    score: int
    summary: str
    strengths: List[str] = field(default_factory=list)
    improvements: List[str] = field(default_factory=list)
    feedback: List[str] = field(default_factory=list)


@dataclass(slots=True)
class BatchComparison:
    """Represents a recruiter-facing comparison across multiple resumes."""

    id: str
    recruiter_id: str
    job_title: str
    analyses: List[ResumeAnalysis] = field(default_factory=list)
