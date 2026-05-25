"use client";

import { motion, useInView } from "framer-motion";
import { Hand } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  studentTestimonials,
  totalStudentTestimonials,
  type StudentTestimonial,
} from "@/app/data/studentTestimonials";

const TILE_SIZE = 3200;
const CARD_WIDTH = 260;
const CARD_HEIGHT = 176;
const MESH_SIZE = 48;
const VIEWPORT_HEIGHT = 580;
const BUFFER = 280;

type CardPlacement = {
  x: number;
  y: number;
  testimonialIndex: number;
};

type VisibleCard = {
  key: string;
  screenX: number;
  screenY: number;
  testimonial: StudentTestimonial;
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function generateCardLayout(count: number, tileSize: number): CardPlacement[] {
  const placements: CardPlacement[] = [];
  const minDistance = 320;
  const padding = 140;
  let seed = 0;

  while (placements.length < count && seed < 800) {
    const x =
      padding +
      seededRandom(seed * 2 + 1) * (tileSize - CARD_WIDTH - padding * 2);
    const y =
      padding +
      seededRandom(seed * 2 + 2) * (tileSize - CARD_HEIGHT - padding * 2);

    const overlaps = placements.some((placement) => {
      const dx = placement.x - x;
      const dy = placement.y - y;
      return Math.hypot(dx, dy) < minDistance;
    });

    if (!overlaps) {
      placements.push({
        x,
        y,
        testimonialIndex: placements.length % totalStudentTestimonials,
      });
    }

    seed += 1;
  }

  return placements;
}

const CARD_LAYOUT = generateCardLayout(24, TILE_SIZE);

function getVisibleCards(
  panX: number,
  panY: number,
  viewportWidth: number,
  viewportHeight: number,
): VisibleCard[] {
  if (viewportWidth <= 0 || viewportHeight <= 0) return [];

  const viewLeft = -panX - BUFFER;
  const viewTop = -panY - BUFFER;
  const viewRight = -panX + viewportWidth + BUFFER;
  const viewBottom = -panY + viewportHeight + BUFFER;

  const tileXStart = Math.floor(viewLeft / TILE_SIZE) - 1;
  const tileXEnd = Math.ceil(viewRight / TILE_SIZE) + 1;
  const tileYStart = Math.floor(viewTop / TILE_SIZE) - 1;
  const tileYEnd = Math.ceil(viewBottom / TILE_SIZE) + 1;

  const visible: VisibleCard[] = [];

  for (let tileY = tileYStart; tileY <= tileYEnd; tileY += 1) {
    for (let tileX = tileXStart; tileX <= tileXEnd; tileX += 1) {
      CARD_LAYOUT.forEach((placement, index) => {
        const worldX = placement.x + tileX * TILE_SIZE;
        const worldY = placement.y + tileY * TILE_SIZE;

        if (
          worldX + CARD_WIDTH < viewLeft ||
          worldX > viewRight ||
          worldY + CARD_HEIGHT < viewTop ||
          worldY > viewBottom
        ) {
          return;
        }

        const testimonialIndex =
          (placement.testimonialIndex + index + tileX + tileY * 3) %
          totalStudentTestimonials;

        visible.push({
          key: `${tileX}-${tileY}-${index}`,
          screenX: worldX + panX,
          screenY: worldY + panY,
          testimonial: studentTestimonials[testimonialIndex],
        });
      });
    }
  }

  return visible;
}

function TestimonialCard({ testimonial }: { testimonial: StudentTestimonial }) {
  return (
    <article className="landing-surface pointer-events-none flex h-[176px] w-[260px] flex-col rounded-xl p-4 backdrop-blur-[1px]">
      <p className="landing-body mb-4 line-clamp-3 flex-1 text-sm font-extralight leading-relaxed tracking-wide">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="landing-border shrink-0 border-t pt-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8a4d98]/10 text-xs font-medium tracking-wide text-[#8a4d98]">
            {testimonial.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-extralight tracking-tight">
              {testimonial.name}
            </p>
            <p className="landing-muted truncate text-xs font-extralight tracking-wide">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function DraggableTestimonialCanvas() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const updateViewport = () => {
      setViewport({
        width: element.clientWidth,
        height: element.clientHeight,
      });
    };

    updateViewport();

    const observer = new ResizeObserver(updateViewport);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const visibleCards = useMemo(
    () => getVisibleCards(pan.x, pan.y, viewport.width, viewport.height),
    [pan.x, pan.y, viewport.width, viewport.height],
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      dragState.current = { x: event.clientX, y: event.clientY };
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragState.current) return;

      const deltaX = event.clientX - dragState.current.x;
      const deltaY = event.clientY - dragState.current.y;
      dragState.current = { x: event.clientX, y: event.clientY };

      setPan((previous) => ({
        x: previous.x + deltaX,
        y: previous.y + deltaY,
      }));
    },
    [],
  );

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    dragState.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const gridLine = "rgba(255, 255, 255, 0.08)";

  const meshStyle = {
    backgroundImage: `
      linear-gradient(to right, ${gridLine} 0.5px, transparent 0.5px),
      linear-gradient(to bottom, ${gridLine} 0.5px, transparent 0.5px)
    `,
    backgroundSize: `${MESH_SIZE}px ${MESH_SIZE}px`,
    backgroundPosition: `${pan.x}px ${pan.y}px`,
  };

  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-14 bg-gradient-to-b from-[rgb(var(--background))] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t from-[rgb(var(--background))] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[rgb(var(--background))] to-transparent sm:w-16"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[rgb(var(--background))] to-transparent sm:w-16"
      />

      <div
        ref={viewportRef}
        className={`landing-border relative w-full touch-none select-none overflow-hidden border-y ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ height: VIEWPORT_HEIGHT }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="presentation"
        aria-label="Draggable student testimonials canvas"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={meshStyle}
        />

        <div
          className={`landing-surface landing-muted pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs font-extralight tracking-wide backdrop-blur-sm transition-opacity duration-200 ${
            isDragging ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden
        >
          <Hand className="h-3.5 w-3.5 shrink-0 text-[#8a4d98]" strokeWidth={1.5} />
          <span>Drag to explore</span>
        </div>

        <div className="absolute inset-0">
          {visibleCards.map((card) => (
            <div
              key={card.key}
              className="absolute"
              style={{
                width: CARD_WIDTH,
                transform: `translate3d(${card.screenX}px, ${card.screenY}px, 0)`,
              }}
            >
              <TestimonialCard testimonial={card.testimonial} />
            </div>
          ))}
        </div>
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
      <div
        ref={ref}
        className="relative z-10 mx-auto mb-10 w-full max-w-7xl px-4 sm:mb-12 sm:px-5 md:mb-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-xl font-extralight leading-snug tracking-tight sm:text-2xl md:text-3xl">
            Real stories from{" "}
            <span style={{ color: "#8a4d98" }}>students</span>
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        <DraggableTestimonialCanvas />
      </motion.div>
    </section>
  );
}
