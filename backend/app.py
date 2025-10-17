from __future__ import annotations

import io

from fastapi import FastAPI, HTTPException, Query, Request, status
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


def _build_streaming_response(
    payload: bytes,
    media_type: str,
    filename: str,
    preview: bool,
) -> StreamingResponse:
    disposition_type = "inline" if preview else "attachment"
    return StreamingResponse(
        io.BytesIO(payload),
        media_type=media_type,
        headers={
            "Content-Disposition": f"{disposition_type}; filename={filename}",
        },
    )


@app.get("/api/reports/resume/{analysis_id}/export/pdf")
def export_resume_pdf(
    analysis_id: str,
    request: Request,
    preview: bool = Query(
        False, description="Set to true to open the PDF inline instead of downloading."
    ),
) -> StreamingResponse:
    identity = get_identity(request)
    analysis = _get_resume_analysis_or_404(analysis_id)
    ensure_can_access_resume(identity, analysis)

    pdf_bytes = generate_resume_pdf(analysis)
    filename = f"{analysis.candidate_name.replace(' ', '_').lower()}-{analysis.id}.pdf"
    return _build_streaming_response(
        pdf_bytes,
        "application/pdf",
        filename,
        preview,
    )


@app.get("/api/reports/resume/{analysis_id}/export/csv")
def export_resume_csv(
    analysis_id: str,
    request: Request,
    preview: bool = Query(
        False, description="Set to true to open the CSV inline instead of downloading."
    ),
) -> StreamingResponse:
    identity = get_identity(request)
    analysis = _get_resume_analysis_or_404(analysis_id)
    ensure_can_access_resume(identity, analysis)

    csv_bytes = generate_resume_csv(analysis)
    filename = f"{analysis.candidate_name.replace(' ', '_').lower()}-{analysis.id}.csv"
    return _build_streaming_response(
        csv_bytes,
        "text/csv",
        filename,
        preview,
    )


@app.get("/api/reports/recruiter/batch/{batch_id}/export/pdf")
def export_batch_pdf(
    batch_id: str,
    request: Request,
    preview: bool = Query(
        False, description="Set to true to open the PDF inline instead of downloading."
    ),
) -> StreamingResponse:
    identity = get_identity(request)
    batch = _get_batch_or_404(batch_id)
    ensure_can_access_batch(identity, batch)

    pdf_bytes = generate_batch_pdf(batch)
    filename = f"{batch.job_title.replace(' ', '_').lower()}-{batch.id}.pdf"
    return _build_streaming_response(
        pdf_bytes,
        "application/pdf",
        filename,
        preview,
    )


@app.get("/api/reports/recruiter/batch/{batch_id}/export/csv")
def export_batch_csv(
    batch_id: str,
    request: Request,
    preview: bool = Query(
        False, description="Set to true to open the CSV inline instead of downloading."
    ),
) -> StreamingResponse:
    identity = get_identity(request)
    batch = _get_batch_or_404(batch_id)
    ensure_can_access_batch(identity, batch)

    csv_bytes = generate_batch_csv(batch)
    filename = f"{batch.job_title.replace(' ', '_').lower()}-{batch.id}.csv"
    return _build_streaming_response(
        csv_bytes,
        "text/csv",
        filename,
        preview,
    )
