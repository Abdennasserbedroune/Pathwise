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
      <section className="space-y-6 text-center">
        <span className="inline-flex max-w-max items-center gap-2 rounded-full border border-cyan-500/60 bg-cyan-500/10 px-4 py-1 text-xs uppercase tracking-wider text-cyan-200">
          AI résumé copilots for teams
        </span>
        <h1 className="text-balance text-4xl font-semibold sm:text-5xl">
          Build a collaborative résumé intelligence workflow for job seekers and recruiters.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-300">
          Pathwise combines AI critique, actionable recommendations, and recruiter-ready exports so
          your team can iterate on career stories with confidence.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://www.pathwise.ai"
            className="rounded-md bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-cyan-400"
          >
            Request early access
          </a>
          <a
            href="#workflow"
            className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Explore the workflow
          </a>
        </div>
      </section>

      <section id="features" className="grid gap-8 md:grid-cols-3">
        {highlights.map(({ title, description }) => (
          <article key={title} className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold text-cyan-200">{title}</h2>
            <p className="mt-2 text-sm text-slate-300">{description}</p>
          </article>
        ))}
      </section>

      <section id="workflow" className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">From upload to insight in minutes.</h2>
          <p className="text-slate-300">
            Bootstrap the FastAPI backend, Celery workers, and Next.js frontend with Docker Compose.
            Queue AI-heavy workloads, land results in Postgres, and push tailored feedback to your
            candidates without context switching.
          </p>
          <p className="text-slate-400">
            The starter kit includes infrastructure ready for local development so you can focus on
            business logic instead of wiring.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300 shadow-xl">
          <ol className="list-decimal space-y-3 pl-6">
            <li>Drop a résumé or candidate batch request into the queue.</li>
            <li>Celery workers orchestrate spaCy, transformers, and PDF parsing pipelines.</li>
            <li>Store structured insights in Postgres and send events over Redis channels.</li>
            <li>Surface human-readable guidance in the Next.js dashboard.</li>
          </ol>
        </div>
      </section>

      <section id="stack" className="space-y-4">
        <h2 className="text-3xl font-semibold">Stack highlights</h2>
        <ul className="flex flex-wrap gap-3 text-sm text-slate-200">
          {stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-xs uppercase tracking-wide text-cyan-200"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
