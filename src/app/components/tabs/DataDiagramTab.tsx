"use client";

import type { Algorithm } from "@/app/data/algorithmData";
import { CodeTab } from "@/app/components/tabs/CodeTab";

interface DataDiagramTabProps {
  algorithm: Algorithm;
}

// Backward-compatible: the old "Data Diagram" tab is now the "Code" tab.
export function DataDiagramTab({ algorithm }: DataDiagramTabProps) {
  return <CodeTab algorithm={algorithm} />;
}
