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
      <div className="flex-1 flex">
        <div className="shrink-0">
          <AlgorithmsSidebar
            isOpen={true}
            selectedSlug={selectedAlgorithm ?? undefined}
            onSelectAlgorithm={setSelectedAlgorithm}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
            className="md:sticky md:top-6 h-[calc(100vh-9.5rem)] md:h-[calc(100vh-11rem)]"
          />
        </div>

        <AlgorithmView algorithmId={selectedAlgorithm} />
      </div>
    </div>
  );
}
