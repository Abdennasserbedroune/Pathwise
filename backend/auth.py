from __future__ import annotations

from dataclasses import dataclass
from typing import Literal, Optional, TypedDict

from fastapi import HTTPException, Request, status

from backend.models import BatchComparison, ResumeAnalysis

Role = Literal["job_seeker", "recruiter"]


class TokenRecord(TypedDict, total=False):
    role: Role
    user_id: str
    recruiter_id: str


@dataclass(slots=True)
class Identity:
    token: str
    role: Role
    user_id: Optional[str] = None
    recruiter_id: Optional[str] = None


TOKENS: dict[str, TokenRecord] = {
    "token-ava": {"role": "job_seeker", "user_id": "seeker-ava"},
    "token-brandon": {"role": "job_seeker", "user_id": "seeker-brandon"},
    "token-camila": {"role": "job_seeker", "user_id": "seeker-camila"},
    "token-recruiter-leia": {"role": "recruiter", "recruiter_id": "recruiter-leia"},
    "token-recruiter-mason": {"role": "recruiter", "recruiter_id": "recruiter-mason"},
}


def get_identity(request: Request) -> Identity:
    """Extract and validate the caller identity using a static bearer token."""

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing bearer token",
        )

    token = auth_header.split(" ", 1)[1].strip()
    payload = TOKENS.get(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
        )

    role = payload.get("role")
    if role is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
        )

    identity = Identity(
        token=token,
        role=role,
        user_id=payload.get("user_id"),
        recruiter_id=payload.get("recruiter_id"),
    )
    return identity


def ensure_can_access_resume(identity: Identity, analysis: ResumeAnalysis) -> None:
    """Authorize access to a single resume analysis."""

    if identity.role != "job_seeker" or identity.user_id != analysis.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to export this resume analysis.",
        )


def ensure_can_access_batch(identity: Identity, batch: BatchComparison) -> None:
    """Authorize access to recruiter batch comparisons."""

    if identity.role != "recruiter" or identity.recruiter_id != batch.recruiter_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to export this recruiter batch.",
        )
