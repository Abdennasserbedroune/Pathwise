# Pathwise

Pathwise is a career-focused web app offering AI-powered resume analysis and scoring. It helps job seekers improve their resumes with clear, personalized feedback, while enabling recruiters to upload and compare multiple CVs efficiently. Pathwise simplifies career decisions by providing actionable insights that guide users on their unique paths.

## Backend report exports

The FastAPI application under [`backend/`](backend/) now exposes export utilities for both job seekers requesting an individual resume review and recruiters downloading batch comparison summaries.

### Installation

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
```

### Running the server

```bash
uvicorn backend.app:app --reload
```

### Authentication tokens

Static bearer tokens are used to simplify the example authentication flow:

| Persona | Token header value |
| --- | --- |
| Ava Adams (job seeker) | `Bearer token-ava` |
| Brandon Blake (job seeker) | `Bearer token-brandon` |
| Camila Chen (job seeker) | `Bearer token-camila` |
| Leia Ortiz (recruiter) | `Bearer token-recruiter-leia` |
| Mason Harper (recruiter) | `Bearer token-recruiter-mason` |

### Export endpoints

| Audience | Endpoint | Description |
| --- | --- | --- |
| Job seeker | `GET /api/reports/resume/{analysis_id}/export/pdf` | Generates a rich PDF summarising score, strengths, improvements and AI feedback |
| Job seeker | `GET /api/reports/resume/{analysis_id}/export/csv` | Provides a CSV row representing the resume assessment |
| Recruiter | `GET /api/reports/recruiter/batch/{batch_id}/export/pdf` | Produces a PDF batch comparison for multiple resumes |
| Recruiter | `GET /api/reports/recruiter/batch/{batch_id}/export/csv` | Returns a CSV export listing each candidate in the batch |

### Sample identifiers

| Type | Identifier | Notes |
| --- | --- | --- |
| Resume analysis | `analysis-ava` | Ava Adams' individual resume feedback |
| Resume analysis | `analysis-brandon` | Brandon Blake's individual resume feedback |
| Recruiter batch | `batch-recruiter-planetaria` | Product management comparison for recruiter Leia |
| Recruiter batch | `batch-recruiter-orbital` | Data science comparison for recruiter Mason |

Each endpoint enforces access control: job seekers can only download their own resume reports, while recruiter exports require a matching recruiter token.

## Front-end download actions

A reusable React component lives in [`frontend/src/components/ReportExportButtons.tsx`](frontend/src/components/ReportExportButtons.tsx). It renders export buttons for resume and batch reports, handles loading states, and downloads file responses while respecting the browser’s security model.

### Component testing

```bash
cd frontend
npm install
npm test
```

Vitest and Testing Library validate the loading UX, error handling, and expected network requests for the client-side download helpers.

## Export formats

- **PDF** exports are rendered with ReportLab and include headline metadata, summaries, strengths, and AI feedback highlights.
- **CSV** exports summarise candidates in a machine-readable format for downstream tooling or analysis.

End-to-end tests covering authentication, content, and formatting expectations can be found in [`tests/test_reports.py`](tests/test_reports.py).

### Backend test suite

```bash
pytest
```
