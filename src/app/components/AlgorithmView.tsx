"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { algorithmData } from "@/app/data/algorithmData";
import { AboutTab } from "@/app/components/tabs/AboutTab";
import { ComplexityTab } from "@/app/components/tabs/ComplexityTab";
import { DataDiagramTab } from "@/app/components/tabs/DataDiagramTab";
import { MemoryMapTab } from "./tabs/MemoryMapTab";
import { VisualizeTab } from "@/app/components/tabs/VisualizeTab";
import { cn } from "@/lib/utils";

interface AlgorithmViewProps {
  algorithmId: string | null;
}

const tabs = [
  { id: "about", label: "About" },
  { id: "visualize", label: "Visualize" },
  { id: "memory", label: "Memory Map" },
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
    <div className="flex-1 min-w-0 overflow-visible md:overflow-y-auto py-6 lg:py-8 px-4 sm:px-6 md:px-0 md:pr-6 lg:pr-8 md:pl-2">
      <motion.div
        key={algorithmId}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-end gap-3">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-light"
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
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="mt-3 text-sm sm:text-base"
            style={{ opacity: 0.72 }}
          >
            {algorithm.shortDescription}
          </motion.p>

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
                      "relative px-3 py-2 rounded-lg text-sm transition-colors",
                      "text-[rgb(var(--foreground))]",
                      isActive
                        ? "opacity-100"
                        : "opacity-70 hover:text-[rgb(141,118,233)] hover:opacity-100",
                    )}
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`algo-panel-${tab.id}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="algo-tab-indicator"
                        className="absolute inset-0 rounded-lg"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 32,
                        }}
                        style={{
                          background: "rgba(141, 118, 233, 0.12)",
                          boxShadow: "0 10px 30px rgba(141, 118, 233, 0.10)",
                          border: "1px solid rgba(141, 118, 233, 0.18)",
                        }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10",
                        isActive ? "text-[rgb(141,118,233)]" : undefined,
                      )}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
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
              <section id="algo-panel-about" role="tabpanel">
                <AboutTab algorithm={algorithm} />
              </section>
            )}

            {activeTab === "visualize" && (
              <section id="algo-panel-visualize" role="tabpanel">
                <VisualizeTab algorithm={algorithm} />
              </section>
            )}

            {activeTab === "memory" && (
              <section id="algo-panel-memory" role="tabpanel">
                <MemoryMapTab algorithm={algorithm} />
              </section>
            )}

            {activeTab === "diagram" && (
              <section id="algo-panel-diagram" role="tabpanel">
                <DataDiagramTab algorithm={algorithm} />
              </section>
            )}

            {activeTab === "complexity" && (
              <section id="algo-panel-complexity" role="tabpanel">
                <ComplexityTab algorithm={algorithm} />
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
