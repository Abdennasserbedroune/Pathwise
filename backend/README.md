# Pathwise Backend

This directory contains the FastAPI service for Pathwise. It is configured with
Poetry for dependency management and exposes a minimal application skeleton with
health checks, Celery task wiring, and a Postgres-backed data model.

## Database schema

The application models the resume analysis workflow with SQLAlchemy ORM models
and Alembic migrations. The core entities are:

- **users** – Mirrors the NextAuth user profile. Each record stores contact
  details and metadata timestamps. Users own resume uploads, analyses, and
  comparison batches.
- **resume_uploads** – Captures metadata about uploaded resume files including
  storage details, processing status, and any failure messages. An upload may be
  analysed individually or as part of a batch.
- **resume_analyses** – Represents an analysis run for a specific upload. It
  tracks processing status, job context, summarised insights, and optional links
  to comparison batches. Each analysis exposes rich relationships to scores and
  feedback generated during processing.
- **analysis_scores** – Stores quantitative metrics for an analysis (e.g.
  keyword match scores). Each score is unique per `(analysis_id, metric_key)` and
  includes optional weighting and explanatory text.
- **feedback_items** – Provides qualitative, actionable guidance associated with
  an analysis. Items are categorised and prioritised via severity levels.
- **comparison_batches** – Groups resume uploads that should be processed
  together (bulk uploads). Batches hold presentation metadata and maintain the
  high-level lifecycle state for multi-resume comparisons.
- **batch_members** – Association table connecting uploads and generated
  analyses to a batch. It preserves ordering, primary selection, and optional
  labels for downstream presentation.

Entity highlights:

- A user can have many resume uploads and analyses.
- Each resume upload can spawn multiple analyses (e.g. reprocessing or
  different job targets).
- Comparison batches aggregate multiple uploads; batch members are created for
  every upload included in a batch and optionally reference the derived
  analysis once processing completes.
- Analyses expose both structured metrics (`analysis_scores`) and narrative
  feedback (`feedback_items`) to cover quantitative and qualitative insights.

The initial Alembic migration (`20241017_01_initial_schema`) provisions the full
schema and enumerations required by the models.

## Working with migrations

Alembic is configured via `alembic.ini` and the environment module in the
`alembic/` directory. To create or apply migrations:

```bash
poetry install
poetry run alembic upgrade head
poetry run alembic revision --autogenerate -m "describe change"
```

The Alembic environment loads FastAPI settings, so migrations automatically use
the same database connection string as the application.

## Environment configuration

Postgres connectivity is managed through URL-based settings that can be supplied
via shell environment variables or the `.env` files referenced by Pydantic
settings.

| Variable      | Description                                                     | Example                                                               |
|---------------|-----------------------------------------------------------------|-----------------------------------------------------------------------|
| `DATABASE_URL` | SQLAlchemy-style connection string used by FastAPI and Alembic. | `postgresql+psycopg://pathwise:password@localhost:5432/pathwise`       |

Copy `.env.example` to `.env` (and optionally `.env.local`) to customise the
connection string and other backend configuration values.
