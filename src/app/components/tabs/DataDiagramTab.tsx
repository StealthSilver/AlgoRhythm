"use client";

import { motion } from "framer-motion";

import type { Algorithm } from "@/app/data/algorithmData";

interface DataDiagramTabProps {
  algorithm: Algorithm;
}

export function DataDiagramTab({ algorithm }: DataDiagramTabProps) {
  const renderDiagram = () => {
    const category = algorithm.category.toLowerCase();

    switch (category) {
      case "sorting":
      case "searching":
        return <ArrayDiagram />;
      case "graphs":
        return <GraphDiagram />;
      case "trees":
        return <TreeDiagram />;
      default:
        return <ArrayDiagram />;
    }
  };

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "rgba(var(--foreground), 0.02)",
          border: "1px solid rgba(var(--foreground), 0.08)",
        }}
      >
        <h3
          className="text-lg font-medium mb-2"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Data Structure Overview
        </h3>
        <p className="text-sm" style={{ opacity: 0.7 }}>
          Visual representation of the data structure typically used by{" "}
          {algorithm.name}.
        </p>
      </div>
      {renderDiagram()}
    </div>
  );
}

function ArrayDiagram() {
  const values = [23, 45, 12, 67, 34, 89, 56];

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "rgba(var(--foreground), 0.02)",
        border: "1px solid rgba(var(--foreground), 0.08)",
      }}
    >
      <h4 className="text-sm font-medium mb-4" style={{ opacity: 0.85 }}>
        Array Structure
      </h4>

      <div className="flex items-center justify-center gap-1 flex-wrap">
        {values.map((val, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center"
          >
            <div
              className="w-14 h-14 border-2 flex items-center justify-center font-mono text-sm font-medium"
              style={{
                borderColor: "rgba(141, 118, 233, 0.65)",
                backgroundColor: "rgba(141, 118, 233, 0.10)",
              }}
            >
              {val}
            </div>
            <span className="text-xs mt-1" style={{ opacity: 0.6 }}>
              [{i}]
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 space-y-2 text-sm" style={{ opacity: 0.72 }}>
        <p>
          <strong>Index:</strong> 0-based position of each element
        </p>
        <p>
          <strong>Access:</strong> O(1) — direct by index
        </p>
        <p>
          <strong>Insert/Delete:</strong> often O(n) — shifting elements
        </p>
      </div>
    </div>
  );
}

function GraphDiagram() {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "rgba(var(--foreground), 0.02)",
        border: "1px solid rgba(var(--foreground), 0.08)",
      }}
    >
      <h4 className="text-sm font-medium mb-4" style={{ opacity: 0.85 }}>
        Graph Structure
      </h4>

      <svg width="100%" height="200" viewBox="0 0 400 200">
        {/* Edges */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          d="M 100 50 L 200 100 L 300 50 M 200 100 L 200 170"
          fill="none"
          strokeWidth={2}
          stroke="rgba(var(--foreground), 0.25)"
        />

        {/* Nodes */}
        {[
          { x: 100, y: 50, label: "A" },
          { x: 200, y: 100, label: "B" },
          { x: 300, y: 50, label: "C" },
          { x: 200, y: 170, label: "D" },
        ].map((node, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={25}
              strokeWidth={2}
              fill="rgba(141, 118, 233, 0.10)"
              stroke="rgba(141, 118, 233, 0.65)"
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fontSize={14}
              fill="rgb(var(--foreground))"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>

      <div className="mt-4 space-y-2 text-sm" style={{ opacity: 0.72 }}>
        <p>
          <strong>Vertices (V):</strong> nodes in the graph
        </p>
        <p>
          <strong>Edges (E):</strong> connections between nodes
        </p>
        <p>
          <strong>Representation:</strong> adjacency list or matrix
        </p>
      </div>
    </div>
  );
}

function TreeDiagram() {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "rgba(var(--foreground), 0.02)",
        border: "1px solid rgba(var(--foreground), 0.08)",
      }}
    >
      <h4 className="text-sm font-medium mb-4" style={{ opacity: 0.85 }}>
        Binary Tree Structure
      </h4>

      <svg width="100%" height="180" viewBox="0 0 400 180">
        {/* Edges */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          d="M 200 30 L 120 90 M 200 30 L 280 90 M 120 90 L 80 150 M 120 90 L 160 150 M 280 90 L 240 150 M 280 90 L 320 150"
          fill="none"
          strokeWidth={2}
          stroke="rgba(var(--foreground), 0.25)"
        />

        {/* Nodes */}
        {[
          { x: 200, y: 30, label: "50", type: "root" },
          { x: 120, y: 90, label: "30", type: "node" },
          { x: 280, y: 90, label: "70", type: "node" },
          { x: 80, y: 150, label: "20", type: "leaf" },
          { x: 160, y: 150, label: "40", type: "leaf" },
          { x: 240, y: 150, label: "60", type: "leaf" },
          { x: 320, y: 150, label: "80", type: "leaf" },
        ].map((node, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.06 }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={20}
              strokeWidth={2}
              stroke="rgba(141, 118, 233, 0.65)"
              fill={
                node.type === "root"
                  ? "rgba(141, 118, 233, 0.85)"
                  : "rgba(141, 118, 233, 0.10)"
              }
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fontSize={12}
              fill={
                node.type === "root"
                  ? "rgba(255,255,255,0.95)"
                  : "rgb(var(--foreground))"
              }
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>

      <div className="mt-4 space-y-2 text-sm" style={{ opacity: 0.72 }}>
        <p>
          <strong>Root:</strong> top node of the tree
        </p>
        <p>
          <strong>Children:</strong> nodes connected below a parent
        </p>
        <p>
          <strong>Height (h):</strong> longest root-to-leaf path
        </p>
      </div>
    </div>
  );
}
