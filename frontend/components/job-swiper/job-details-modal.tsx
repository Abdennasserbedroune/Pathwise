"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";

import type { Job } from "@/lib/fixtures/mock-jobs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface JobDetailsModalProps {
  readonly job: Job | null;
  readonly onClose: () => void;
}

export function JobDetailsModal({ job, onClose }: JobDetailsModalProps) {
  const [mounted, setMounted] = useState(false);
  const portalTarget = useMemo(() => (typeof document !== "undefined" ? document.body : null), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!job || !portalTarget) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    portalTarget.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    return () => {
      portalTarget.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [job, onClose, portalTarget]);

  if (!job || !portalTarget || !mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-foreground/30 backdrop-blur-sm px-4 py-6">
      <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft outline-none">
        <button
          type="button"
          aria-label="Close job details"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background text-foreground transition hover:bg-surface-elevated"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-6 p-6 pb-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="success">{job.jobType}</Badge>
              <span className="rounded-full bg-surface-elevated px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted">
                {job.experienceLevel} • {job.employmentType}
              </span>
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
              {job.title}
            </h2>
            <p className="text-base text-muted">
              {job.company} • {job.location}
            </p>
            {job.salaryRange && <p className="text-sm text-foreground">{job.salaryRange}</p>}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Role overview</h3>
            <p className="leading-relaxed text-foreground/90">{job.about}</p>
          </div>
        </div>

        <div className="grid gap-6 border-t border-border bg-surface-elevated/40 p-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">What you will do</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-foreground/90">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">What you bring</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} tone="subtle" className="bg-surface-elevated px-3 py-1 text-xs uppercase tracking-wide">
                  {skill}
                </Badge>
              ))}
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Perks</h3>
            <ul className="space-y-2 text-sm text-foreground/90">
              {job.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-background/60 px-6 py-4 text-sm text-muted">
          <div>
            <span className="font-medium text-foreground">Ready to apply?</span> Save this role and we will notify you when introductions open.
          </div>
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90",
            )}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    portalTarget,
  );
}
