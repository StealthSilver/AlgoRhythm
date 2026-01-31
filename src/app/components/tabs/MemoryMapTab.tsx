"use client";

import { motion } from "framer-motion";

import type { Algorithm } from "@/app/data/algorithmData";
import { MemoryMapVisualizer } from "../visualizers/MemoryMapVisualizer";

interface MemoryMapTabProps {
  algorithm: Algorithm;
}

export function MemoryMapTab({ algorithm }: MemoryMapTabProps) {
  if (algorithm.category === "Sorting") {
    return (
      <div className="py-2">
        <MemoryMapVisualizer algorithmId={algorithm.slug} />
      </div>
    );
  }

  return (
    <div className="py-2">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl p-10 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(var(--foreground), 0.02)",
          border: "1px solid rgba(var(--foreground), 0.08)",
        }}
      >
        <div className="text-center max-w-md">
          <div
            className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "rgba(141, 118, 233, 0.10)",
              border: "1px solid rgba(141, 118, 233, 0.18)",
            }}
          >
            <span className="text-2xl">🧠</span>
          </div>
          <h3
            className="text-lg font-semibold"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Memory Map Coming Soon
          </h3>
          <p className="mt-2 text-sm" style={{ opacity: 0.7 }}>
            Memory Map animation for {algorithm.name} isn&apos;t available yet.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
