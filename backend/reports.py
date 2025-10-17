"""Utilities for exporting resume and recruiter batch reports."""
from __future__ import annotations

import csv
import io
from datetime import datetime
from typing import Iterable

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

from backend.models import BatchComparison, ResumeAnalysis

LEFT_MARGIN = 60
LINE_HEIGHT = 16


def _build_canvas(title: str) -> tuple[canvas.Canvas, float, io.BytesIO]:
    buffer = io.BytesIO()
    pdf_canvas = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    pdf_canvas.setTitle(title)
    pdf_canvas.setFont("Helvetica-Bold", 18)
    pdf_canvas.drawString(LEFT_MARGIN, height - 60, title)

    pdf_canvas.setFont("Helvetica", 10)
    pdf_canvas.drawString(
        LEFT_MARGIN,
        height - 78,
        f"Generated {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}",
    )

    pdf_canvas.setFont("Helvetica", 12)
    return pdf_canvas, height - 110, buffer


def _draw_multiline_text(pdf_canvas: canvas.Canvas, x: float, y: float, lines: Iterable[str]) -> float:
    text = pdf_canvas.beginText(x, y)
    text.setFont("Helvetica", 11)
    for line in lines:
        text.textLine(line)
    pdf_canvas.drawText(text)
    return text.getY() - LINE_HEIGHT


def generate_resume_pdf(analysis: ResumeAnalysis) -> bytes:
    pdf_canvas, cursor_y, buffer = _build_canvas(
        f"Resume Analysis • {analysis.candidate_name}"
    )

    cursor_y = _draw_multiline_text(
        pdf_canvas,
        LEFT_MARGIN,
        cursor_y,
        [
            f"Candidate: {analysis.candidate_name}",
            f"Target role: {analysis.target_role}",
            f"Score: {analysis.score}/100",
            "",
            "Summary:",
            analysis.summary,
        ],
    )

    cursor_y -= LINE_HEIGHT
    cursor_y = _draw_multiline_text(
        pdf_canvas,
        LEFT_MARGIN,
        cursor_y,
        [
            "Strength highlights:",
            *[f" • {strength}" for strength in analysis.strengths],
            "",
            "Recommendations:",
            *[f" • {item}" for item in analysis.improvements],
        ],
    )

    if analysis.feedback:
        cursor_y -= LINE_HEIGHT
        cursor_y = _draw_multiline_text(
            pdf_canvas,
            LEFT_MARGIN,
            cursor_y,
            [
                "AI feedback cues:",
                *[f" • {point}" for point in analysis.feedback],
            ],
        )

    pdf_canvas.save()
    buffer.seek(0)
    return buffer.getvalue()


def generate_resume_csv(analysis: ResumeAnalysis) -> bytes:
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow([
        "Candidate",
        "Target Role",
        "Score",
        "Summary",
        "Strengths",
        "Improvements",
        "Feedback",
    ])
    writer.writerow(
        [
            analysis.candidate_name,
            analysis.target_role,
            analysis.score,
            analysis.summary,
            " | ".join(analysis.strengths),
            " | ".join(analysis.improvements),
            " | ".join(analysis.feedback),
        ]
    )
    return buffer.getvalue().encode("utf-8")


def generate_batch_pdf(batch: BatchComparison) -> bytes:
    pdf_canvas, cursor_y, buffer = _build_canvas(f"Recruiter Batch • {batch.job_title}")

    cursor_y = _draw_multiline_text(
        pdf_canvas,
        LEFT_MARGIN,
        cursor_y,
        [
            f"Batch ID: {batch.id}",
            f"Job title: {batch.job_title}",
            f"Resumes compared: {len(batch.analyses)}",
            "",
            "Candidate overview:",
        ],
    )

    for index, analysis in enumerate(batch.analyses, start=1):
        cursor_y = _draw_multiline_text(
            pdf_canvas,
            LEFT_MARGIN + 10,
            cursor_y,
            [
                f"{index}. {analysis.candidate_name} — score {analysis.score}/100",
                f"Target role: {analysis.target_role}",
                f"Top strength: {analysis.strengths[0] if analysis.strengths else 'N/A'}",
                f"Focus area: {analysis.improvements[0] if analysis.improvements else 'N/A'}",
                "",
            ],
        )
        if cursor_y < 100:
            pdf_canvas.showPage()
            pdf_canvas.setFont("Helvetica", 12)
            cursor_y = letter[1] - 120

    pdf_canvas.save()
    buffer.seek(0)
    return buffer.getvalue()


def generate_batch_csv(batch: BatchComparison) -> bytes:
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow([
        "Batch ID",
        "Job Title",
        "Candidate",
        "Target Role",
        "Score",
        "Top Strength",
        "Top Improvement",
    ])
    for analysis in batch.analyses:
        writer.writerow(
            [
                batch.id,
                batch.job_title,
                analysis.candidate_name,
                analysis.target_role,
                analysis.score,
                analysis.strengths[0] if analysis.strengths else "",
                analysis.improvements[0] if analysis.improvements else "",
            ]
        )
    return buffer.getvalue().encode("utf-8")
