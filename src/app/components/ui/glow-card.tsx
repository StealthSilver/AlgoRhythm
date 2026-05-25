"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function GlowCardGrid({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll<HTMLElement>(
        "[data-slot='glow-card']",
      );
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty(
          "--glow-x",
          `${event.clientX - rect.left}px`,
        );
        card.style.setProperty(
          "--glow-y",
          `${event.clientY - rect.top}px`,
        );
      });
    };

    document.addEventListener("pointermove", handlePointerMove);
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={gridRef}
      className={cn("grid w-full gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlowCard({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="glow-card"
      className={cn("group relative rounded-xl", className)}
      style={
        {
          background:
            "linear-gradient(rgb(10,11,12), rgb(10,11,12)) padding-box, " +
            "linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.08)) border-box",
          border: "1px solid transparent",
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Pointer-tracking glow border — fades in on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-1px] rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(rgb(10,11,12), rgb(10,11,12)) padding-box, " +
            "radial-gradient(350px circle at var(--glow-x, 50%) var(--glow-y, 50%), " +
            "rgba(138,77,152,0.55) 0%, rgba(138,77,152,0.12) 45%, transparent 70%) border-box",
          border: "1px solid transparent",
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
