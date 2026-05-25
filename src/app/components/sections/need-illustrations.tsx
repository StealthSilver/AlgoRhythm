"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

/* Illustration ink — tuned for dark background */
const INK = "fill-neutral-100";
const INK_MID = "fill-neutral-400";
const INK_SOFT = "fill-neutral-500";
const INK_FAINT = "fill-neutral-600";
const STROKE = "stroke-neutral-400";
const STROKE_FAINT = "stroke-neutral-600";
const STROKE_STRONG = "stroke-neutral-200";
const LABEL = "fill-neutral-400";

const VISIBLE_BARS = [28, 48, 36, 56, 40];

function IllustrationCard({
  label,
  children,
  delay = 0,
  isInView,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <motion.div
        className={cn(
          "landing-surface relative flex w-full min-h-[240px] items-center justify-center overflow-hidden rounded-xl",
          "p-10 sm:min-h-[260px] sm:p-12",
        )}
      >
        {children}
      </motion.div>
      <p className="landing-muted mt-5 text-xs font-extralight tracking-[0.12em] uppercase sm:mt-6">
        {label}
      </p>
    </motion.div>
  );
}

/** Hidden data revealed step-by-step — obscured bars become readable values */
export function VisibleIllustration({ isInView }: { isInView: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState(false);
  const [scanX, setScanX] = useState(0);

  useEffect(() => {
    if (hovered || !isInView) return;
    const id = window.setInterval(() => {
      setScanX((x) => (x >= 100 ? 0 : x + 1.1));
    }, 52);
    return () => window.clearInterval(id);
  }, [hovered, isInView]);

  const revealed = hovered || scanX >= 95;
  const revealW = revealed ? 240 : (scanX / 100) * 240;

  return (
    <IllustrationCard label="Visible" delay={0.55} isInView={isInView}>
      <svg
        viewBox="0 0 240 130"
        className="mx-auto h-auto w-full max-w-[240px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setScanX(0);
        }}
        role="img"
        aria-label="Hidden algorithm state revealed by a scan"
      >
        <defs>
          <clipPath id={`${uid}-reveal`}>
            <rect x="0" y="0" width={revealW} height="130" />
          </clipPath>
        </defs>

        {/* Chart frame */}
        <line x1="24" y1="96" x2="216" y2="96" className={STROKE_FAINT} strokeWidth="1" />
        <text
          x="24"
          y="0"
          dominantBaseline="hanging"
          fontSize="8"
          className={LABEL}
          fontFamily="var(--font-outfit), sans-serif"
        >
          hidden
        </text>
        <text
          x="216"
          y="0"
          dominantBaseline="hanging"
          textAnchor="end"
          fontSize="8"
          className={LABEL}
          fontFamily="var(--font-outfit), sans-serif"
        >
          revealed
        </text>

        {/* Obscured layer — dashed bars with ? */}
        {VISIBLE_BARS.map((h, i) => {
          const x = 40 + i * 38;
          return (
            <g key={`ghost-${i}`}>
              <rect
                x={x}
                y={96 - h}
                width="20"
                height={h}
                rx="2"
                className={INK_FAINT}
                fillOpacity="0.35"
              />
              <rect
                x={x}
                y={96 - h}
                width="20"
                height={h}
                rx="2"
                fill="none"
                className={STROKE_FAINT}
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <text
                x={x + 10}
                y={108}
                textAnchor="middle"
                fontSize="9"
                className={INK_SOFT}
                fontFamily="var(--font-outfit), sans-serif"
              >
                ?
              </text>
            </g>
          );
        })}

        {/* Revealed layer — solid bars with values */}
        <g clipPath={`url(#${uid}-reveal)`}>
          {VISIBLE_BARS.map((h, i) => {
            const x = 40 + i * 38;
            const isLeading =
              !revealed && revealW / 240 > (i + 0.2) / VISIBLE_BARS.length;
            return (
              <g key={`bar-${i}`}>
                <rect
                  x={x}
                  y={96 - h}
                  width="20"
                  height={h}
                  rx="2"
                  className={isLeading ? INK : INK_MID}
                />
                <text
                  x={x + 10}
                  y={108}
                  textAnchor="middle"
                  fontSize="9"
                  className={INK}
                  fontFamily="var(--font-outfit), sans-serif"
                >
                  {h}
                </text>
              </g>
            );
          })}
        </g>

        {/* Scan divider */}
        {!revealed && (
          <line
            x1={revealW}
            y1="24"
            x2={revealW}
            y2="96"
            className={STROKE_STRONG}
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
        )}
      </svg>
    </IllustrationCard>
  );
}

const INTERACTIVE_VALUES = [42, 58, 36, 50, 28];
const INTERACTIVE_VB_W = 240;
const INTERACTIVE_VB_H = 142;
const BAR_BASELINE = 88;
const BAR_X = (i: number) => 40 + i * 38;
const INTERACTIVE_BTN_Y = 120;
const INTERACTIVE_BTN_W = 30;
const INTERACTIVE_BTN_H = 26;
const INTERACTIVE_PLAY_CX = INTERACTIVE_VB_W / 2;
const INTERACTIVE_EASE = [0.25, 0.1, 0.25, 1] as const;

