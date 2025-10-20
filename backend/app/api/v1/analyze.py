"""Endpoints offering lightweight resume analysis without paid models.

This module implements a pragmatic, dependency-light analysis routine that
extracts useful signals from plaintext resumes. It avoids external APIs and
runs entirely with Python standard libraries for predictable, free hosting.
"""

from __future__ import annotations

import math
import re
from typing import Iterable, List, Set

from fastapi import APIRouter

from app.schemas.analysis import (
    ContactSignals,
    FeedbackItem,
    Metric,
    ResumeAnalyzeRequest,
    ResumeAnalyzeResponse,
    SectionPresence,
)

router = APIRouter(prefix="/analyze", tags=["analysis"])


EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
PHONE_RE = re.compile(
    r"(?:(?:\+?\d{1,3}[\s.-])?(?:\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4})"
)
WORD_RE = re.compile(r"\b\w+\b", re.UNICODE)
SENTENCE_RE = re.compile(r"[^.!?]+[.!?]", re.UNICODE)

# Basic, representative skills/keywords. This can be extended safely without external deps.
DEFAULT_SKILLS: Set[str] = {
    "python",
    "java",
    "javascript",
    "typescript",
    "sql",
    "postgres",
    "mysql",
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "react",
    "node",
    "django",
    "flask",
    "fastapi",
    "c++",
    "c#",
    "go",
    "rust",
    "html",
    "css",
    "graphql",
    "tensorflow",
    "pytorch",
    "nlp",
    "machine learning",
    "ml",
    "ai",
}


def _word_count(text: str) -> int:
    return len(WORD_RE.findall(text))


def _sentence_count(text: str) -> int:
    return max(1, len(SENTENCE_RE.findall(text)))


def _contains_any(text: str, keys: Iterable[str]) -> List[str]:
    keys_norm = [k.lower() for k in keys]
    text_norm = text.lower()
    found: List[str] = []
    for k in keys_norm:
        if k in text_norm:
            found.append(k)
    return found


@router.post("/resume", response_model=ResumeAnalyzeResponse, summary="Analyze resume text")
def analyze_resume(payload: ResumeAnalyzeRequest) -> ResumeAnalyzeResponse:
    # Guardrail: enforce max size and mark truncated state if we cut input.
    original_text = payload.text
    truncated = False
    if len(original_text) > 100_000:
        text = original_text[:100_000]
        truncated = True
    else:
        text = original_text

    # Core signals
    word_count = _word_count(text)
    sentence_count = _sentence_count(text)
    emails = EMAIL_RE.findall(text)
    phones = PHONE_RE.findall(text)

    sections = SectionPresence(
        summary=any(s in text.lower() for s in ["summary", "objective", "profile"]),
        experience="experience" in text.lower() or "employment" in text.lower(),
        education="education" in text.lower(),
        projects="project" in text.lower() or "projects" in text.lower(),
        skills="skills" in text.lower() or "technologies" in text.lower(),
        certifications="certification" in text.lower() or "certifications" in text.lower(),
    )

    # Keyword detection
    detected_skills = sorted(set(_contains_any(text, DEFAULT_SKILLS)))

    # If a job description is available, also surface any overlaps
    if payload.job_description:
        jd_hits = _contains_any(payload.job_description, DEFAULT_SKILLS)
        for hit in jd_hits:
            if hit not in detected_skills:
                detected_skills.append(hit)
        detected_skills.sort()

    # Metrics (0-100)
    coverage_hits = sum(
        1
        for flag in [
            sections.summary,
            sections.experience,
            sections.education,
            sections.projects,
            sections.skills,
        ]
        if flag
    )
    coverage_score = (coverage_hits / 5) * 100.0

    length_optimal_low, length_optimal_high = 250, 900
    if word_count < length_optimal_low:
        length_score = max(0.0, (word_count / length_optimal_low) * 100.0)
    elif word_count > length_optimal_high:
        # Penalize overly long resumes.
        over = min(2_000, word_count)
        length_score = max(
            20.0, 100.0 - ((over - length_optimal_high) / (2_000 - length_optimal_high)) * 80.0
        )
    else:
        length_score = 100.0

    contact = ContactSignals(
        has_email=len(emails) > 0,
        has_phone=len(phones) > 0,
        email_count=len(emails),
        phone_count=len(phones),
    )
    contact_score = 100.0 if (contact.has_email and contact.has_phone) else 50.0 if contact.has_email else 0.0

    skills_score = min(100.0, (len(detected_skills) / 10) * 100.0)

    # Weighted aggregate
    overall = (
        0.30 * coverage_score
        + 0.20 * length_score
        + 0.30 * contact_score
        + 0.20 * skills_score
    )
    overall = round(overall, 1)

    metrics = {
        "coverage": Metric(key="coverage", label="Section coverage", value=round(coverage_score, 1)),
        "length": Metric(key="length", label="Length appropriateness", value=round(length_score, 1), details=f"{word_count} words, {sentence_count} sentences"),
        "contact": Metric(key="contact", label="Contact details present", value=round(contact_score, 1)),
        "skills": Metric(key="skills", label="Skills & keywords", value=round(skills_score, 1), details=f"{len(detected_skills)} detected"),
    }

    # Feedback generation
    feedback: List[FeedbackItem] = []
    if not contact.has_email:
        feedback.append(
            FeedbackItem(
                severity="high",
                message="No email address detected.",
                recommendation="Add a professional email to the header section.",
            )
        )
    if not contact.has_phone:
        feedback.append(
            FeedbackItem(
                severity="medium",
                message="No phone number detected.",
                recommendation="Consider adding a mobile number for recruiter outreach.",
            )
        )
    if coverage_hits < 4:
        feedback.append(
            FeedbackItem(
                severity="medium",
                message="Some core sections are missing (summary, experience, education, projects, skills).",
                recommendation="Add the missing sections to improve scanning and ATS parsing.",
            )
        )
    if word_count < length_optimal_low:
        feedback.append(
            FeedbackItem(
                severity="low",
                message="Resume appears too short.",
                recommendation="Expand experience bullets with measurable outcomes and impact.",
            )
        )
    elif word_count > 1200:
        feedback.append(
            FeedbackItem(
                severity="low",
                message="Resume may be overly long.",
                recommendation="Trim older roles or consolidate repetitive bullets.",
            )
        )

    return ResumeAnalyzeResponse(
        overall_score=overall,
        metrics=metrics,
        sections=sections,
        contact=contact,
        detected_skills=detected_skills,
        word_count=word_count,
        sentence_count=sentence_count,
        truncated=truncated,
        feedback=feedback,
    )
