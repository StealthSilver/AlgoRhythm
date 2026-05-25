"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const BAR_DEFAULT = "bg-[rgb(var(--secondary))] opacity-80";
export const BAR_COMPARE = "bg-amber-400";
export const BAR_SWAP = "bg-rose-500";
export const BAR_SORTED = "bg-emerald-500";
export const BAR_PIVOT = "bg-[#8a4d98]";
export const BAR_ELIMINATED = "bg-gray-400/45";
export const BAR_IN_RANGE = "bg-blue-400/75";
export const NODE_DEFAULT = "fill-[rgb(var(--secondary))] opacity-90";
export const NODE_ACTIVE = "fill-amber-400";
export const NODE_VISITED = "fill-emerald-500";
export const NODE_PATH = "fill-[#8a4d98]";
export const NODE_FRONTIER = "fill-amber-400/70";

/** Fixed canvas — every hero mini viz uses the same footprint */
export const MINI_CANVAS_W = "w-[152px]";
export const MINI_CANVAS_H = "h-[108px]";
export const MINI_STAGE_H = "h-[86px]";

export const MINI_SPEED = {
  search: 1500,
  sort: 1350,
  merge: 1450,
  graph: 1600,
  tree: 1650,
  struct: 1400,
} as const;

export function useMiniLoop(length: number, intervalMs: number) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (length <= 0) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [length, intervalMs]);

  return step;
}

export function MiniVizShell({
  children,
  hint,
  className,
}: {
  children: React.ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center p-2 max-sm:p-4 sm:p-3",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 flex-col items-center justify-center",
          MINI_CANVAS_W,
          MINI_CANVAS_H,
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-center overflow-hidden",
            MINI_STAGE_H,
          )}
        >
          {children}
        </div>
        {hint ? (
          <p
            className="mt-1.5 w-full truncate text-center text-[8px] font-medium tracking-wide"
            style={{ opacity: 0.55 }}
          >
            {hint}
          </p>
        ) : (
          <div className="mt-1.5 h-3" aria-hidden />
        )}
      </div>
    </div>
  );
}

export function MiniChip({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent" | "active" | "success";
}) {
  return (
    <span
      className={cn(
        "rounded px-1 py-px text-[7px] font-medium leading-none",
        tone === "muted" && "bg-[rgb(var(--foreground)/0.06)]",
        tone === "accent" && "bg-[#8a4d98]/25 text-[#c49ad0]",
        tone === "active" && "bg-amber-400/25 text-amber-200",
        tone === "success" && "bg-emerald-500/25 text-emerald-200",
      )}
      style={{ opacity: tone === "muted" ? 0.7 : 1 }}
    >
      {children}
    </span>
  );
}

type BarStateKind =
  | "default"
  | "comparing"
  | "swapping"
  | "sorted"
  | "pivot"
  | "eliminated"
  | "in-range";

export function MiniBars({
  values,
  states,
  dimmedIndexes,
  markers,
  showValues = true,
}: {
  values: number[];
  states: BarStateKind[];
  dimmedIndexes?: number[];
  markers?: Record<number, string>;
  showValues?: boolean;
}) {
  const max = Math.max(...values, 1);
  const dimmed = new Set(dimmedIndexes ?? []);

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <div className="relative flex h-[68px] w-full items-end justify-center gap-1">
        {values.map((value, i) => (
          <div
            key={i}
            className="relative flex h-full flex-1 flex-col items-center justify-end"
          >
            {markers?.[i] && (
              <span
                className="absolute -top-3 text-[7px] font-semibold"
                style={{
                  color:
                    states[i] === "pivot"
                      ? "#c49ad0"
                      : states[i] === "comparing"
                        ? "#fbbf24"
                        : "rgba(var(--foreground), 0.55)",
                }}
              >
                {markers[i]}
              </span>
            )}
            <div
              className={cn(
                "w-full min-w-[4px] rounded-t-sm transition-all duration-500",
                states[i] === "default" && BAR_DEFAULT,
                states[i] === "comparing" && BAR_COMPARE,
                states[i] === "swapping" && BAR_SWAP,
                states[i] === "sorted" && BAR_SORTED,
                states[i] === "pivot" && BAR_PIVOT,
                states[i] === "eliminated" && BAR_ELIMINATED,
                states[i] === "in-range" && BAR_IN_RANGE,
                dimmed.has(i) && "opacity-20",
              )}
              style={{ height: `${(value / max) * 100}%` }}
            />
            {showValues && (
              <span
                className="mt-0.5 text-[7px] tabular-nums leading-none"
                style={{ opacity: states[i] === "default" && dimmed.has(i) ? 0.25 : 0.65 }}
              >
                {value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MiniSvgStage({
  children,
  viewBox = "0 0 100 90",
}: {
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className="h-[86px] w-[152px] shrink-0"
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}