type BubbleStep = {
  values: number[];
  compare: number | null;
  sortedFrom: number;
  swapped: boolean;
};

function buildBubbleSortSteps(initial: number[]): BubbleStep[] {
  const steps: BubbleStep[] = [];
  const arr = [...initial];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        values: [...arr],
        compare: j,
        sortedFrom: n - i,
        swapped: false,
      });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          values: [...arr],
          compare: j,
          sortedFrom: n - i,
          swapped: true,
        });
      }
    }
  }

  steps.push({
    values: [...arr],
    compare: null,
    sortedFrom: 0,
    swapped: false,
  });
  return steps;
}

/** Play / pause drives a bubble-sort animation */
export function InteractiveIllustration({ isInView }: { isInView: boolean }) {
  const steps = useMemo(() => buildBubbleSortSteps(INTERACTIVE_VALUES), []);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || !isInView) return;
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % steps.length);
    }, 700);
    return () => window.clearInterval(id);
  }, [playing, isInView, steps.length]);

  useEffect(() => {
    if (!isInView) return;
    setPlaying(true);
    return () => setPlaying(false);
  }, [isInView]);

  const { values, compare, sortedFrom, swapped } = steps[frame];
  const compareEnd =
    compare !== null ? Math.min(compare + 1, values.length - 1) : null;
  const stepNum = frame + 1;
  const playX = INTERACTIVE_PLAY_CX - INTERACTIVE_BTN_W / 2;
  const playY = INTERACTIVE_BTN_Y - INTERACTIVE_BTN_H / 2;

  return (
    <IllustrationCard label="Interactive" delay={0.62} isInView={isInView}>
      <div className="flex w-full justify-center px-2 pb-2 pt-1 sm:pb-3">
        <svg
          viewBox={`0 0 ${INTERACTIVE_VB_W} ${INTERACTIVE_VB_H}`}
          className="mx-auto block h-auto w-full max-w-[240px]"
          role="img"
          aria-label="Bubble sort with play and pause controls"
        >
        <motion.text
          x="120"
          y="0"
          dominantBaseline="hanging"
          textAnchor="middle"
          fontSize="8"
          className={LABEL}
          fontFamily="var(--font-outfit), sans-serif"
          animate={{ opacity: playing ? 0.75 : 0.5 }}
          transition={{ duration: 0.4, ease: INTERACTIVE_EASE }}
        >
          {playing ? `playing · step ${stepNum}` : `paused · step ${stepNum}`}
        </motion.text>

          {sortedFrom < values.length && (
            <line
              x1={BAR_X(sortedFrom) - 10}
              y1="22"
              x2={BAR_X(sortedFrom) - 10}
              y2={BAR_BASELINE}
              className={STROKE_FAINT}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}

          <line
            x1="24"
            y1={BAR_BASELINE}
            x2="216"
            y2={BAR_BASELINE}
            className={STROKE_FAINT}
            strokeWidth="1"
          />

          {compare !== null && compareEnd !== null && (
            <path
              d={`M ${BAR_X(compare)} 28 L ${BAR_X(compare)} 22 L ${BAR_X(compareEnd) + 20} 22 L ${BAR_X(compareEnd) + 20} 28`}
              fill="none"
              className={STROKE}
              strokeWidth="1"
            />
          )}

          {values.map((h, i) => {
            const x = BAR_X(i);
            const isCompare =
              compare !== null && (i === compare || i === compare + 1);
            const isSorted = i >= sortedFrom;

            return (
              <g key={i}>
                <motion.rect
                  x={x}
                  width="20"
                  rx="2"
                  className={
                    isCompare && swapped
                      ? INK
                      : isCompare
                        ? INK_MID
                        : isSorted
                          ? INK_MID
                          : INK_FAINT
                  }
                  fillOpacity={
                    isCompare && swapped ? 1 : isCompare ? 0.85 : isSorted ? 0.5 : 0.35
                  }
                  animate={{ y: BAR_BASELINE - h, height: h }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <text
                  x={x + 10}
                  y="100"
                  textAnchor="middle"
                  fontSize="9"
                  className={isCompare ? INK : INK_SOFT}
                  fontFamily="var(--font-outfit), sans-serif"
                >
                  {h}
                </text>
              </g>
            );
          })}

        <g
          role="button"
          tabIndex={0}
          aria-label={playing ? "Pause bubble sort" : "Play bubble sort"}
          className="cursor-pointer"
          style={{ outline: "none" }}
          onClick={(e) => {
            e.stopPropagation();
            setPlaying((p) => !p);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setPlaying((p) => !p);
            }
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <rect
            x={playX - 4}
            y={playY - 4}
            width={INTERACTIVE_BTN_W + 8}
            height={INTERACTIVE_BTN_H + 8}
            fill="transparent"
          />
          <rect
            x={playX}
            y={playY}
            width={INTERACTIVE_BTN_W}
            height={INTERACTIVE_BTN_H}
            rx="5"
            fill="none"
            className={STROKE_FAINT}
            strokeWidth="0.75"
          />
          {playing ? (
            <>
              <rect
                x={INTERACTIVE_PLAY_CX - 5}
                y={INTERACTIVE_BTN_Y - 5}
                width="3"
                height="10"
                rx="0.5"
                className={INK}
              />
              <rect
                x={INTERACTIVE_PLAY_CX + 2}
                y={INTERACTIVE_BTN_Y - 5}
                width="3"
                height="10"
                rx="0.5"
                className={INK}
              />
            </>
          ) : (
            <path
              d={`M ${INTERACTIVE_PLAY_CX - 4} ${INTERACTIVE_BTN_Y - 5} L ${INTERACTIVE_PLAY_CX + 5} ${INTERACTIVE_BTN_Y} L ${INTERACTIVE_PLAY_CX - 4} ${INTERACTIVE_BTN_Y + 5} Z`}
              className={INK}
            />
          )}
        </g>
        </svg>
      </div>
    </IllustrationCard>
  );
}

const TREE_NODES = [
  { value: 5, x: 120, y: 36, level: 0 },
  { value: 3, x: 72, y: 66, level: 1 },
  { value: 7, x: 168, y: 66, level: 1 },
  { value: 1, x: 48, y: 96, level: 2 },
  { value: 9, x: 192, y: 96, level: 2 },
] as const;

const TREE_EDGES: [number, number][] = [
  [5, 3],
  [5, 7],
  [3, 1],
  [7, 9],
];

const NODE_BY_VALUE = Object.fromEntries(
  TREE_NODES.map((n) => [n.value, n]),
) as Record<number, (typeof TREE_NODES)[number]>;

function edgeKey(a: number, b: number) {
  return `${Math.min(a, b)}-${Math.max(a, b)}`;
}

/** Tree lights level-by-level — knowledge propagates through every node */
export function UnforgettableIllustration({
  isInView,
}: {
  isInView: boolean;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const delay = phase === 3 ? 1400 : phase === 4 ? 500 : 900;
    const id = window.setInterval(() => {
      setPhase((p) => (p + 1) % 5);
    }, delay);
    return () => window.clearInterval(id);
  }, [isInView, phase]);

  const litLevel = phase === 4 ? -1 : Math.min(phase, 2);
  const allLit = litLevel === 2;

  const isNodeLit = (level: number) => level <= litLevel;
  const isNodeActive = (level: number) => level === litLevel && phase < 3;

  return (
    <IllustrationCard label="Unforgettable" delay={0.69} isInView={isInView}>
      <svg
        viewBox="0 0 240 130"
        className="mx-auto h-auto w-full max-w-[240px]"
        role="img"
        aria-label="Tree lighting up level by level"
      >
        <text
          x="120"
          y="0"
          dominantBaseline="hanging"
          textAnchor="middle"
          fontSize="8"
          className={LABEL}
          fontFamily="var(--font-outfit), sans-serif"
        >
          level by level
        </text>

        {TREE_EDGES.map(([a, b]) => {
          const n1 = NODE_BY_VALUE[a];
          const n2 = NODE_BY_VALUE[b];
          const lit =
            isNodeLit(n1.level) && isNodeLit(n2.level) && litLevel >= 0;
          return (
            <motion.line
              key={edgeKey(a, b)}
              x1={n1.x}
              y1={n1.y + 5}
              x2={n2.x}
              y2={n2.y - 5}
              className={lit ? STROKE : STROKE_FAINT}
              strokeWidth={lit ? 1.5 : 1}
              animate={{ opacity: lit ? 1 : 0.35 }}
              transition={{ duration: 0.45 }}
            />
          );
        })}

        {TREE_NODES.map((node) => {
          const lit = isNodeLit(node.level);
          const active = isNodeActive(node.level);

          return (
            <g key={node.value}>
              {lit && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="13"
                  fill="none"
                  className={STROKE}
                  strokeWidth="1"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: allLit ? [0.4, 0.7, 0.4] : 0.55,
                    scale: active ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: active ? 0.6 : allLit ? 2 : 0.4,
                    repeat: allLit ? Infinity : 0,
                  }}
                />
              )}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="9"
                className={lit ? INK : INK_FAINT}
                fillOpacity={lit ? 1 : 0.35}
                animate={{ scale: active ? 1.15 : 1 }}
                transition={{ duration: 0.35 }}
              />
              <text
                x={node.x}
                y={node.y + 3.5}
                textAnchor="middle"
                fontSize="9"
                fontWeight="500"
                className={lit ? "fill-neutral-900" : INK_SOFT}
                fontFamily="var(--font-outfit), sans-serif"
              >
                {node.value}
              </text>
            </g>
          );
        })}

      </svg>
    </IllustrationCard>
  );
}

export function NeedIllustrations({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.52 }}
      className="mt-16 grid grid-cols-1 gap-12 sm:mt-20 sm:grid-cols-3 sm:gap-10 lg:mt-24 lg:gap-14"
    >
      <VisibleIllustration isInView={isInView} />
      <InteractiveIllustration isInView={isInView} />
      <UnforgettableIllustration isInView={isInView} />
    </motion.div>
  );
}
