const highlights = [
  {
    title: "Resume intelligence",
    description:
      "Use AI-driven heuristics to score resumes, surface strengths, and flag gaps before recruiters do.",
  },
  {
    title: "Collaboration ready",
    description:
      "Invite hiring managers, track feedback threads, and export structured summaries for stakeholders.",
  },
  {
    title: "Automation friendly",
    description:
      "Connect to Applicant Tracking Systems and trigger Celery workflows for bulk resume analysis.",
  },
];

const stack = [
  "Next.js 14 + TailwindCSS",
  "FastAPI & SQLAlchemy",
  "Celery + Redis workers",
  "Postgres 15",
  "spaCy & Hugging Face transformers",
];

export default function HomePage() {
  return (
    <div className="container mx-auto flex max-w-5xl flex-col gap-24 px-6 py-16">
      <section className="space-y-6 text-center animate-in-up">
        <span className="inline-flex max-w-max items-center gap-2 px-3 py-1 text-xs font-medium tracking-wide text-[var(--brand)]">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand)]" aria-hidden="true" /> AI résumé copilots
        </span>
        <h1 className="text-balance text-4xl font-semibold sm:text-5xl">
          Build a collaborative résumé intelligence workflow for job seekers and recruiters.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
          Pathwise combines AI critique, actionable recommendations, and recruiter-ready exports so your team can iterate on career stories with confidence.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://www.pathwise.ai"
            className="rounded-md px-6 py-3 text-sm font-semibold shadow-sm transition"
            style={{ backgroundColor: 'var(--brand)', color: 'var(--brand-contrast)' }}
          >
            Request early access
          </a>
          <a
            href="#workflow"
            className="rounded-md border px-6 py-3 text-sm font-semibold transition border-[var(--border)] text-[var(--foreground)] hover:text-[var(--brand)] hover:border-[var(--brand)]"
          >
            Explore the workflow
          </a>
        </div>
      </section>

      <section id="features" className="grid gap-6 md:grid-cols-3 animate-in-up-slow">
        {highlights.map(({ title, description }) => (
          <article key={title} className="rounded-lg border p-6 transition border-[var(--border)] bg-transparent hover:shadow-sm hover:-translate-y-0.5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">{title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{description}</p>
          </article>
        ))}
      </section>

      <section id="workflow" className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">From upload to insight in minutes.</h2>
          <p className="text-[var(--muted)]">
            Bootstrap the FastAPI backend, Celery workers, and Next.js frontend with Docker Compose. Queue AI-heavy workloads, land results in Postgres, and push tailored feedback to your candidates without context switching.
          </p>
          <p className="text-[var(--muted-2)]">
            The starter kit includes infrastructure ready for local development so you can focus on business logic instead of wiring.
          </p>
        </div>
        <div className="rounded-xl border p-6 text-sm shadow-sm border-[var(--border)] bg-transparent">
          <ol className="list-decimal space-y-3 pl-6 text-[var(--muted)]">
            <li>Drop a résumé or candidate batch request into the queue.</li>
            <li>Celery workers orchestrate spaCy, transformers, and PDF parsing pipelines.</li>
            <li>Store structured insights in Postgres and send events over Redis channels.</li>
            <li>Surface human-readable guidance in the Next.js dashboard.</li>
          </ol>
        </div>
      </section>

      <section id="stack" className="space-y-4">
        <h2 className="text-3xl font-semibold">Stack highlights</h2>
        <ul className="flex flex-wrap gap-3 text-sm">
          {stack.map((item) => (
            <li
              key={item}
              className="rounded-full border px-3 py-1.5 text-xs uppercase tracking-wide border-[var(--border)] text-[var(--muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
