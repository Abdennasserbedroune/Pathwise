"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, type PanInfo, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Check, X } from "lucide-react";

import type { Job } from "@/lib/fixtures/mock-jobs";
import { cn } from "@/lib/utils";
import { JobDetailsModal } from "@/components/job-swiper/job-details-modal";
import { JobCard } from "@/components/job-swiper/job-card";
import { SwipeActions } from "@/components/job-swiper/swipe-actions";
import { Progress } from "@/components/ui/progress";
import { useSwipeStore, type SwipeDecision } from "@/lib/state/swipe-store";

interface SwipeStackProps {
  readonly jobs: Job[];
  readonly onSwipe?: (job: Job, decision: SwipeDecision) => void;
  readonly onComplete?: () => void;
}

const SWIPE_THRESHOLD = 120;
const MAX_STACK = 3;

type ProgrammaticSwipe = (decision: SwipeDecision) => void;

export function SwipeStack({ jobs, onComplete, onSwipe }: SwipeStackProps) {
  const { hasDecided, markDecision } = useSwipeStore();
  const [cursor, setCursor] = useState(0);
  const [expandedJob, setExpandedJob] = useState<Job | null>(null);
  const [pressed, setPressed] = useState<SwipeDecision | null>(null);
  const programmaticSwipeRef = useRef<ProgrammaticSwipe | null>(null);

  const deck = useMemo(() => {
    const nextDeck: Job[] = [];
    let index = cursor;

    while (index < jobs.length && nextDeck.length < MAX_STACK) {
      const job = jobs[index];
      if (!hasDecided(job.id)) {
        nextDeck.push(job);
      }
      index += 1;
    }

    return {
      cards: nextDeck,
      nextIndex: index,
    };
  }, [cursor, jobs, hasDecided]);

  useEffect(() => {
    if (deck.cards.length === 0 && deck.nextIndex < jobs.length) {
      setCursor(deck.nextIndex);
    }
  }, [deck.cards.length, deck.nextIndex, jobs.length]);

  useEffect(() => {
    if (deck.cards.length === 0 && deck.nextIndex >= jobs.length) {
      onComplete?.();
    }
  }, [deck.cards.length, deck.nextIndex, jobs.length, onComplete]);

  useEffect(() => {
    if (deck.cards.length === 0) {
      programmaticSwipeRef.current = null;
    }
  }, [deck.cards.length]);

  const progressValue = useMemo(() => {
    if (jobs.length === 0) {
      return 0;
    }

    const decidedCount = jobs.filter((job) => hasDecided(job.id)).length;
    return (decidedCount / jobs.length) * 100;
  }, [hasDecided, jobs]);

  const handleAdvance = useCallback(
    (job: Job, decision: SwipeDecision) => {
      markDecision(job.id, decision);
      onSwipe?.(job, decision);
      setCursor((prev) => prev + 1);
    },
    [markDecision, onSwipe],
  );

  const triggerSwipe = useCallback(
    (decision: SwipeDecision) => {
      if (!deck.cards[0]) {
        return;
      }

      if (programmaticSwipeRef.current) {
        programmaticSwipeRef.current(decision);
      }
    },
    [deck.cards],
  );

  const handleAction = useCallback(
    (decision: SwipeDecision) => {
      if (!deck.cards[0]) {
        return;
      }

      setPressed(decision);
      triggerSwipe(decision);
      window.setTimeout(() => setPressed(null), 220);
    },
    [deck.cards, triggerSwipe],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handleAction("skip");
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleAction("save");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleAction]);

  if (jobs.length === 0) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="px-4">
        <div className="flex items-center justify-between gap-4 pb-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Progress</p>
            <p className="text-sm text-muted">
              {Math.round(progressValue)}% reviewed • {jobs.length} roles
            </p>
          </div>
          <div className="text-xs text-muted">
            ← Skip • Save →
          </div>
        </div>
        <Progress value={progressValue} />
      </div>

      <div className="relative mt-6 flex-1">
        <AnimatePresence>
          {deck.cards.map((job, index) => (
            <SwipeCard
              key={job.id}
              job={job}
              stackIndex={index}
              registerProgrammatic={(fn) => {
                if (index === 0) {
                  programmaticSwipeRef.current = fn;
                }
              }}
              onExpand={() => setExpandedJob(job)}
              onDecision={(decision) => handleAdvance(job, decision)}
            />
          ))}
        </AnimatePresence>

        {deck.cards.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border text-center">
            <div className="space-y-3 p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface-elevated">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">You are all caught up</h3>
              <p className="text-sm text-muted">
                Come back tomorrow for fresh matches tailored to your profile.
              </p>
            </div>
          </div>
        )}
      </div>

      <SwipeActions
        disabled={deck.cards.length === 0}
        onSkip={() => handleAction("skip")}
        onSave={() => handleAction("save")}
        pressed={pressed}
      />

      <JobDetailsModal job={expandedJob} onClose={() => setExpandedJob(null)} />
    </div>
  );
}

