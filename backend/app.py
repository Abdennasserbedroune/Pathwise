from __future__ import annotations

import io

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import StreamingResponse

from backend import data
from backend.auth import ensure_can_access_batch, ensure_can_access_resume, get_identity
from backend.models import BatchComparison, ResumeAnalysis
from backend.reports import (
    generate_batch_csv,
    generate_batch_pdf,
    generate_resume_csv,
    generate_resume_pdf,
)

app = FastAPI(title="Pathwise API", version="1.0.0")


def _get_resume_analysis_or_404(analysis_id: str) -> ResumeAnalysis:
    analysis = data.RESUME_ANALYSES.get(analysis_id)
    if analysis is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume analysis not found",
        )
    return analysis


def _get_batch_or_404(batch_id: str) -> BatchComparison:
    batch = data.BATCH_COMPARISONS.get(batch_id)
    if batch is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recruiter batch not found",
        )
    return batch


@app.get("/api/reports/resume/{analysis_id}/export/pdf")
def export_resume_pdf(analysis_id: str, request: Request) -> StreamingResponse:
    identity = get_identity(request)
    analysis = _get_resume_analysis_or_404(analysis_id)
    ensure_can_access_resume(identity, analysis)

    pdf_bytes = generate_resume_pdf(analysis)
    filename = f"{analysis.candidate_name.replace(' ', '_').lower()}-{analysis.id}.pdf"
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
        },
    )


@app.get("/api/reports/resume/{analysis_id}/export/csv")
def export_resume_csv(analysis_id: str, request: Request) -> StreamingResponse:
    identity = get_identity(request)
    analysis = _get_resume_analysis_or_404(analysis_id)
    ensure_can_access_resume(identity, analysis)

    csv_bytes = generate_resume_csv(analysis)
    filename = f"{analysis.candidate_name.replace(' ', '_').lower()}-{analysis.id}.csv"
    return StreamingResponse(
        io.BytesIO(csv_bytes),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
        },
    )


@app.get("/api/reports/recruiter/batch/{batch_id}/export/pdf")
def export_batch_pdf(batch_id: str, request: Request) -> StreamingResponse:
    identity = get_identity(request)
    batch = _get_batch_or_404(batch_id)
    ensure_can_access_batch(identity, batch)

    pdf_bytes = generate_batch_pdf(batch)
    filename = f"{batch.job_title.replace(' ', '_').lower()}-{batch.id}.pdf"
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
        },
    )


@app.get("/api/reports/recruiter/batch/{batch_id}/export/csv")
def export_batch_csv(batch_id: str, request: Request) -> StreamingResponse:
    identity = get_identity(request)
    batch = _get_batch_or_404(batch_id)
    ensure_can_access_batch(identity, batch)

    csv_bytes = generate_batch_csv(batch)
    filename = f"{batch.job_title.replace(' ', '_').lower()}-{batch.id}.csv"
    return StreamingResponse(
        io.BytesIO(csv_bytes),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
        },
    )
