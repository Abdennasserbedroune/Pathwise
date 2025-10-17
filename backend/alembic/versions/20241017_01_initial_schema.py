"""Initial database schema.

Revision ID: 20241017_01
Revises: None
Create Date: 2024-10-17 00:00:00.000000
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "20241017_01"
down_revision = None
branch_labels = None
depends_on = None

resume_upload_status_enum = postgresql.ENUM(
    "pending", "processing", "completed", "failed", name="resume_upload_status"
)
resume_analysis_type_enum = postgresql.ENUM(
    "single", "comparison", name="resume_analysis_type"
)
resume_analysis_status_enum = postgresql.ENUM(
    "pending", "running", "completed", "failed", name="resume_analysis_status"
)
feedback_severity_enum = postgresql.ENUM(
    "low", "medium", "high", "critical", name="feedback_severity"
)
comparison_batch_status_enum = postgresql.ENUM(
    "pending", "processing", "completed", "failed", name="comparison_batch_status"
)


def upgrade() -> None:
    resume_upload_status_enum.create(op.get_bind(), checkfirst=True)
    resume_analysis_type_enum.create(op.get_bind(), checkfirst=True)
    resume_analysis_status_enum.create(op.get_bind(), checkfirst=True)
    feedback_severity_enum.create(op.get_bind(), checkfirst=True)
    comparison_batch_status_enum.create(op.get_bind(), checkfirst=True)

    op.create_table(
        "users",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=True),
        sa.Column("image_url", sa.String(length=1024), nullable=True),
        sa.Column("email_verified_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            server_onupdate=sa.text("now()"),
            nullable=False,
        ),
        sa.UniqueConstraint("email", name="uq_users_email"),
    )

    op.create_table(
        "resume_uploads",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("original_filename", sa.String(length=512), nullable=False),
        sa.Column("stored_filename", sa.String(length=512), nullable=False),
        sa.Column("storage_bucket", sa.String(length=255), nullable=True),
        sa.Column("content_type", sa.String(length=128), nullable=True),
        sa.Column("file_size_bytes", sa.Integer(), nullable=True),
        sa.Column(
            "upload_status",
            resume_upload_status_enum,
            server_default=sa.text("'pending'"),
            nullable=False,
        ),
        sa.Column("processed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("failure_reason", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            server_onupdate=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], ondelete="CASCADE", name="fk_resume_uploads_user_id"
        ),
    )
    op.create_index(
        op.f("ix_resume_uploads_user_id"), "resume_uploads", ["user_id"], unique=False
    )

    op.create_table(
        "comparison_batches",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("job_title", sa.String(length=255), nullable=True),
        sa.Column("job_posting_url", sa.String(length=1024), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column(
            "status",
            comparison_batch_status_enum,
            server_default=sa.text("'pending'"),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            server_onupdate=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], ondelete="CASCADE", name="fk_comparison_batches_user_id"
        ),
    )
    op.create_index(
        op.f("ix_comparison_batches_user_id"),
        "comparison_batches",
        ["user_id"],
        unique=False,
    )

    op.create_table(
        "resume_analyses",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("resume_upload_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("comparison_batch_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column(
            "analysis_type",
            resume_analysis_type_enum,
            server_default=sa.text("'single'"),
            nullable=False,
        ),
        sa.Column(
            "status",
            resume_analysis_status_enum,
            server_default=sa.text("'pending'"),
            nullable=False,
        ),
        sa.Column("model_version", sa.String(length=100), nullable=True),
        sa.Column("overall_score", sa.Float(), nullable=True),
        sa.Column("summary", sa.Text(), nullable=True),
        sa.Column("job_title", sa.String(length=255), nullable=True),
        sa.Column("job_description", sa.Text(), nullable=True),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            server_onupdate=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["resume_upload_id"],
            ["resume_uploads.id"],
            ondelete="CASCADE",
            name="fk_resume_analyses_resume_upload_id",
        ),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], ondelete="CASCADE", name="fk_resume_analyses_user_id"
        ),
        sa.ForeignKeyConstraint(
            ["comparison_batch_id"],
            ["comparison_batches.id"],
            ondelete="SET NULL",
            name="fk_resume_analyses_comparison_batch_id",
        ),
    )
    op.create_index(
        op.f("ix_resume_analyses_user_id"), "resume_analyses", ["user_id"], unique=False
    )
    op.create_index(
        op.f("ix_resume_analyses_comparison_batch_id"),
        "resume_analyses",
        ["comparison_batch_id"],
        unique=False,
    )

    op.create_table(
        "analysis_scores",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("analysis_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("metric_key", sa.String(length=100), nullable=False),
        sa.Column("metric_label", sa.String(length=255), nullable=True),
        sa.Column("category", sa.String(length=100), nullable=True),
        sa.Column("score_value", sa.Float(), nullable=True),
        sa.Column("max_score", sa.Float(), nullable=True),
        sa.Column("weight", sa.Float(), nullable=True),
        sa.Column("explanation", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            server_onupdate=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["analysis_id"],
            ["resume_analyses.id"],
            ondelete="CASCADE",
            name="fk_analysis_scores_analysis_id",
        ),
        sa.UniqueConstraint(
            "analysis_id",
            "metric_key",
            name="uq_analysis_scores_analysis_metric",
        ),
    )
    op.create_index(
        op.f("ix_analysis_scores_analysis_id"),
        "analysis_scores",
        ["analysis_id"],
        unique=False,
    )

    op.create_table(
        "feedback_items",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("analysis_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("category", sa.String(length=100), nullable=True),
        sa.Column("title", sa.String(length=255), nullable=True),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("recommendation", sa.Text(), nullable=True),
        sa.Column(
            "severity",
            feedback_severity_enum,
            server_default=sa.text("'medium'"),
            nullable=False,
        ),
        sa.Column("reference_context", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            server_onupdate=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["analysis_id"],
            ["resume_analyses.id"],
            ondelete="CASCADE",
            name="fk_feedback_items_analysis_id",
        ),
    )
    op.create_index(
        op.f("ix_feedback_items_analysis_id"),
        "feedback_items",
        ["analysis_id"],
        unique=False,
    )

    op.create_table(
        "batch_members",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("batch_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("resume_upload_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("resume_analysis_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("position", sa.Integer(), nullable=True),
        sa.Column(
            "is_primary",
            sa.Boolean(),
            server_default=sa.text("false"),
            nullable=False,
        ),
        sa.Column("label", sa.String(length=255), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            server_onupdate=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["batch_id"],
            ["comparison_batches.id"],
            ondelete="CASCADE",
            name="fk_batch_members_batch_id",
        ),
        sa.ForeignKeyConstraint(
            ["resume_upload_id"],
            ["resume_uploads.id"],
            ondelete="CASCADE",
            name="fk_batch_members_resume_upload_id",
        ),
        sa.ForeignKeyConstraint(
            ["resume_analysis_id"],
            ["resume_analyses.id"],
            ondelete="SET NULL",
            name="fk_batch_members_resume_analysis_id",
        ),
        sa.UniqueConstraint(
            "batch_id",
            "resume_upload_id",
            name="uq_batch_members_batch_resume",
        ),
        sa.UniqueConstraint(
            "resume_analysis_id",
            name="uq_batch_members_resume_analysis",
        ),
    )
    op.create_index(
        op.f("ix_batch_members_batch_id"), "batch_members", ["batch_id"], unique=False
    )
    op.create_index(
        op.f("ix_batch_members_resume_upload_id"),
        "batch_members",
        ["resume_upload_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_batch_members_resume_upload_id"), table_name="batch_members")
    op.drop_index(op.f("ix_batch_members_batch_id"), table_name="batch_members")
    op.drop_constraint("uq_batch_members_resume_analysis", "batch_members", type_="unique")
    op.drop_constraint("uq_batch_members_batch_resume", "batch_members", type_="unique")
    op.drop_constraint("fk_batch_members_resume_analysis_id", "batch_members", type_="foreignkey")
    op.drop_constraint("fk_batch_members_resume_upload_id", "batch_members", type_="foreignkey")
    op.drop_constraint("fk_batch_members_batch_id", "batch_members", type_="foreignkey")
    op.drop_table("batch_members")

    op.drop_index(op.f("ix_feedback_items_analysis_id"), table_name="feedback_items")
    op.drop_constraint("fk_feedback_items_analysis_id", "feedback_items", type_="foreignkey")
    op.drop_table("feedback_items")

    op.drop_index(op.f("ix_analysis_scores_analysis_id"), table_name="analysis_scores")
    op.drop_constraint(
        "uq_analysis_scores_analysis_metric", "analysis_scores", type_="unique"
    )
    op.drop_constraint(
        "fk_analysis_scores_analysis_id", "analysis_scores", type_="foreignkey"
    )
    op.drop_table("analysis_scores")

    op.drop_index(
        op.f("ix_resume_analyses_comparison_batch_id"),
        table_name="resume_analyses",
    )
    op.drop_index(op.f("ix_resume_analyses_user_id"), table_name="resume_analyses")
    op.drop_constraint(
        "fk_resume_analyses_comparison_batch_id",
        "resume_analyses",
        type_="foreignkey",
    )
    op.drop_constraint(
        "fk_resume_analyses_user_id", "resume_analyses", type_="foreignkey"
    )
    op.drop_constraint(
        "fk_resume_analyses_resume_upload_id",
        "resume_analyses",
        type_="foreignkey",
    )
    op.drop_table("resume_analyses")

    op.drop_index(op.f("ix_comparison_batches_user_id"), table_name="comparison_batches")
    op.drop_constraint(
        "fk_comparison_batches_user_id", "comparison_batches", type_="foreignkey"
    )
    op.drop_table("comparison_batches")

    op.drop_index(op.f("ix_resume_uploads_user_id"), table_name="resume_uploads")
    op.drop_constraint(
        "fk_resume_uploads_user_id", "resume_uploads", type_="foreignkey"
    )
    op.drop_table("resume_uploads")

    op.drop_constraint("uq_users_email", "users", type_="unique")
    op.drop_table("users")

    comparison_batch_status_enum.drop(op.get_bind(), checkfirst=True)
    feedback_severity_enum.drop(op.get_bind(), checkfirst=True)
    resume_analysis_status_enum.drop(op.get_bind(), checkfirst=True)
    resume_analysis_type_enum.drop(op.get_bind(), checkfirst=True)
    resume_upload_status_enum.drop(op.get_bind(), checkfirst=True)
