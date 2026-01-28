"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState, useEffect, useMemo } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteorCount = number || 20;

  // Generate random values on client side only to avoid hydration mismatch
  const [meteorStyles, setMeteorStyles] = useState<
    Array<{ delay: number; duration: number; leftPercent: number }>
  >([]);

  useEffect(() => {
    // Generate random animation values after mount (client-side only)
    const styles = Array.from({ length: meteorCount }, () => ({
      delay: Math.random() * 10, // 0-10 seconds delay for more variation
      duration: Math.random() * 3 + 2, // 2-5 seconds duration
      leftPercent: Math.random() * 120, // Random position across full width + overflow
    }));
    setMeteorStyles(styles);
  }, [meteorCount]);

  const meteors = useMemo(
    () => Array.from({ length: meteorCount }),
    [meteorCount],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {meteors.map((_, idx) => {
        const styles = meteorStyles[idx];

        return (
          <span
            key={"meteor" + idx}
            className={cn("absolute rounded-full", className)}
            style={{
              top: "0",
              left: styles ? `${styles.leftPercent}%` : "50%",
              height: "2px",
              width: "2px",
              backgroundColor: "#94a3b8",
              boxShadow: "0 0 0 1px #ffffff10",
              animation: `meteor ${styles?.duration || 3}s linear infinite`,
              animationDelay: styles ? `${styles.delay}s` : "0s",
            }}
          >
            <span
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[1px] rounded-full"
              style={{
                width: "100px",
                background:
                  "linear-gradient(to right, rgba(148, 163, 184, 0), rgba(148, 163, 184, 1), rgba(100, 116, 139, 0.8), transparent)",
              }}
            />
          </span>
        );
      })}
    </motion.div>
  );
};
