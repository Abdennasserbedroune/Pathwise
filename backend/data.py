"""Static data to simulate persistence for demo and testing purposes."""
from __future__ import annotations

from backend.models import BatchComparison, ResumeAnalysis


ANALYSIS_AVA = ResumeAnalysis(
    id="analysis-ava",
    user_id="seeker-ava",
    candidate_name="Ava Adams",
    target_role="Senior Product Manager",
    score=86,
    summary=(
        "Ava demonstrates strong ownership of cross-functional roadmaps and a data-driven "
        "approach to product discovery. Her resume clearly highlights measurable outcomes, "
        "though storytelling around customer empathy could be sharpened."
    ),
    strengths=[
        "Clear articulation of product discovery frameworks",
        "Quantified results for each flagship initiative",
        "Leadership experience across globally distributed teams",
    ],
    improvements=[
        "Add a concise executive summary tailored to product leadership roles",
        "Highlight collaboration with design and research partners",
    ],
    feedback=[
        "Consider adding a dedicated metrics section that surfaces the KPIs you improved",
        "Great use of action verbs – keep it consistent across all bullet points",
    ],
)

ANALYSIS_BRANDON = ResumeAnalysis(
    id="analysis-brandon",
    user_id="seeker-brandon",
    candidate_name="Brandon Blake",
    target_role="Growth Marketing Manager",
    score=78,
    summary=(
        "Brandon conveys a solid understanding of experimentation pipelines but lacks detail "
        "about campaign segmentation strategies. The narrative would benefit from more "
        "emphasis on stakeholder management and tooling."
    ),
    strengths=[
        "Strong experimentation cadence and reporting rigor",
        "Experience launching omnichannel growth loops",
    ],
    improvements=[
        "Clarify responsibility splits with sales leadership",
        "Quantify revenue impact for each campaign when possible",
    ],
    feedback=[
        "Detail the analytics stack you relied on for attribution",
        "Provide examples of audience segmentation and personalization",
    ],
)

ANALYSIS_CAMILA = ResumeAnalysis(
    id="analysis-camila",
    user_id="seeker-camila",
    candidate_name="Camila Chen",
    target_role="Data Scientist",
    score=91,
    summary=(
        "Camila’s resume tells a cohesive story about machine learning delivery. Her impact "
        "is well-supported with metrics, and the portfolio of projects reflects depth in both "
        "research and productionization."
    ),
    strengths=[
        "Publishes experiment results with thoughtful interpretation",
        "Experience deploying models with real-time monitoring",
        "Strong collaboration notes with engineering counterparts",
    ],
    improvements=[
        "Mention the size and makeup of the teams you led",
        "Surface your open-source or community contributions if available",
    ],
    feedback=[
        "Add a short section on data governance practices",
        "Consider a visual summary of model performance improvements",
    ],
)

RESUME_ANALYSES = {
    analysis.id: analysis
    for analysis in (ANALYSIS_AVA, ANALYSIS_BRANDON, ANALYSIS_CAMILA)
}

BATCH_COMPARISONS = {
    "batch-recruiter-planetaria": BatchComparison(
        id="batch-recruiter-planetaria",
        recruiter_id="recruiter-leia",
        job_title="Lead Product Manager",
        analyses=[ANALYSIS_AVA, ANALYSIS_BRANDON],
    ),
    "batch-recruiter-orbital": BatchComparison(
        id="batch-recruiter-orbital",
        recruiter_id="recruiter-mason",
        job_title="Principal Data Scientist",
        analyses=[ANALYSIS_CAMILA, ANALYSIS_AVA],
    ),
}
