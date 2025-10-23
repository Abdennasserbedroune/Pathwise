"use client";

import type { Job } from "@/lib/fixtures/jobs";
import Image from "next/image";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="relative h-full w-full select-none overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl">
      <div className="flex h-full flex-col">
        <div className="relative bg-gradient-to-br from-[var(--brand)] to-[var(--brand-hover)] p-6 pb-20">
          <div className="flex items-start gap-4">
            {job.logo && (
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-white p-2 shadow-md">
                <Image
                  src={job.logo}
                  alt={`${job.company} logo`}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h2 className="mb-1 text-2xl font-bold text-white">{job.title}</h2>
              <p className="text-lg text-white/90">{job.company}</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {job.location}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {job.type}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {job.salary}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              About the role
            </h3>
            <p className="leading-relaxed text-[var(--foreground)]">{job.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              Requirements
            </h3>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-[var(--foreground)]">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand)]" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              Benefits
            </h3>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-[var(--foreground)]">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--success)]" />
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 text-sm text-[var(--muted)]">
            Posted {new Date(job.postedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
