"use client";

import { useState } from "react";
import { JobSwiper } from "@/components/swipe/job-swiper";
import { mockJobs } from "@/lib/fixtures/jobs";
import { useSwipeStore } from "@/lib/state/swipe-store";

export default function JobsPage() {
  const [showStats, setShowStats] = useState(false);
  const { likedJobs, dislikedJobs, clearAllSwipes } = useSwipeStore();

  const handleSwipe = (jobId: string, decision: "like" | "dislike") => {
  };

  const handleComplete = () => {
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-[var(--background)] px-4 py-8 md:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
              Discover Jobs
            </h1>
            <p className="text-sm text-[var(--muted)] md:text-base">
              Swipe right to like, left to pass
            </p>
          </div>

          <button
            onClick={() => setShowStats(!showStats)}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--background)]"
          >
            {showStats ? "Hide" : "Stats"}
          </button>
        </div>

        {showStats && (
          <div className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
              Your Swipe Stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-[var(--background)] p-4">
                <div className="text-3xl font-bold text-[var(--brand)]">{likedJobs.length}</div>
                <div className="text-sm text-[var(--muted)]">Liked</div>
              </div>
              <div className="rounded-lg bg-[var(--background)] p-4">
                <div className="text-3xl font-bold text-[var(--muted)]">
                  {dislikedJobs.length}
                </div>
                <div className="text-sm text-[var(--muted)]">Passed</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => alert("Liked jobs page coming soon!")}
                className="flex-1 rounded-lg bg-[var(--brand)] py-2 text-center text-sm font-medium text-white transition hover:bg-[var(--brand-hover)]"
              >
                View Liked Jobs
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to clear all swipe history?")) {
                    clearAllSwipes();
                  }
                }}
                className="rounded-lg border border-[var(--destructive)] px-4 py-2 text-sm font-medium text-[var(--destructive)] transition hover:bg-[var(--destructive)] hover:text-white"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        <div className="h-[600px] md:h-[700px]">
          <JobSwiper jobs={mockJobs} onSwipe={handleSwipe} onComplete={handleComplete} />
        </div>

        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <p className="text-sm text-[var(--muted)]">
            💡 <strong>Pro Tip:</strong> Use arrow keys or swipe gestures on mobile to navigate
            jobs quickly
          </p>
        </div>
      </div>
    </div>
  );
}
