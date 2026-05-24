"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useState } from "react";

const INK = "fill-neutral-800 dark:fill-neutral-100";
const INK_MID = "fill-neutral-500 dark:fill-neutral-400";
const INK_SOFT = "fill-neutral-400 dark:fill-neutral-500";
const INK_FAINT = "fill-neutral-300 dark:fill-neutral-600";
const STROKE = "stroke-neutral-500 dark:stroke-neutral-400";
const STROKE_FAINT = "stroke-neutral-300 dark:stroke-neutral-600";
const STROKE_STRONG = "stroke-neutral-700 dark:stroke-neutral-200";
const LABEL = "fill-neutral-500 dark:fill-neutral-400";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const TICK_SLOW = 2200;
const TICK_MED = 1900;
const MOTION = { duration: 0.85, ease: EASE };
const ILLUSTRATION_VB_W = 220;
const ILLUSTRATION_VB_H = 112;
/** Uniform scale — slightly larger than default, fits inside each bento cell */
const ILLUSTRATION_SCALE = 1.12;

function MiniSvg({
  children,
  label,
  viewBox = `0 0 ${ILLUSTRATION_VB_W} ${ILLUSTRATION_VB_H}`,
}: {
  children: React.ReactNode;
  label: string;
  viewBox?: string;
}) {
  const parts = viewBox.split(/\s+/).map(Number);
  const vbW = parts[2] ?? ILLUSTRATION_VB_W;
  const vbH = parts[3] ?? ILLUSTRATION_VB_H;
  const cx = vbW / 2;
  const cy = vbH / 2;

  return (
    <svg
      viewBox={viewBox}
      className="h-full w-full max-h-[148px] max-w-[272px]"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform={`translate(${cx} ${cy}) scale(${ILLUSTRATION_SCALE}) translate(${-cx} ${-cy})`}
      >
        {children}
      </g>
    </svg>
  );
}

const STEP_SPRING = { type: "spring" as const, stiffness: 90, damping: 16, mass: 0.8 };

const STEP_CELL_W = 28;
const STEP_CELL_H = 34;
const STEP_CELL_GAP = 6;
const STEP_CELL_STEP = STEP_CELL_W + STEP_CELL_GAP;
const STEP_COUNT = 5;
const STEP_ARRAY_W =
  STEP_COUNT * STEP_CELL_W + (STEP_COUNT - 1) * STEP_CELL_GAP;
const STEP_VB_W = ILLUSTRATION_VB_W;
const STEP_VB_H = ILLUSTRATION_VB_H;
const STEP_ORIGIN_X = (STEP_VB_W - STEP_ARRAY_W) / 2;
const STEP_ROW_Y = 34;
const STEP_CONTAINER_PAD = 10;
const STEP_CONTAINER_X = STEP_ORIGIN_X - STEP_CONTAINER_PAD;
const STEP_CONTAINER_Y = STEP_ROW_Y - STEP_CONTAINER_PAD;
const STEP_CONTAINER_W = STEP_ARRAY_W + STEP_CONTAINER_PAD * 2;
const STEP_CONTAINER_H = STEP_CELL_H + STEP_CONTAINER_PAD * 2 + 18;
const STEP_BASELINE_Y = STEP_ROW_Y + STEP_CELL_H + 12;

const stepCellX = (i: number) => STEP_ORIGIN_X + i * STEP_CELL_STEP;

type StepAction = { a: number; b: number; mode: "compare" | "swap" };

const STEP_SEQUENCE: StepAction[] = [
  { a: 0, b: 1, mode: "compare" },
  { a: 0, b: 1, mode: "swap" },
  { a: 1, b: 2, mode: "compare" },
  { a: 1, b: 2, mode: "swap" },
  { a: 2, b: 3, mode: "compare" },
  { a: 3, b: 4, mode: "compare" },
  { a: 3, b: 4, mode: "swap" },
];

