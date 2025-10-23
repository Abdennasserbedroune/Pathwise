import Image from "next/image";
import { Briefcase, Clock3, MapPin, Wallet } from "lucide-react";

import type { Job } from "@/lib/fixtures/mock-jobs";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  readonly job: Job;
  readonly isActive?: boolean;
  readonly onExpand?: () => void;
}

const jobTypeTone: Record<Job["jobType"], "success" | "subtle"> = {
  Remote: "success",
  Hybrid: "subtle",
  Onsite: "subtle",
};

export function JobCard({ job, isActive = false, onExpand }: JobCardProps) {
  const handleCardClick = () => {
    if (isActive) {
      onExpand?.();
    }
  };

  return (
    <article
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-soft transition",
        isActive ? "cursor-pointer" : "pointer-events-none",
      )}
      onClick={handleCardClick}
    >
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-elevated/80">
              {job.logo ? (
                <Image
                  src={job.logo}
                  alt={`${job.company} logo`}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-xl object-contain"
                />
              ) : (
                <span className="text-2xl font-semibold text-foreground/70">{job.company[0]}</span>
              )}
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                {job.title}
              </h2>
              <p className="text-sm text-muted">
                {job.company} • {job.experienceLevel} • {job.employmentType}
              </p>
            </div>
          </div>
          <Badge tone={jobTypeTone[job.jobType]}>{job.jobType}</Badge>
        </div>

        <div className="grid gap-2 text-sm text-muted">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-foreground/60" />
            <span>{job.location}</span>
          </div>
          {job.salaryRange && (
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-foreground/60" />
              <span>{job.salaryRange}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-foreground/60" />
            <span>{job.employmentType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-foreground/60" />
            <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <p className="clamp-3 text-base leading-relaxed text-foreground/90">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 5).map((skill) => (
            <Badge key={skill} tone="subtle" className="bg-surface-elevated px-3 py-1 text-xs uppercase tracking-wide">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border/70 bg-surface-elevated/60 px-6 py-4 text-sm text-muted">
        <span>Tap to open full role overview</span>
        <span className="font-semibold text-primary">View details</span>
      </div>
    </article>
  );
}