interface SwipeCardProps {
  readonly job: Job;
  readonly stackIndex: number;
  readonly onDecision: (decision: SwipeDecision) => void;
  readonly onExpand: () => void;
  readonly registerProgrammatic: (fn: ProgrammaticSwipe | null) => void;
}

function SwipeCard({ job, onDecision, onExpand, registerProgrammatic, stackIndex }: SwipeCardProps) {
  const isActive = stackIndex === 0;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-320, 0, 320], [-15, 0, 15]);
  const skipOpacity = useTransform(x, [-SWIPE_THRESHOLD, -10], [1, 0], { clamp: true });
  const saveOpacity = useTransform(x, [10, SWIPE_THRESHOLD], [0, 1], { clamp: true });
  const shadow = useTransform(x, [-240, 0, 240], [
    "0 32px 72px -28px hsl(7 78% 57% / 0.28)",
    "var(--shadow-soft)",
    "0 32px 72px -28px hsl(158 69% 45% / 0.28)",
  ]);

  const animateOut = useCallback(
    (decision: SwipeDecision) => {
      const exitX = decision === "save" ? 720 : -720;
      animate(x, exitX, {
        duration: 0.28,
        ease: "easeOut",
        onComplete: () => {
          onDecision(decision);
          x.set(0);
        },
      });
    },
    [onDecision, x],
  );

  useEffect(() => {
    if (isActive) {
      registerProgrammatic(animateOut);
      return () => registerProgrammatic(null);
    }
  }, [animateOut, isActive, registerProgrammatic]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      animateOut("save");
      return;
    }

    if (info.offset.x < -SWIPE_THRESHOLD) {
      animateOut("skip");
      return;
    }

    animate(x, 0, {
      type: "spring",
      stiffness: 260,
      damping: 26,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1 - stackIndex * 0.18, scale: 1 - stackIndex * 0.04, y: stackIndex * 12 }}
      exit={{ opacity: 0, scale: 0.9, y: -24 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="absolute inset-0"
      style={{ zIndex: 100 - stackIndex }}
    >
      <motion.div
        drag={isActive ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.22}
        onDragEnd={isActive ? handleDragEnd : undefined}
        style={{ x, rotate, boxShadow: shadow, touchAction: "pan-x" }}
        className={cn(
          "relative h-full w-full",
          !isActive && "pointer-events-none",
        )}
        whileTap={{ scale: 0.98 }}
      >
        <JobCard job={job} isActive={isActive} onExpand={onExpand} />
        {isActive && (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl bg-negative/12"
              style={{ opacity: skipOpacity }}
            >
              <X className="absolute left-6 top-6 h-10 w-10 text-negative" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl bg-positive/12"
              style={{ opacity: saveOpacity }}
            >
              <Check className="absolute right-6 top-6 h-10 w-10 text-primary" />
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
