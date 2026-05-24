"use client";

import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  studentTestimonials,
  totalStudentTestimonials,
  type StudentTestimonial,
} from "@/app/data/studentTestimonials";

const CELL_WIDTH = 240;
const CELL_GAP = 16;
const INITIAL_COLS = 5;
const INITIAL_ROWS = 4;
const EXPAND_COLS = 2;
const EXPAND_ROWS = 2;
const SCROLL_THRESHOLD = 140;

type GridCell = {
  key: string;
  testimonial: StudentTestimonial;
};

function buildGridCells(columns: number, rows: number): GridCell[] {
  const total = columns * rows;

  return Array.from({ length: total }, (_, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;

    return {
      key: `${row}-${col}`,
      testimonial: studentTestimonials[index % totalStudentTestimonials],
    };
  });
}

function TestimonialCard({ testimonial }: { testimonial: StudentTestimonial }) {
  return (
    <article className="flex h-full min-h-[168px] flex-col rounded-xl border border-neutral-300/60 bg-white/40 p-4 transition-colors duration-200 hover:border-[#8a4d98]/40 hover:bg-[#8a4d98]/[0.04] dark:border-neutral-600/50 dark:bg-neutral-900/20 dark:hover:border-[#8a4d98]/50 dark:hover:bg-[#8a4d98]/[0.08] sm:min-h-[176px] sm:p-4">
      <p className="mb-4 flex-1 text-sm font-extralight leading-relaxed tracking-wide opacity-80">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <motion.div className="shrink-0 border-t border-black/[0.06] pt-3 dark:border-white/[0.06] sm:pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8a4d98]/10 text-xs font-medium tracking-wide text-[#8a4d98]">
            {testimonial.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-extralight tracking-tight">
              {testimonial.name}
            </p>
            <p className="truncate text-xs font-extralight tracking-wide opacity-60">
              {testimonial.role}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </article>
  );
}

function InfiniteTestimonialGrid() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [columnCount, setColumnCount] = useState(INITIAL_COLS);
  const [rowCount, setRowCount] = useState(INITIAL_ROWS);
  const expandingRef = useRef(false);

  const cells = useMemo(
    () => buildGridCells(columnCount, rowCount),
    [columnCount, rowCount],
  );

  const expandGrid = useCallback(
    (direction: "vertical" | "horizontal" | "both") => {
      if (expandingRef.current) return;
      expandingRef.current = true;

      if (direction === "vertical" || direction === "both") {
        setRowCount((prev) => prev + EXPAND_ROWS);
      }

      if (direction === "horizontal" || direction === "both") {
        setColumnCount((prev) => prev + EXPAND_COLS);
      }

      requestAnimationFrame(() => {
        expandingRef.current = false;
      });
    },
    [],
  );

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const nearBottom =
        element.scrollTop + element.clientHeight >=
        element.scrollHeight - SCROLL_THRESHOLD;
      const nearRight =
        element.scrollLeft + element.clientWidth >=
        element.scrollWidth - SCROLL_THRESHOLD;

      if (nearBottom && nearRight) {
        expandGrid("both");
      } else if (nearBottom) {
        expandGrid("vertical");
      } else if (nearRight) {
        expandGrid("horizontal");
      }
    };

    element.addEventListener("scroll", handleScroll, { passive: true });
    return () => element.removeEventListener("scroll", handleScroll);
  }, [expandGrid]);

  const gridWidth =
    columnCount * CELL_WIDTH + Math.max(columnCount - 1, 0) * CELL_GAP;

  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-[rgb(var(--background))] to-transparent"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-[rgb(var(--background))] to-transparent"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[rgb(var(--background))] to-transparent sm:w-10"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[rgb(var(--background))] to-transparent sm:w-10"
      />

      <motion.div
        ref={scrollRef}
        className="testimonial-grid-scroll h-[380px] overflow-auto sm:h-[440px] md:h-[480px]"
        style={{
          touchAction: "pan-x pan-y",
        }}
      >
        <div
          className="grid gap-4 p-1"
          style={{
            width: gridWidth,
            gridTemplateColumns: `repeat(${columnCount}, ${CELL_WIDTH}px)`,
          }}
        >
          {cells.map((cell) => (
            <TestimonialCard key={cell.key} testimonial={cell.testimonial} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function Students() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="students"
      className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <motion.div
        ref={ref}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-3xl sm:mb-12 md:mb-14"
        >
          <p className="mb-4 text-xl font-extralight leading-snug tracking-tight sm:text-2xl md:text-3xl">
            Real stories from{" "}
            <span style={{ color: "#8a4d98" }}>students</span>
          </p>
          <p className="max-w-2xl text-sm font-extralight leading-relaxed tracking-wide opacity-75 sm:text-base">
            {totalStudentTestimonials} learners using AlgoRhythm to turn abstract
            algorithms into intuition they can trust. Scroll the canvas to
            explore more voices.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="-mx-4 sm:-mx-5"
        >
          <InfiniteTestimonialGrid />
        </motion.div>
      </motion.div>
    </section>
  );
}
