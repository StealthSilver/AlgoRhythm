"use client";

import { useState } from "react";

import AlgorithmsSidebar from "../components/AlgorithmsSidebar";
import AlgorithmView from "../components/AlgorithmView";

export default function AlgorithmsPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(
    "bubble-sort",
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 w-full">
        <div className="max-w-full mx-auto px-8 md:px-12 flex h-full gap-8">
          <div className="shrink-0">
            <AlgorithmsSidebar
              isOpen={true}
              selectedSlug={selectedAlgorithm ?? undefined}
              onSelectAlgorithm={setSelectedAlgorithm}
              isCollapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
              className="md:sticky md:top-0 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]"
            />
          </div>

          <AlgorithmView algorithmId={selectedAlgorithm} />
        </div>
      </div>
    </div>
  );
}
