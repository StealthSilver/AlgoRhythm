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
    Array<{ delay: number; duration: number }>
  >([]);

  useEffect(() => {
    // Generate random animation values after mount (client-side only)
    const styles = Array.from({ length: meteorCount }, () => ({
      delay: Math.random() * 5, // 0-5 seconds delay
      duration: Math.random() * 3 + 5, // 5-8 seconds duration
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
        // Calculate position to evenly distribute meteors across container width
        const position = idx * (800 / meteorCount) - 400; // Spread across 800px range, centered
        const styles = meteorStyles[idx];

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: "-40px", // Start above the container
              left: `${position}px`,
              animationDelay: styles ? `${styles.delay}s` : "0s",
              animationDuration: styles ? `${styles.duration}s` : "5s",
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};
