import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SwipeDecision = "like" | "dislike" | "superlike";

export interface SwipeRecord {
  jobId: string;
  decision: SwipeDecision;
  timestamp: number;
}

interface SwipeState {
  swipes: SwipeRecord[];
  likedJobs: string[];
  dislikedJobs: string[];
  superlikedJobs: string[];
  addSwipe: (jobId: string, decision: SwipeDecision) => void;
  removeSwipe: (jobId: string) => void;
  clearAllSwipes: () => void;
  hasSwipedOn: (jobId: string) => boolean;
  getSwipeDecision: (jobId: string) => SwipeDecision | null;
}

export const useSwipeStore = create<SwipeState>()(
  persist(
    (set, get) => ({
      swipes: [],
      likedJobs: [],
      dislikedJobs: [],
      superlikedJobs: [],

      addSwipe: (jobId: string, decision: SwipeDecision) => {
        const existingSwipe = get().swipes.find((s) => s.jobId === jobId);
        if (existingSwipe) {
          return;
        }

        const newSwipe: SwipeRecord = {
          jobId,
          decision,
          timestamp: Date.now(),
        };

        set((state) => {
          const newSwipes = [...state.swipes, newSwipe];
          const updates: Partial<SwipeState> = { swipes: newSwipes };

          if (decision === "like") {
            updates.likedJobs = [...state.likedJobs, jobId];
          } else if (decision === "dislike") {
            updates.dislikedJobs = [...state.dislikedJobs, jobId];
          } else if (decision === "superlike") {
            updates.superlikedJobs = [...state.superlikedJobs, jobId];
          }

          return updates as SwipeState;
        });
      },

      removeSwipe: (jobId: string) => {
        set((state) => ({
          swipes: state.swipes.filter((s) => s.jobId !== jobId),
          likedJobs: state.likedJobs.filter((id) => id !== jobId),
          dislikedJobs: state.dislikedJobs.filter((id) => id !== jobId),
          superlikedJobs: state.superlikedJobs.filter((id) => id !== jobId),
        }));
      },

      clearAllSwipes: () => {
        set({
          swipes: [],
          likedJobs: [],
          dislikedJobs: [],
          superlikedJobs: [],
        });
      },

      hasSwipedOn: (jobId: string) => {
        return get().swipes.some((s) => s.jobId === jobId);
      },

      getSwipeDecision: (jobId: string) => {
        const swipe = get().swipes.find((s) => s.jobId === jobId);
        return swipe ? swipe.decision : null;
      },
    }),
    {
      name: "autojobflow-swipes",
    },
  ),
);
