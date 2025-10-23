"use client";

import { useMemo, useState } from "react";
import { BookmarkCheck, RotateCcw } from "lucide-react";

import { SwipeStack } from "@/components/job-swiper/swipe-stack";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { mockJobs } from "@/lib/fixtures/mock-jobs";
import { useSwipeStore, type SwipeDecision } from "@/lib/state/swipe-store";

export default function JobsPage() {
  const { savedJobs, skippedJobs, clearAll } = useSwipeStore();
  const [completed, setCompleted] = useState(false);
  const [lastDecision, setLastDecision] = useState<{ jobTitle: string; decision: SwipeDecision } | null>(null);

  const stats = useMemo(
    () => [
      {
        label: "Saved",
        value: savedJobs.length,
        tone: "text-primary",
      },
      {
        label: "Skipped",
        value: skippedJobs.length,
        tone: "text-muted",
      },
    ],
    [savedJobs.length, skippedJobs.length],
  );

  const handleClear = () => {
    clearAll();
    setCompleted(false);
    setLastDecision(null);
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col gap-8 px-4 py-10 md:flex-row md:items-start">
        <div className="w-full md:max-w-sm">
          <Card className="sticky top-24 flex flex-col gap-6 bg-background/80">
            <CardHeader className="border-b border-border/60">
              <h1 className="font-display text-2xl font-semibold text-foreground">Browse opportunities</h1>
              <p className="text-sm text-foreground/70">
                Swipe through curated roles. Save the ones that resonate, skip the rest, and we&apos;ll notify recruiters on your behalf.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">{item.label}</div>
                    <div className={`mt-2 text-3xl font-semibold ${item.tone}`}>{item.value}</div>
                  </div>
                ))}
              </div>
              {lastDecision && (
                <div className="rounded-2xl border border-border/60 bg-surface-elevated/50 p-4 text-sm text-foreground/75">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted">Latest move</div>
                  You {lastDecision.decision === "save" ? "saved" : "skipped"} <strong>{lastDecision.jobTitle}</strong>.
                </div>
              )}
              <Button variant="ghost" onClick={handleClear} className="w-full border border-border/70 text-sm">
                <RotateCcw className="h-4 w-4" />
                Reset deck
              </Button>
              <div className="rounded-2xl border border-border/60 bg-background/60 p-4 text-sm text-foreground/70">
                <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                  <BookmarkCheck className="h-4 w-4 text-primary" />
                  Saved roles sync across devices
                </div>
                <p>Sign in from any device and continue where you left off. We keep your streak alive.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="relative flex-1">
          <div className="h-[640px] w-full rounded-3xl border border-border bg-background/80 p-4 shadow-soft md:h-[720px]">
            <SwipeStack
              jobs={mockJobs}
              onSwipe={(job, decision) => {
                setCompleted(false);
                setLastDecision({ jobTitle: job.title, decision });
              }}
              onComplete={() => setCompleted(true)}
            />
          </div>
          {completed && (
            <div className="mt-4 rounded-2xl border border-border/60 bg-surface-elevated/50 p-4 text-sm text-foreground/80">
              You&apos;ve reviewed every role for today. We&apos;ll deliver fresh matches soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
