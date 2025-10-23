"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCards, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import type { Job } from "@/lib/fixtures/jobs";
import { useSwipeStore } from "@/lib/state/swipe-store";
import { JobCard } from "./job-card";

interface JobSwiperProps {
  jobs: Job[];
  onSwipe?: (jobId: string, decision: "like" | "dislike") => void;
  onComplete?: () => void;
}

export function JobSwiper({ jobs, onSwipe, onComplete }: JobSwiperProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addSwipe, hasSwipedOn } = useSwipeStore();

  const unswipedJobs = jobs.filter((job) => !hasSwipedOn(job.id));

  useEffect(() => {
    if (currentIndex >= unswipedJobs.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, unswipedJobs.length, onComplete]);

  const handleSwipe = (direction: "left" | "right") => {
    if (!swiperInstance || currentIndex >= unswipedJobs.length) return;

    const currentJob = unswipedJobs[currentIndex];
    const decision = direction === "right" ? "like" : "dislike";

    addSwipe(currentJob.id, decision);
    onSwipe?.(currentJob.id, decision);

    if (swiperInstance.isEnd) {
      onComplete?.();
    }
  };

  if (unswipedJobs.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--card)] p-8">
        <div className="text-center">
          <div className="mb-4 text-6xl">🎉</div>
          <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
            No more jobs!
          </h3>
          <p className="text-[var(--muted)]">
            You&apos;ve reviewed all available positions. Check back later for new opportunities.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards, Keyboard]}
        keyboard={{
          enabled: true,
        }}
        className="h-full w-full"
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.activeIndex);
        }}
        onSlideNextTransitionEnd={() => handleSwipe("left")}
        onSlidePrevTransitionEnd={() => handleSwipe("right")}
        cardsEffect={{
          perSlideOffset: 8,
          perSlideRotate: 2,
          rotate: true,
          slideShadows: false,
        }}
      >
        {unswipedJobs.map((job) => (
          <SwiperSlide key={job.id}>
            <JobCard job={job} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-4">
        <button
          onClick={() => swiperInstance?.slideNext()}
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--destructive)] bg-white text-2xl shadow-lg transition hover:bg-[var(--destructive)] hover:text-white active:scale-95 dark:bg-[var(--card)]"
          aria-label="Dislike"
        >
          ✕
        </button>
        <button
          onClick={() => swiperInstance?.slidePrev()}
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--brand)] bg-white text-2xl shadow-lg transition hover:bg-[var(--brand)] hover:text-white active:scale-95 dark:bg-[var(--card)]"
          aria-label="Like"
        >
          ♥
        </button>
      </div>

      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
        {currentIndex + 1} / {unswipedJobs.length}
      </div>
    </div>
  );
}
