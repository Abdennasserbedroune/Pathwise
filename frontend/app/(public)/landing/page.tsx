import Link from "next/link";
import { Building2, MailCheck, ShieldCheck } from "lucide-react";
import type { ComponentType } from "react";

import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";

export default function LandingPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto flex flex-col gap-24 px-4 py-16 md:py-24">
        <Hero />
        <Features />
        <section id="for-teams" className="grid gap-8 rounded-3xl border border-border bg-surface-elevated/50 p-8 shadow-soft md:grid-cols-3 md:p-10">
          <div className="md:col-span-1">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Hiring teams, meet your short list
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              AutoJobFlow surfaces candidates ready to talk. Launch private leagues, view swipe analytics, and coordinate intros without spreadsheets.
            </p>
          </div>
          <div className="md:col-span-2 grid gap-6 md:grid-cols-2">
            <CardItem
              icon={ShieldCheck}
              title="Quality guaranteed"
              description="Every candidate profile includes portfolio links, recent wins, and collaboration signals from their network."
            />
            <CardItem
              icon={Building2}
              title="Flexible cohorts"
              description="Spin up role-specific cohorts by function, level, or location, and keep hiring managers aligned in real time."
            />
            <CardItem
              icon={MailCheck}
              title="Warm introductions"
              description="Trigger outreach flows and interview prep kits automatically when talent saves your role."
            />
            <div className="flex flex-col justify-center gap-4 rounded-2xl border border-border/70 bg-background/70 p-6">
              <p className="text-sm leading-relaxed text-foreground/75">
                "Our pipeline quality doubled within the first month. AutoJobFlow routes only the candidates who get our product."
              </p>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Head of Talent, Series B SaaS</span>
            </div>
          </div>
        </section>
        <section className="overflow-hidden rounded-3xl border border-border bg-background/90 px-6 py-12 shadow-soft md:px-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
              Ready to calibrate your next move?
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-foreground/80">
              Build momentum with a pipeline curated to your strengths. Save the roles that resonate and we&apos;ll handle intros, nudges, and prep resources.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Explore roles now
              </Link>
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-lg border border-border/70 bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground hover:bg-surface-elevated/70"
              >
                Join the waitlist
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

interface CardItemProps {
  readonly icon: ComponentType<{ className?: string }>;
  readonly title: string;
  readonly description: string;
}

function CardItem({ icon: Icon, title, description }: CardItemProps) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-background/70 p-6 shadow-soft">
      <Icon className="h-6 w-6 text-primary" />
      <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-foreground/75">{description}</p>
    </article>
  );
}
