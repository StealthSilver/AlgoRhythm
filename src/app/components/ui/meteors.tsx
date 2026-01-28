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
      delay: Math.random() * 8, // 0-8 seconds delay for more variation
      duration: Math.random() * 4 + 4, // 4-8 seconds duration
      leftPercent: Math.random() * 100, // Random position across full width
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
            className={cn(
              "animate-meteor-effect absolute h-1 w-1 rotate-[215deg] rounded-[9999px] shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:content-['']",
              className,
            )}
            style={{
              top: "0",
              left: styles ? `${styles.leftPercent}%` : "50%",
              animationDelay: styles ? `${styles.delay}s` : "0s",
              animationDuration: styles ? `${styles.duration}s` : "6s",
              backgroundColor: "#94a3b8",
            }}
          >
            <span
              className="absolute top-1/2 -translate-y-1/2 h-[2px] w-[60px]"
              style={{
                background:
                  "linear-gradient(to right, #94a3b8, #64748b, transparent)",
              }}
            />
          </span>
        );
      })}
    </motion.div>
  );
};