export function StepThroughMini({ isInView }: { isInView: boolean }) {
  const clipId = useId().replace(/:/g, "");
  const [values, setValues] = useState([38, 52, 21, 47, 15]);
  const [stepIdx, setStepIdx] = useState(0);
  const [swapping, setSwapping] = useState(false);

  const { a, b, mode } = STEP_SEQUENCE[stepIdx];
  const isCompare = mode === "compare" && !swapping;

  useEffect(() => {
    if (!isInView) return;

    const action = STEP_SEQUENCE[stepIdx];

    if (action.mode === "swap") {
      setSwapping(true);
      const swapTimer = window.setTimeout(() => {
        setValues((prev) => {
          const next = [...prev];
          [next[action.a], next[action.b]] = [next[action.b], next[action.a]];
          return next;
        });
        setSwapping(false);
        setStepIdx((i) => (i + 1) % STEP_SEQUENCE.length);
      }, 950);
      return () => window.clearTimeout(swapTimer);
    }

    const compareTimer = window.setTimeout(() => {
      setStepIdx((i) => (i + 1) % STEP_SEQUENCE.length);
    }, 1800);
    return () => window.clearTimeout(compareTimer);
  }, [isInView, stepIdx]);

  const swapOffset = swapping ? STEP_CELL_STEP : 0;
  const pairLeft = stepCellX(Math.min(a, b)) - 4;
  const pairWidth = stepCellX(Math.max(a, b)) - stepCellX(Math.min(a, b)) + STEP_CELL_W + 8;

  return (
    <MiniSvg
      label="Step-by-step array execution"
      viewBox={`0 0 ${STEP_VB_W} ${STEP_VB_H}`}
    >
      <motion.text
        x={STEP_VB_W / 2}
        y="14"
        textAnchor="middle"
        fontSize="6.5"
        className={LABEL}
        fontFamily="var(--font-outfit), sans-serif"
        animate={{ opacity: swapping ? 0.9 : isCompare ? 0.75 : 0.4 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {swapping ? "swap" : isCompare ? `compare · ${a} & ${b}` : "next"}
      </motion.text>

      <rect
        x={STEP_CONTAINER_X}
        y={STEP_CONTAINER_Y}
        width={STEP_CONTAINER_W}
        height={STEP_CONTAINER_H}
        rx="8"
        className={INK_FAINT}
        fillOpacity="0.06"
      />
      <rect
        x={STEP_CONTAINER_X}
        y={STEP_CONTAINER_Y}
        width={STEP_CONTAINER_W}
        height={STEP_CONTAINER_H}
        rx="8"
        fill="none"
        className={STROKE_FAINT}
        strokeWidth="1"
      />

      <line
        x1={STEP_ORIGIN_X}
        y1={STEP_BASELINE_Y}
        x2={STEP_ORIGIN_X + STEP_ARRAY_W}
        y2={STEP_BASELINE_Y}
        className={STROKE_FAINT}
        strokeWidth="1"
      />

      <defs>
        <clipPath id={clipId}>
          <rect
            x={STEP_CONTAINER_X + 1}
            y={STEP_CONTAINER_Y + 1}
            width={STEP_CONTAINER_W - 2}
            height={STEP_CONTAINER_H - 14}
            rx="7"
          />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {isCompare && (
          <motion.rect
            x={pairLeft}
            y={STEP_ROW_Y - 4}
            width={pairWidth}
            height={STEP_CELL_H + 8}
            rx="5"
            fill="none"
            className={STROKE_STRONG}
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        )}

        {values.map((val, i) => {
          const baseX = stepCellX(i);
          let x = baseX;
          if (swapping) {
            if (i === a) x = baseX + swapOffset;
            if (i === b) x = baseX - swapOffset;
          }
          const inPair = i === a || i === b;
          const active = isCompare && inPair;

          return (
            <motion.g key={i} animate={{ x }} transition={STEP_SPRING}>
              <rect
                x={1}
                y={STEP_ROW_Y + 1}
                width={STEP_CELL_W - 2}
                height={STEP_CELL_H - 2}
                rx="4"
                className={INK_FAINT}
                fillOpacity={active ? 0.12 : swapping && inPair ? 0.16 : 0.05}
              />
              <motion.rect
                x={0}
                y={STEP_ROW_Y}
                width={STEP_CELL_W}
                height={STEP_CELL_H}
                rx="5"
                fill="none"
                className={active || (swapping && inPair) ? STROKE_STRONG : STROKE_FAINT}
                strokeWidth={active || (swapping && inPair) ? 1 : 0.5}
                animate={{ opacity: active ? 1 : swapping && inPair ? 0.9 : 0.4 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
              <motion.text
                x={STEP_CELL_W / 2}
                y={STEP_ROW_Y + STEP_CELL_H / 2 + 4}
                textAnchor="middle"
                fontSize="10"
                className={active || (swapping && inPair) ? INK : INK_SOFT}
                fontFamily="var(--font-outfit), sans-serif"
                fontWeight="300"
                animate={{ opacity: active || (swapping && inPair) ? 1 : 0.45 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {val}
              </motion.text>
            </motion.g>
          );
        })}
      </g>

      <motion.g
        animate={{ x: stepCellX(a) }}
        transition={STEP_SPRING}
      >
        <motion.line
          x1={STEP_CELL_W / 2}
          y1={STEP_BASELINE_Y + 2}
          x2={STEP_CELL_W / 2}
          y2={STEP_BASELINE_Y + 8}
          className={STROKE_STRONG}
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ opacity: isCompare ? 1 : 0.3 }}
          transition={{ duration: 0.4, ease: EASE }}
        />
        <motion.polygon
          points={`${STEP_CELL_W / 2},${STEP_BASELINE_Y} ${STEP_CELL_W / 2 - 3.5},${STEP_BASELINE_Y + 5} ${STEP_CELL_W / 2 + 3.5},${STEP_BASELINE_Y + 5}`}
          className={INK}
          animate={{ opacity: isCompare ? 1 : 0.3 }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </motion.g>
    </MiniSvg>
  );
}

const CTRL_VB_W = STEP_VB_W;
const CTRL_VB_H = STEP_VB_H;
const CTRL_CONTAINER_X = STEP_CONTAINER_X;
const CTRL_CONTAINER_Y = 22;
const CTRL_CONTAINER_W = STEP_CONTAINER_W;
const CTRL_CONTAINER_H = 72;
const CTRL_TRACK_X = STEP_ORIGIN_X;
const CTRL_TRACK_W = STEP_ARRAY_W;
const CTRL_TRACK_Y = 36;
const CTRL_BTN_Y = 76;
const CTRL_BTN_W = 30;
const CTRL_BTN_H = 26;
const CTRL_PLAY_CX = CTRL_VB_W / 2;

export function InteractiveControlsMini({ isInView }: { isInView: boolean }) {
  const [progress, setProgress] = useState(10);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!isInView || !playing) return;
    const id = window.setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.55));
    }, 100);
    return () => window.clearInterval(id);
  }, [isInView, playing]);

  useEffect(() => {
    if (!isInView) return;
    setPlaying(true);
    return () => setPlaying(false);
  }, [isInView]);

  const headX = CTRL_TRACK_X + (progress / 100) * CTRL_TRACK_W;
  const frame = Math.min(24, Math.floor((progress / 100) * 24) + 1);
  const playX = CTRL_PLAY_CX - CTRL_BTN_W / 2;
  const playY = CTRL_BTN_Y - CTRL_BTN_H / 2;

  return (
    <MiniSvg
      label="Play pause and step controls"
      viewBox={`0 0 ${CTRL_VB_W} ${CTRL_VB_H}`}
    >
      <motion.text
        x={CTRL_VB_W / 2}
        y="14"
        textAnchor="middle"
        fontSize="6.5"
        className={LABEL}
        fontFamily="var(--font-outfit), sans-serif"
        animate={{ opacity: playing ? 0.75 : 0.5 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {playing ? `playing · frame ${frame}` : `paused · frame ${frame}`}
      </motion.text>

      <rect
        x={CTRL_CONTAINER_X}
        y={CTRL_CONTAINER_Y}
        width={CTRL_CONTAINER_W}
        height={CTRL_CONTAINER_H}
        rx="8"
        className={INK_FAINT}
        fillOpacity="0.06"
      />
      <rect
        x={CTRL_CONTAINER_X}
        y={CTRL_CONTAINER_Y}
        width={CTRL_CONTAINER_W}
        height={CTRL_CONTAINER_H}
        rx="8"
        fill="none"
        className={STROKE_FAINT}
        strokeWidth="1"
      />

      <line
        x1={CTRL_TRACK_X}
        y1={CTRL_TRACK_Y + 14}
        x2={CTRL_TRACK_X + CTRL_TRACK_W}
        y2={CTRL_TRACK_Y + 14}
        className={STROKE_FAINT}
        strokeWidth="1"
      />

      {[0, 25, 50, 75, 100].map((tick) => {
        const tx = CTRL_TRACK_X + (tick / 100) * CTRL_TRACK_W;
        return (
          <line
            key={tick}
            x1={tx}
            y1={CTRL_TRACK_Y + 10}
            x2={tx}
            y2={CTRL_TRACK_Y + 14}
            className={STROKE_FAINT}
            strokeWidth="1"
          />
        );
      })}

      <line
        x1={CTRL_TRACK_X}
        y1={CTRL_TRACK_Y}
        x2={CTRL_TRACK_X + CTRL_TRACK_W}
        y2={CTRL_TRACK_Y}
        className={STROKE_FAINT}
        strokeWidth="1"
        strokeLinecap="round"
      />

      <motion.line
        x1={CTRL_TRACK_X}
        y1={CTRL_TRACK_Y}
        x2={headX}
        y2={CTRL_TRACK_Y}
        className={STROKE_STRONG}
        strokeWidth="1.5"
        strokeLinecap="round"
        transition={STEP_SPRING}
      />
      <motion.circle
        cx={headX}
        cy={CTRL_TRACK_Y}
        r="4"
        className={INK}
        transition={STEP_SPRING}
      />

      <text
        x={CTRL_TRACK_X}
        y={CTRL_TRACK_Y + 26}
        fontSize="6"
        className={LABEL}
        fontFamily="var(--font-outfit), sans-serif"
      >
        0
      </text>
      <text
        x={CTRL_TRACK_X + CTRL_TRACK_W}
        y={CTRL_TRACK_Y + 26}
        textAnchor="end"
        fontSize="6"
        className={LABEL}
        fontFamily="var(--font-outfit), sans-serif"
      >
        24
      </text>

      <g
        role="button"
        tabIndex={-1}
        className="cursor-pointer"
        style={{ outline: "none" }}
        onClick={(e) => {
          e.stopPropagation();
          setPlaying((p) => !p);
        }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <rect
          x={playX - 4}
          y={playY - 4}
          width={CTRL_BTN_W + 8}
          height={CTRL_BTN_H + 8}
          fill="transparent"
        />
        <rect
          x={playX}
          y={playY}
          width={CTRL_BTN_W}
          height={CTRL_BTN_H}
          rx="5"
          className={INK_FAINT}
          fillOpacity="0.05"
        />
        <rect
          x={playX}
          y={playY}
          width={CTRL_BTN_W}
          height={CTRL_BTN_H}
          rx="5"
          fill="none"
          className={STROKE_FAINT}
          strokeWidth="0.5"
        />
        {playing ? (
          <>
            <rect x={CTRL_PLAY_CX - 5} y={CTRL_BTN_Y - 5} width="3" height="10" rx="0.5" className={INK} />
            <rect x={CTRL_PLAY_CX + 2} y={CTRL_BTN_Y - 5} width="3" height="10" rx="0.5" className={INK} />
          </>
        ) : (
          <path
            d={`M ${CTRL_PLAY_CX - 4} ${CTRL_BTN_Y - 5} L ${CTRL_PLAY_CX + 5} ${CTRL_BTN_Y} L ${CTRL_PLAY_CX - 4} ${CTRL_BTN_Y + 5} Z`}
            className={INK}
          />
        )}
      </g>
    </MiniSvg>
  );
}

const CODE_VB_W = STEP_VB_W;
const CODE_VB_H = STEP_VB_H;
const CODE_CONTAINER_X = STEP_CONTAINER_X;
const CODE_CONTAINER_Y = 22;
const CODE_CONTAINER_W = STEP_CONTAINER_W;
const CODE_CONTAINER_H = 72;
const CODE_HEADER_H = 13;
const CODE_BODY_X = CODE_CONTAINER_X + 8;
const CODE_BODY_W = CODE_CONTAINER_W - 16;
const CODE_GUTTER_W = 14;
const CODE_LINE_X = CODE_BODY_X + CODE_GUTTER_W + 4;
const CODE_LINE_W = CODE_BODY_W - CODE_GUTTER_W - 8;
const CODE_LINE_STEP = 11.5;
const CODE_LINES_TOP = CODE_CONTAINER_Y + CODE_HEADER_H + 10;
const CODE_BADGE_W = 22;
const CODE_BADGE_H = 7;
const CODE_BADGE_X = CODE_CONTAINER_X + CODE_CONTAINER_W - CODE_BADGE_W;
const CODE_BADGE_Y = CODE_CONTAINER_Y + 3;

const CODE_LINES = [
  "def search(arr, x):",
  "  lo, hi = 0, n - 1",
  "  while lo <= hi:",
  "    mid = (lo + hi) // 2",
  "    return arr[mid]",
];

export function CodeExamplesMini({ isInView }: { isInView: boolean }) {
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = window.setInterval(() => {
      setHighlight((h) => (h + 1) % CODE_LINES.length);
    }, TICK_SLOW);
    return () => window.clearInterval(id);
  }, [isInView]);

  const lineY = (i: number) => CODE_LINES_TOP + i * CODE_LINE_STEP;

  return (
    <MiniSvg
      label="Annotated code with complexity"
      viewBox={`0 0 ${CODE_VB_W} ${CODE_VB_H}`}
    >
      <text
        x={CODE_VB_W / 2}
        y="14"
        textAnchor="middle"
        fontSize="6.5"
        className={LABEL}
        fontFamily="var(--font-outfit), sans-serif"
      >
        search.py · line {highlight + 1}
      </text>

      <rect
        x={CODE_CONTAINER_X}
        y={CODE_CONTAINER_Y}
        width={CODE_CONTAINER_W}
        height={CODE_CONTAINER_H}
        rx="8"
        className={INK_FAINT}
        fillOpacity="0.06"
      />
      <rect
        x={CODE_CONTAINER_X}
        y={CODE_CONTAINER_Y}
        width={CODE_CONTAINER_W}
        height={CODE_CONTAINER_H}
        rx="8"
        fill="none"
        className={STROKE_FAINT}
        strokeWidth="1"
      />

      <rect
        x={CODE_CONTAINER_X}
        y={CODE_CONTAINER_Y}
        width={CODE_CONTAINER_W}
        height={CODE_HEADER_H}
        rx="8"
        className={INK_FAINT}
        fillOpacity="0.08"
      />
      <line
        x1={CODE_CONTAINER_X}
        y1={CODE_CONTAINER_Y + CODE_HEADER_H}
        x2={CODE_CONTAINER_X + CODE_CONTAINER_W}
        y2={CODE_CONTAINER_Y + CODE_HEADER_H}
        className={STROKE_FAINT}
        strokeWidth="1"
      />

      <circle cx={CODE_BODY_X + 6} cy={CODE_CONTAINER_Y + 8} r="2" className={INK_SOFT} />
      <circle cx={CODE_BODY_X + 13} cy={CODE_CONTAINER_Y + 8} r="2" className={INK_FAINT} />
      <circle cx={CODE_BODY_X + 20} cy={CODE_CONTAINER_Y + 8} r="2" className={INK_FAINT} />
      <text
        x={CODE_BODY_X + 28}
        y={CODE_CONTAINER_Y + 10}
        fontSize="6"
        className={LABEL}
        fontFamily="ui-monospace, monospace"
      >
        search.py
      </text>

      <line
        x1={CODE_LINE_X - 3}
        y1={CODE_CONTAINER_Y + CODE_HEADER_H + 4}
        x2={CODE_LINE_X - 3}
        y2={CODE_CONTAINER_Y + CODE_CONTAINER_H - 6}
        className={STROKE_FAINT}
        strokeWidth="1"
      />

      {CODE_LINES.map((line, i) => {
        const active = i === highlight;
        return (
          <g key={line}>
            <motion.rect
              x={CODE_LINE_X - 2}
              y={lineY(i) - 7}
              width={CODE_LINE_W + 4}
              height={10}
              rx="2"
              className={INK}
              initial={false}
              animate={{ opacity: active ? 0.05 : 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            />
            {active && (
              <motion.rect
                x={CODE_LINE_X - 4}
                y={lineY(i) - 6}
                width="1.5"
                height={9}
                rx="0.75"
                className={INK_MID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                transition={{ duration: 0.55, ease: EASE }}
              />
            )}
            <motion.text
              x={CODE_BODY_X + CODE_GUTTER_W - 2}
              y={lineY(i) + 1}
              textAnchor="end"
              fontSize="6"
              className={active ? INK_MID : INK_FAINT}
              fontFamily="ui-monospace, monospace"
              animate={{ opacity: active ? 0.75 : 0.4 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              {i + 1}
            </motion.text>
            <motion.text
              x={CODE_LINE_X}
              y={lineY(i)}
              fontSize="6.5"
              className={active ? INK : INK_SOFT}
              fontFamily="ui-monospace, monospace"
              animate={{ opacity: active ? 0.82 : 0.48 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              {line}
            </motion.text>
          </g>
        );
      })}

      <rect
        x={CODE_BADGE_X}
        y={CODE_BADGE_Y}
        width={CODE_BADGE_W}
        height={CODE_BADGE_H}
        rx="2"
        className={INK_FAINT}
        fillOpacity="0.06"
      />
      <rect
        x={CODE_BADGE_X}
        y={CODE_BADGE_Y}
        width={CODE_BADGE_W}
        height={CODE_BADGE_H}
        rx="2"
        fill="none"
        className={STROKE_FAINT}
        strokeWidth="0.5"
      />
      <text
        x={CODE_BADGE_X + CODE_BADGE_W / 2}
        y={CODE_BADGE_Y + 5}
        textAnchor="middle"
        fontSize="4.5"
        className={INK_MID}
        fontFamily="var(--font-outfit), sans-serif"
      >
        O(log n)
      </text>
    </MiniSvg>
  );
}

const INPUT_VB_W = STEP_VB_W;
const INPUT_VB_H = STEP_VB_H;
const INPUT_CONTAINER_X = STEP_CONTAINER_X;
const INPUT_CONTAINER_Y = 22;
const INPUT_CONTAINER_W = STEP_CONTAINER_W;
const INPUT_CONTAINER_H = 72;
const INPUT_INSET = 10;
const INPUT_FIELD_X = INPUT_CONTAINER_X + INPUT_INSET;
const INPUT_FIELD_W = INPUT_CONTAINER_W - INPUT_INSET * 2;
const INPUT_FIELD_Y = INPUT_CONTAINER_Y + 14;
const INPUT_FIELD_H = 16;
const INPUT_CELL_W = 26;
const INPUT_CELL_H = 22;
const INPUT_CELL_GAP = 5;
const INPUT_CELL_STEP = INPUT_CELL_W + INPUT_CELL_GAP;
const INPUT_VALUES = [3, 1, 4] as const;
const INPUT_TEXT = "3, 1, 4";
const INPUT_CELL_COUNT = INPUT_VALUES.length;
const INPUT_ARRAY_W =
  INPUT_CELL_COUNT * INPUT_CELL_W + (INPUT_CELL_COUNT - 1) * INPUT_CELL_GAP;
const INPUT_ARRAY_X = INPUT_CONTAINER_X + (INPUT_CONTAINER_W - INPUT_ARRAY_W) / 2;
const INPUT_ARRAY_Y = INPUT_CONTAINER_Y + 38;
const INPUT_CONNECTOR_X = INPUT_CONTAINER_X + INPUT_CONTAINER_W / 2;

type InputPhase = "typing" | "run" | "show";

export function CustomInputMini({ isInView }: { isInView: boolean }) {
  const clipId = useId().replace(/:/g, "");
  const [phase, setPhase] = useState<InputPhase>("typing");
  const [charCount, setCharCount] = useState(0);
  const [visibleCells, setVisibleCells] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (phase === "typing") {
      if (charCount < INPUT_TEXT.length) {
        const id = window.setTimeout(() => setCharCount((c) => c + 1), 420);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => setPhase("run"), 500);
      return () => window.clearTimeout(id);
    }

    if (phase === "run") {
      const id = window.setTimeout(() => {
        setPhase("show");
        setVisibleCells(1);
      }, 700);
      return () => window.clearTimeout(id);
    }

    if (phase === "show" && visibleCells < INPUT_CELL_COUNT) {
      const id = window.setTimeout(() => setVisibleCells((n) => n + 1), 550);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setPhase("typing");
      setCharCount(0);
      setVisibleCells(0);
    }, 2200);
    return () => window.clearTimeout(id);
  }, [isInView, phase, charCount, visibleCells]);

  const typed = INPUT_TEXT.slice(0, charCount);
  const isTyping = phase === "typing";
  const isRun = phase === "run";
  const showCells = phase === "show";

  const statusLabel = isTyping
    ? "typing input"
    : isRun
      ? "run →"
      : `visualized · [${INPUT_VALUES.slice(0, visibleCells).join(", ")}]`;

  const inputCellX = (i: number) => INPUT_ARRAY_X + i * STEP_CELL_STEP;

  return (
    <MiniSvg
      label="Custom input flowing into visualization"
      viewBox={`0 0 ${INPUT_VB_W} ${INPUT_VB_H}`}
    >
      <motion.text
        x={INPUT_VB_W / 2}
        y="14"
        textAnchor="middle"
        fontSize="6.5"
        className={LABEL}
        fontFamily="var(--font-outfit), sans-serif"
        animate={{ opacity: isRun ? 0.9 : 0.7 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {statusLabel}
      </motion.text>

      <rect
        x={INPUT_CONTAINER_X}
        y={INPUT_CONTAINER_Y}
        width={INPUT_CONTAINER_W}
        height={INPUT_CONTAINER_H}
        rx="8"
        className={INK_FAINT}
        fillOpacity="0.06"
      />
      <rect
        x={INPUT_CONTAINER_X}
        y={INPUT_CONTAINER_Y}
        width={INPUT_CONTAINER_W}
        height={INPUT_CONTAINER_H}
        rx="8"
        fill="none"
        className={STROKE_FAINT}
        strokeWidth="1"
      />

      <defs>
        <clipPath id={clipId}>
          <rect
            x={INPUT_CONTAINER_X + 1}
            y={INPUT_CONTAINER_Y + 1}
            width={INPUT_CONTAINER_W - 2}
            height={INPUT_CONTAINER_H - 2}
            rx="7"
          />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
      <text
        x={INPUT_FIELD_X}
        y={INPUT_FIELD_Y - 3}
        fontSize="6"
        className={LABEL}
        fontFamily="var(--font-outfit), sans-serif"
      >
        input
      </text>
      <rect
        x={INPUT_FIELD_X}
        y={INPUT_FIELD_Y}
        width={INPUT_FIELD_W}
        height={INPUT_FIELD_H}
        rx="5"
        fill="none"
        className={isTyping || isRun ? STROKE_STRONG : STROKE_FAINT}
        strokeWidth={isTyping ? 1 : 0.5}
      />
      <rect
        x={INPUT_FIELD_X + 1}
        y={INPUT_FIELD_Y + 1}
        width={INPUT_FIELD_W - 2}
        height={INPUT_FIELD_H - 2}
        rx="4"
        className={INK_FAINT}
        fillOpacity="0.05"
      />
      <text
        x={INPUT_FIELD_X + 8}
        y={INPUT_FIELD_Y + 12}
        fontSize="8"
        className={INK}
        fontFamily="ui-monospace, monospace"
      >
        {typed}
        {isTyping && charCount < INPUT_TEXT.length && (
          <motion.tspan
            className={INK_MID}
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          >
            |
          </motion.tspan>
        )}
      </text>

      <motion.line
        x1={INPUT_CONNECTOR_X}
        y1={INPUT_FIELD_Y + INPUT_FIELD_H + 3}
        x2={INPUT_CONNECTOR_X}
        y2={INPUT_ARRAY_Y - 4}
        className={STROKE_FAINT}
        strokeWidth="1"
        strokeDasharray="3 3"
        animate={{ opacity: showCells || isRun ? 0.85 : 0.3 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      <motion.polygon
        points={`${INPUT_CONNECTOR_X},${INPUT_ARRAY_Y - 4} ${INPUT_CONNECTOR_X - 3},${INPUT_ARRAY_Y - 8} ${INPUT_CONNECTOR_X + 3},${INPUT_ARRAY_Y - 8}`}
        className={INK_SOFT}
        animate={{ opacity: showCells || isRun ? 0.8 : 0.25 }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      {INPUT_VALUES.map((val, i) => {
        const x = inputCellX(i);
        const visible = showCells && i < visibleCells;
        return (
          <g key={i}>
            <motion.rect
              x={x}
              y={INPUT_ARRAY_Y}
              width={INPUT_CELL_W}
              height={INPUT_CELL_H}
              rx="5"
              fill="none"
              className={visible ? STROKE_STRONG : STROKE_FAINT}
              strokeWidth={visible ? 1 : 0.5}
              initial={false}
              animate={{ opacity: visible ? 1 : 0.28 }}
              transition={{ duration: 0.65, ease: EASE }}
            />
            <rect
              x={x + 1}
              y={INPUT_ARRAY_Y + 1}
              width={INPUT_CELL_W - 2}
              height={INPUT_CELL_H - 2}
              rx="4"
              className={INK_FAINT}
              fillOpacity={visible ? 0.12 : 0.04}
            />
            <motion.text
              x={x + INPUT_CELL_W / 2}
              y={INPUT_ARRAY_Y + INPUT_CELL_H / 2 + 3}
              textAnchor="middle"
              fontSize="9"
              className={visible ? INK : INK_SOFT}
              fontFamily="var(--font-outfit), sans-serif"
              fontWeight="300"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : 0.92,
              }}
              transition={STEP_SPRING}
            >
              {val}
            </motion.text>
          </g>
        );
      })}
      </g>
    </MiniSvg>
  );
}

const CONCEPT_VB_W = STEP_VB_W;
const CONCEPT_VB_H = STEP_VB_H;
const CONCEPT_CONTAINER_X = STEP_CONTAINER_X;
const CONCEPT_CONTAINER_Y = 22;
const CONCEPT_CONTAINER_W = STEP_CONTAINER_W;
const CONCEPT_CONTAINER_H = 72;
const CONCEPT_CARD_X = CONCEPT_CONTAINER_X + 10;
const CONCEPT_CARD_W = CONCEPT_CONTAINER_W - 20;
const CONCEPT_RAIL_X = CONCEPT_CARD_X + 6;
const CONCEPT_ROW_H = 16;
const CONCEPT_ROW_GAP = 5;
const CONCEPT_ROWS_TOP = CONCEPT_CONTAINER_Y + 11;
const CONCEPT_LAYERS = [
  { label: "Problem", detail: "define the goal clearly" },
  { label: "Strategy", detail: "pick the right approach" },
  { label: "Complexity", detail: "O(log n) · O(1) space" },
] as const;

const conceptRowY = (i: number) => CONCEPT_ROWS_TOP + i * (CONCEPT_ROW_H + CONCEPT_ROW_GAP);

export function ConceptBreakdownMini({ isInView }: { isInView: boolean }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % CONCEPT_LAYERS.length);
    }, TICK_SLOW);
    return () => window.clearInterval(id);
  }, [isInView]);

  const layer = CONCEPT_LAYERS[active];

  return (
    <MiniSvg
      label="Layered concept breakdown"
      viewBox={`0 0 ${CONCEPT_VB_W} ${CONCEPT_VB_H}`}
    >
      <text
        x={CONCEPT_VB_W / 2}
        y="14"
        textAnchor="middle"
        fontSize="6.5"
        className={LABEL}
        fontFamily="var(--font-outfit), sans-serif"
      >
        concept · {layer.label.toLowerCase()}
      </text>

      <rect
        x={CONCEPT_CONTAINER_X}
        y={CONCEPT_CONTAINER_Y}
        width={CONCEPT_CONTAINER_W}
        height={CONCEPT_CONTAINER_H}
        rx="8"
        className={INK_FAINT}
        fillOpacity="0.06"
      />
      <rect
        x={CONCEPT_CONTAINER_X}
        y={CONCEPT_CONTAINER_Y}
        width={CONCEPT_CONTAINER_W}
        height={CONCEPT_CONTAINER_H}
        rx="8"
        fill="none"
        className={STROKE_FAINT}
        strokeWidth="1"
      />

      {CONCEPT_LAYERS.map((item, i) => {
        const isActive = i === active;
        const rowY = conceptRowY(i);
        const midY = rowY + CONCEPT_ROW_H / 2;

        return (
          <g key={item.label}>
            <motion.circle
              cx={CONCEPT_RAIL_X}
              cy={midY}
              r="2.5"
              className={isActive ? INK : INK_FAINT}
              animate={{ opacity: isActive ? 1 : 0.45 }}
              transition={{ duration: 0.55, ease: EASE }}
            />

            <rect
              x={CONCEPT_CARD_X}
              y={rowY}
              width={CONCEPT_CARD_W}
              height={CONCEPT_ROW_H}
              rx="5"
              className={INK_FAINT}
              fillOpacity={isActive ? 0.1 : 0.04}
            />
            <motion.rect
              x={CONCEPT_CARD_X}
              y={rowY}
              width={CONCEPT_CARD_W}
              height={CONCEPT_ROW_H}
              rx="5"
              fill="none"
              className={isActive ? STROKE_STRONG : STROKE_FAINT}
              strokeWidth={isActive ? 1 : 0.5}
              animate={{ opacity: isActive ? 1 : 0.45 }}
              transition={{ duration: 0.55, ease: EASE }}
            />

            <motion.text
              x={CONCEPT_CARD_X + 10}
              y={rowY + 10}
              fontSize="7"
              className={isActive ? INK : INK_SOFT}
              fontFamily="var(--font-outfit), sans-serif"
              animate={{ opacity: isActive ? 1 : 0.55 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              {item.label}
            </motion.text>

            {isActive && (
              <motion.text
                x={CONCEPT_CARD_X + CONCEPT_CARD_W - 10}
                y={rowY + 10}
                textAnchor="end"
                fontSize="6"
                className={INK_SOFT}
                fontFamily="var(--font-outfit), sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {item.detail}
              </motion.text>
            )}
          </g>
        );
      })}
    </MiniSvg>
  );
}

const PERF_VB_W = STEP_VB_W;
const PERF_VB_H = STEP_VB_H;
const PERF_CONTAINER_X = STEP_CONTAINER_X;
const PERF_CONTAINER_Y = 22;
const PERF_CONTAINER_W = STEP_CONTAINER_W;
const PERF_CONTAINER_H = 72;
const PERF_PLOT_X = PERF_CONTAINER_X + 10;
const PERF_PLOT_Y = PERF_CONTAINER_Y + 10;
const PERF_PLOT_W = 106;
const PERF_PLOT_H = 48;
const PERF_ORIGIN_X = PERF_PLOT_X;
const PERF_ORIGIN_Y = PERF_PLOT_Y + PERF_PLOT_H;
const PERF_LEGEND_X = PERF_PLOT_X + PERF_PLOT_W + 14;
const PERF_LEGEND_LINE_W = 14;

function perfCurvePath(
  t: number,
  curve: "linear" | "quad",
  samples = 16,
) {
  const points = Array.from({ length: samples }, (_, i) => {
    const p = (i / (samples - 1)) * t;
    const x = PERF_ORIGIN_X + p * PERF_PLOT_W;
    const y =
      curve === "linear"
        ? PERF_ORIGIN_Y - p * 34
        : PERF_ORIGIN_Y - p * p * 44;
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  });
  return points.join(" ");
}

export function PerformanceMini({ isInView }: { isInView: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = window.setInterval(() => {
      setPhase((p) => (p >= 100 ? 0 : p + 0.5));
    }, 130);
    return () => window.clearInterval(id);
  }, [isInView]);

  const t = phase / 100;
  const xEnd = PERF_ORIGIN_X + t * PERF_PLOT_W;
  const linearY = PERF_ORIGIN_Y - t * 34;
  const quadY = PERF_ORIGIN_Y - t * t * 44;

  return (
    <MiniSvg
      label="Time complexity growth comparison"
      viewBox={`0 0 ${PERF_VB_W} ${PERF_VB_H}`}
    >
      <text
        x={PERF_VB_W / 2}
        y="14"
        textAnchor="middle"
        fontSize="6.5"
        className={LABEL}
        fontFamily="var(--font-outfit), sans-serif"
      >
        growth over input size
      </text>

      <rect
        x={PERF_CONTAINER_X}
        y={PERF_CONTAINER_Y}
        width={PERF_CONTAINER_W}
        height={PERF_CONTAINER_H}
        rx="8"
        className={INK_FAINT}
        fillOpacity="0.06"
      />
      <rect
        x={PERF_CONTAINER_X}
        y={PERF_CONTAINER_Y}
        width={PERF_CONTAINER_W}
        height={PERF_CONTAINER_H}
        rx="8"
        fill="none"
        className={STROKE_FAINT}
        strokeWidth="1"
      />

      <rect
        x={PERF_PLOT_X - 2}
        y={PERF_PLOT_Y - 2}
        width={PERF_PLOT_W + 4}
        height={PERF_PLOT_H + 4}
        rx="4"
        className={INK_FAINT}
        fillOpacity="0.04"
      />

      {[0.33, 0.66].map((ratio) => {
        const gy = PERF_ORIGIN_Y - ratio * PERF_PLOT_H;
        return (
          <line
            key={ratio}
            x1={PERF_PLOT_X}
            y1={gy}
            x2={PERF_ORIGIN_X + PERF_PLOT_W}
            y2={gy}
            className={STROKE_FAINT}
            strokeWidth="0.5"
            strokeDasharray="4 5"
          />
        );
      })}

      <line
        x1={PERF_ORIGIN_X}
        y1={PERF_ORIGIN_Y}
        x2={PERF_ORIGIN_X + PERF_PLOT_W}
        y2={PERF_ORIGIN_Y}
        className={STROKE_FAINT}
        strokeWidth="1"
      />
      <line
        x1={PERF_ORIGIN_X}
        y1={PERF_ORIGIN_Y}
        x2={PERF_ORIGIN_X}
        y2={PERF_PLOT_Y}
        className={STROKE_FAINT}
        strokeWidth="1"
      />

      <text
        x={PERF_ORIGIN_X + PERF_PLOT_W - 2}
        y={PERF_ORIGIN_Y + 10}
        textAnchor="end"
        fontSize="6"
        className={LABEL}
        fontFamily="var(--font-outfit), sans-serif"
      >
        n
      </text>

      <motion.path
        d={perfCurvePath(t, "linear")}
        fill="none"
        className={STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
        transition={STEP_SPRING}
      />
      <motion.path
        d={perfCurvePath(t, "quad")}
        fill="none"
        className={STROKE_STRONG}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="5 4"
        transition={STEP_SPRING}
      />

      {t > 0.02 && (
        <>
          <circle cx={xEnd} cy={linearY} r="3" className={INK} />
          <circle cx={xEnd} cy={quadY} r="3" className={INK_MID} />
        </>
      )}

      <g>
        <line
          x1={PERF_LEGEND_X}
          y1={PERF_PLOT_Y + 14}
          x2={PERF_LEGEND_X + PERF_LEGEND_LINE_W}
          y2={PERF_PLOT_Y + 14}
          className={STROKE}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <text
          x={PERF_LEGEND_X + PERF_LEGEND_LINE_W + 5}
          y={PERF_PLOT_Y + 17}
          fontSize="6"
          className={INK_SOFT}
          fontFamily="var(--font-outfit), sans-serif"
        >
          O(n)
        </text>

        <line
          x1={PERF_LEGEND_X}
          y1={PERF_PLOT_Y + 30}
          x2={PERF_LEGEND_X + PERF_LEGEND_LINE_W}
          y2={PERF_PLOT_Y + 30}
          className={STROKE_STRONG}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 3"
        />
        <text
          x={PERF_LEGEND_X + PERF_LEGEND_LINE_W + 5}
          y={PERF_PLOT_Y + 33}
          fontSize="6"
          className={INK_MID}
          fontFamily="var(--font-outfit), sans-serif"
        >
          O(n²)
        </text>
      </g>
    </MiniSvg>
  );
}

export type FeatureIllustrationId =
  | "step-through"
  | "interactive"
  | "code"
  | "custom-input"
  | "concepts"
  | "performance";

const ILLUSTRATION_MAP = {
  "step-through": StepThroughMini,
  interactive: InteractiveControlsMini,
  code: CodeExamplesMini,
  "custom-input": CustomInputMini,
  concepts: ConceptBreakdownMini,
  performance: PerformanceMini,
} as const;

export function FeatureBentoIllustration({
  id,
  isInView,
}: {
  id: FeatureIllustrationId;
  isInView: boolean;
}) {
  const Component = ILLUSTRATION_MAP[id];
  return <Component isInView={isInView} />;
}
