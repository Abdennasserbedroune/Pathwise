from __future__ import annotations

import csv

from fastapi.testclient import TestClient

from backend.app import app

client = TestClient(app)


def _auth_header(token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {token}"}


def _to_rows(body: str) -> list[list[str]]:
    reader = csv.reader(line for line in body.splitlines())
    return [row for row in reader]


def test_resume_pdf_requires_authentication() -> None:
    response = client.get("/api/reports/resume/analysis-ava/export/pdf")
    assert response.status_code == 401


def test_resume_pdf_download_success() -> None:
    response = client.get(
        "/api/reports/resume/analysis-ava/export/pdf",
        headers=_auth_header("token-ava"),
    )
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("application/pdf")
    assert response.headers["content-disposition"].endswith(".pdf")
    assert response.content.startswith(b"%PDF")
    # The candidate name should be embedded in the PDF stream.
    assert b"Ava Adams" in response.content


def test_resume_exports_enforce_ownership() -> None:
    response = client.get(
        "/api/reports/resume/analysis-ava/export/pdf",
        headers=_auth_header("token-brandon"),
    )
    assert response.status_code == 403


def test_resume_csv_has_expected_columns() -> None:
    response = client.get(
        "/api/reports/resume/analysis-ava/export/csv",
        headers=_auth_header("token-ava"),
    )
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/csv")
    rows = _to_rows(response.text)
    assert rows[0] == [
        "Candidate",
        "Target Role",
        "Score",
        "Summary",
        "Strengths",
        "Improvements",
        "Feedback",
    ]
    assert rows[1][0] == "Ava Adams"
    assert "Quantified results" in rows[1][4]


def test_recruiter_batch_requires_recruiter_identity() -> None:
    response = client.get(
        "/api/reports/recruiter/batch/batch-recruiter-planetaria/export/pdf",
        headers=_auth_header("token-ava"),
    )
    assert response.status_code == 403


def test_recruiter_batch_pdf_success() -> None:
    response = client.get(
        "/api/reports/recruiter/batch/batch-recruiter-planetaria/export/pdf",
        headers=_auth_header("token-recruiter-leia"),
    )
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("application/pdf")
    assert b"Lead Product Manager" in response.content


def test_recruiter_batch_csv_lists_all_candidates() -> None:
    response = client.get(
        "/api/reports/recruiter/batch/batch-recruiter-planetaria/export/csv",
        headers=_auth_header("token-recruiter-leia"),
    )
    assert response.status_code == 200
    rows = _to_rows(response.text)
    header, *data_rows = rows
    assert header == [
        "Batch ID",
        "Job Title",
        "Candidate",
        "Target Role",
        "Score",
        "Top Strength",
        "Top Improvement",
    ]
    candidates = {row[2] for row in data_rows}
    assert candidates == {"Ava Adams", "Brandon Blake"}


def test_missing_resume_returns_not_found() -> None:
    response = client.get(
        "/api/reports/resume/missing/export/pdf",
        headers=_auth_header("token-ava"),
    )
    assert response.status_code == 404


def test_missing_batch_returns_not_found() -> None:
    response = client.get(
        "/api/reports/recruiter/batch/unknown/export/pdf",
        headers=_auth_header("token-recruiter-leia"),
    )
    assert response.status_code == 404


def test_resume_pdf_preview_sets_inline_content_disposition() -> None:
    response = client.get(
        "/api/reports/resume/analysis-ava/export/pdf",
        headers=_auth_header("token-ava"),
        params={"preview": "true"},
    )
    assert response.status_code == 200
    assert response.headers["content-disposition"].startswith("inline; filename=")


def test_batch_csv_preview_sets_inline_content_disposition() -> None:
    response = client.get(
        "/api/reports/recruiter/batch/batch-recruiter-planetaria/export/csv",
        headers=_auth_header("token-recruiter-leia"),
        params={"preview": "1"},
    )
    assert response.status_code == 200
    assert response.headers["content-disposition"].startswith("inline; filename=")
