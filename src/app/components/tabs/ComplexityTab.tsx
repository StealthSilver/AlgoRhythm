"use client";

import { motion } from "framer-motion";

import type { Algorithm } from "@/app/data/algorithmData";

interface ComplexityTabProps {
  algorithm: Algorithm;
}

const complexityColors: Record<string, string> = {
  "O(1)": "bg-emerald-500/20 text-emerald-500 border-emerald-500/30",
  "O(log n)": "bg-green-500/20 text-green-500 border-green-500/30",
  "O(n)": "bg-cyan-500/20 text-cyan-500 border-cyan-500/30",
  "O(n log n)": "bg-blue-500/20 text-blue-500 border-blue-500/30",
  "O(n²)": "bg-amber-500/20 text-amber-500 border-amber-500/30",
  "O(2^n)": "bg-rose-500/20 text-rose-500 border-rose-500/30",
  "O(h)": "bg-cyan-500/20 text-cyan-500 border-cyan-500/30",
  "O(V)": "bg-cyan-500/20 text-cyan-500 border-cyan-500/30",
  "O(V + E)": "bg-blue-500/20 text-blue-500 border-blue-500/30",
  "O((V + E) log V)": "bg-blue-500/20 text-blue-500 border-blue-500/30",
  "O(n) or O(1)": "bg-emerald-500/20 text-emerald-500 border-emerald-500/30",
};

function getComplexityColor(complexity: string): string {
  return (
    complexityColors[complexity] ||
    "bg-muted text-muted-foreground border-border"
  );
}

function extractBigOTokens(text: string): string[] {
  const tokens = text.match(/O\([^)]*\)/g) ?? [];
  const normalized = tokens.map((t) => t.replaceAll(" ", " ").trim());
  return Array.from(new Set(normalized));
}

export function ComplexityTab({ algorithm }: ComplexityTabProps) {
  const timeTokens = extractBigOTokens(algorithm.timeComplexity);
  const worstGuess = timeTokens.length
    ? timeTokens[timeTokens.length - 1]
    : null;

  return (
    <div className="space-y-8">
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h3
          className="text-xl font-medium mb-4"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Complexity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "rgba(var(--foreground), 0.02)",
              border: "1px solid rgba(var(--foreground), 0.08)",
            }}
          >
            <p className="text-sm" style={{ opacity: 0.7 }}>
              Time Complexity
            </p>
            <p
              className="mt-2 font-mono text-base sm:text-lg"
              style={{ opacity: 0.9 }}
            >
              {algorithm.timeComplexity}
            </p>
            {timeTokens.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {timeTokens.map((token) => (
                  <span
                    key={token}
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-mono ${getComplexityColor(token)}`}
                  >
                    {token}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "rgba(var(--foreground), 0.02)",
              border: "1px solid rgba(var(--foreground), 0.08)",
            }}
          >
            <p className="text-sm" style={{ opacity: 0.7 }}>
              Space Complexity
            </p>
            <p
              className="mt-2 font-mono text-base sm:text-lg"
              style={{ opacity: 0.9 }}
            >
              {algorithm.spaceComplexity}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <h4
          className="text-lg font-medium mb-3"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Complexity Comparison
        </h4>

        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "rgba(var(--foreground), 0.02)",
            border: "1px solid rgba(var(--foreground), 0.08)",
          }}
        >
          <div className="space-y-3">
            {[
              { label: "O(1)", width: 6, desc: "Constant" },
              { label: "O(log n)", width: 16, desc: "Logarithmic" },
              { label: "O(n)", width: 34, desc: "Linear" },
              { label: "O(n log n)", width: 56, desc: "Linearithmic" },
              { label: "O(n²)", width: 82, desc: "Quadratic" },
              { label: "O(2^n)", width: 100, desc: "Exponential" },
            ].map((item, i) => {
              const isCurrent = worstGuess === item.label;
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <span
                    className="w-24 text-xs font-mono"
                    style={{ opacity: 0.65 }}
                  >
                    {item.label}
                  </span>
                  <div
                    className="flex-1 h-6 rounded-lg overflow-hidden"
                    style={{ backgroundColor: "rgba(var(--foreground), 0.06)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.width}%` }}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                      className="h-full"
                      style={{
                        background: isCurrent
                          ? "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(200, 180, 255) 100%)"
                          : "rgba(var(--foreground), 0.16)",
                      }}
                    />
                  </div>
                  <span className="w-24 text-xs" style={{ opacity: 0.6 }}>
                    {item.desc}
                  </span>
                  {isCurrent && (
                    <span
                      className="text-xs font-medium"
                      style={{ color: "rgb(141, 118, 233)" }}
                    >
                      ← this algo
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {!worstGuess && (
            <p className="mt-4 text-sm" style={{ opacity: 0.65 }}>
              Tip: Add a plain Big-O token like{" "}
              <span className="font-mono">O(n log n)</span> in the time
              complexity text to auto-highlight it here.
            </p>
          )}
        </div>
      </motion.div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "rgba(var(--foreground), 0.02)",
          border: "1px solid rgba(var(--foreground), 0.08)",
        }}
      >
        <h4 className="font-medium mb-2" style={{ opacity: 0.9 }}>
          Understanding Big-O
        </h4>
        <p className="text-sm" style={{ opacity: 0.7 }}>
          Big-O notation describes how an algorithm’s time or space requirements
          scale as the input size grows. It’s a practical way to compare
          approaches and predict performance.
        </p>
      </motion.div>
    </div>
  );
}
