"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { algorithmData } from "@/app/data/algorithmData";
import { cn } from "@/lib/utils";

interface AlgorithmViewProps {
  algorithmId: string | null;
}

const tabs = [
  { id: "about", label: "About" },
  { id: "visualize", label: "Visualize" },
  { id: "diagram", label: "Data Diagram" },
  { id: "complexity", label: "Complexity" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AlgorithmView({ algorithmId }: AlgorithmViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>("about");

  useEffect(() => {
    setActiveTab("about");
  }, [algorithmId]);

  const algorithm = useMemo(() => {
    if (!algorithmId) return null;
    return algorithmData[algorithmId] ?? null;
  }, [algorithmId]);

  if (!algorithm) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <div
              className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4"
              style={{
                backgroundColor: "rgba(var(--foreground), 0.03)",
                border: "1px solid rgba(var(--foreground), 0.1)",
              }}
            >
              <span className="text-4xl">🔍</span>
            </div>
          </motion.div>
          <h2
            className="text-xl font-semibold mb-2"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Select an Algorithm
          </h2>
          <p className="text-sm" style={{ opacity: 0.7 }}>
            Choose an algorithm from the sidebar to start exploring.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
      <motion.div
        key={algorithmId}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-light mb-3"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              background:
                "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(200, 180, 255) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {algorithm.name}
          </motion.h1>

          {/* View Toggles */}
          <div className="mt-3">
            <div
              className="inline-flex flex-wrap gap-1 p-1 rounded-xl"
              style={{
                backgroundColor: "rgba(var(--background), 0.28)",
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(var(--foreground), 0.08)",
              }}
              role="tablist"
              aria-label="Algorithm view"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      "text-[rgb(var(--foreground))]",
                      isActive
                        ? "text-[rgb(141,118,233)] bg-[rgba(141,118,233,0.12)] opacity-100"
                        : "opacity-70 hover:text-[rgb(141,118,233)] hover:bg-[rgba(141,118,233,0.08)] hover:opacity-100",
                    )}
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`algo-panel-${tab.id}`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                background: "rgba(141, 118, 233, 0.12)",
                color: "rgb(141, 118, 233)",
              }}
            >
              {algorithm.category}
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "rgba(var(--foreground), 0.04)",
                border: "1px solid rgba(var(--foreground), 0.08)",
                opacity: 0.9,
              }}
            >
              Time: {algorithm.timeComplexity}
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "rgba(var(--foreground), 0.04)",
                border: "1px solid rgba(var(--foreground), 0.08)",
                opacity: 0.9,
              }}
            >
              Space: {algorithm.spaceComplexity}
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-base sm:text-lg"
            style={{ opacity: 0.75 }}
          >
            {algorithm.description}
          </motion.p>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "about" && (
              <section
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.02)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
                id="algo-panel-about"
                role="tabpanel"
              >
                <h2
                  className="text-2xl font-medium mb-4"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  How it Works
                </h2>
                <ol className="space-y-3" style={{ opacity: 0.85 }}>
                  {algorithm.steps.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-light"
                        style={{
                          background: "rgba(141, 118, 233, 0.12)",
                          color: "rgb(141, 118, 233)",
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>

                <h3
                  className="text-xl font-medium mt-8 mb-4"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  Use Cases
                </h3>
                <ul className="space-y-2" style={{ opacity: 0.85 }}>
                  {algorithm.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span
                        style={{ color: "rgb(141, 118, 233)" }}
                        className="mt-1"
                      >
                        •
                      </span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {activeTab === "visualize" && (
              <section
                className="rounded-2xl p-10 flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.02)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
                id="algo-panel-visualize"
                role="tabpanel"
              >
                <p style={{ opacity: 0.7 }}>
                  Interactive visualization coming soon...
                </p>
              </section>
            )}

            {activeTab === "diagram" && (
              <section
                className="rounded-2xl p-10 flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.02)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
                id="algo-panel-diagram"
                role="tabpanel"
              >
                <p style={{ opacity: 0.7 }}>Data diagram coming soon...</p>
              </section>
            )}

            {activeTab === "complexity" && (
              <section
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.02)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
                id="algo-panel-complexity"
                role="tabpanel"
              >
                <h2
                  className="text-2xl font-medium mb-4"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  Complexity
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: "rgba(var(--foreground), 0.03)",
                      border: "1px solid rgba(var(--foreground), 0.08)",
                    }}
                  >
                    <p className="text-sm" style={{ opacity: 0.7 }}>
                      Time Complexity
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      {algorithm.timeComplexity}
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: "rgba(var(--foreground), 0.03)",
                      border: "1px solid rgba(var(--foreground), 0.08)",
                    }}
                  >
                    <p className="text-sm" style={{ opacity: 0.7 }}>
                      Space Complexity
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      {algorithm.spaceComplexity}
                    </p>
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
