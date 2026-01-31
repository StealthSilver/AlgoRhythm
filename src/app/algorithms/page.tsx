"use client";

import { useState } from "react";

import AlgorithmsSidebar from "../components/AlgorithmsSidebar";
import AlgorithmView from "../components/AlgorithmView";

export default function AlgorithmsPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(
    "bubble-sort",
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 w-full">
        <div className="max-w-full mx-auto px-4 sm:px-6 md:px-12 flex h-full gap-3 md:gap-6">
          {/* Desktop sidebar */}
          <div className="shrink-0 hidden md:block">
            <AlgorithmsSidebar
              isOpen={true}
              selectedSlug={selectedAlgorithm ?? undefined}
              onSelectAlgorithm={setSelectedAlgorithm}
              isCollapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
              className="md:sticky md:top-0 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]"
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Mobile: open sidebar button */}
            <div className="md:hidden pt-4">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="w-full rounded-xl px-4 py-3 text-sm font-medium flex items-center justify-between"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.04)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
                aria-label="Open algorithm list"
              >
                <span style={{ opacity: 0.9 }}>Browse algorithms</span>
                <span style={{ opacity: 0.6 }}>Tap to open</span>
              </button>
            </div>

            <AlgorithmView algorithmId={selectedAlgorithm} />
          </div>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close algorithm list"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
          />
          <div className="absolute inset-y-0 left-0 w-[88vw] max-w-90 p-4">
            <AlgorithmsSidebar
              isOpen={true}
              mode="drawer"
              visibilityClassName="block"
              selectedSlug={selectedAlgorithm ?? undefined}
              onSelectAlgorithm={(slug) => {
                setSelectedAlgorithm(slug);
                setMobileSidebarOpen(false);
              }}
              className="h-[calc(100vh-2rem)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
