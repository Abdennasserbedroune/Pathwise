import { Compass, Fingerprint, Gauge, Layers, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "High-signal matches",
    description: "We surface roles based on momentum indicators, not stale job boards, so every swipe feels meaningful.",
  },
  {
    icon: Layers,
    title: "Card stack built for flow",
    description: "Buttery smooth gestures, keyboard shortcuts, and haptic button states keep you in the zone on any device.",
  },
  {
    icon: Compass,
    title: "Deep role context",
    description: "See team makeup, reporting lines, and hiring urgency before you commit to a save.",
  },
  {
    icon: Users,
    title: "Recruiter collaboration",
    description: "Share shortlisted roles with mentors or recruiters in a click and keep everyone aligned.",
  },
  {
    icon: Fingerprint,
    title: "Personalized insights",
    description: "Feedback from every swipe trains your feed, highlighting roles that fit your trajectory.",
  },
  {
    icon: Zap,
    title: "Automated follow up",
    description: "Trigger intros, reminders, and interview prep workflows automatically once you save a role.",
  },
];

export function Features() {
  return (
    <section id="how-it-works" className="space-y-12">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Built for job hunters who move fast
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          AutoJobFlow blends human taste with automation so you can evaluate opportunities in minutes, not hours.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="group relative flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/80 p-6 shadow-soft transition hover:-translate-y-1 hover:border-foreground/40 hover:shadow-ring"
          >
            <feature.icon className="h-8 w-8 text-primary transition group-hover:scale-110" />
            <h3 className="font-display text-xl font-semibold text-foreground">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-foreground/75">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
