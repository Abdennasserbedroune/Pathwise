import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated/60 px-6 py-20 shadow-soft md:px-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at top right, hsl(158 69% 45% / 0.14), transparent 55%), radial-gradient(circle at bottom left, hsl(7 78% 57% / 0.12), transparent 50%)",
        }}
      />
      <div className="relative mx-auto flex max-w-3xl flex-col gap-8 text-center">
        <div className="mx-auto flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
          <Sparkles className="h-4 w-4 text-primary" />
          Swipe smarter, not harder
        </div>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
          Swipe your way to roles that actually fit your ambition
        </h1>
        <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">
          AutoJobFlow curates roles from teams that move fast and invest in talent. Save what resonates, skip what doesn&apos;t, and we&apos;ll handle the follow up.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Start browsing
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/signin"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/70 bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground hover:bg-surface-elevated/70"
          >
            Sign in to sync progress
          </Link>
        </div>
        <div className="mt-8 grid gap-4 text-left text-sm text-muted md:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-background/80 p-4">
            <Badge tone="success" className="mb-3 bg-primary/10 text-xs uppercase tracking-wide text-primary">
              92% response rate
            </Badge>
            <p>Roles sourced from venture-backed teams hiring now, vetted weekly.</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/80 p-4">
            <Badge tone="subtle" className="mb-3 bg-surface-elevated px-3 py-1 text-xs uppercase tracking-wide">
              Real-time insights
            </Badge>
            <p>Understand fit fast with salary ranges, team context, and hiring velocity.</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/80 p-4">
            <Badge tone="subtle" className="mb-3 bg-surface-elevated px-3 py-1 text-xs uppercase tracking-wide">
              Recruiter ready
            </Badge>
            <p>Liked roles are queued for warm introductions once you&apos;re ready.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
