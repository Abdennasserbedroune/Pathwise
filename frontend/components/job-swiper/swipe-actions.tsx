"use client";

import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SwipeDecision } from "@/lib/state/swipe-store";

interface SwipeActionsProps {
  readonly disabled?: boolean;
  readonly pressed?: SwipeDecision | null;
  readonly onSkip: () => void;
  readonly onSave: () => void;
}

export function SwipeActions({ disabled, onSave, onSkip, pressed }: SwipeActionsProps) {
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-between gap-6 py-6">
      <Button
        type="button"
        variant="ghost"
        size="lg"
        className="flex-1 border border-negative text-negative hover:bg-negative/10"
        onClick={onSkip}
        disabled={disabled}
        isPressed={pressed === "skip"}
      >
        <X className="h-5 w-5" />
        Skip
      </Button>
      <Button
        type="button"
        variant="hero"
        size="lg"
        className="flex-1 bg-positive text-primary-foreground hover:bg-positive/90"
        onClick={onSave}
        disabled={disabled}
        isPressed={pressed === "save"}
      >
        <Check className="h-5 w-5" />
        Save
      </Button>
    </div>
  );
}
