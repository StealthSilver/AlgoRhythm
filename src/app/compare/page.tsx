"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  BarChart3,
  Clock,
  Zap,
  ChevronDown,
} from "lucide-react";

const algorithms = [
  { id: "bubble-sort", name: "Bubble Sort", category: "Sorting" },
  { id: "quick-sort", name: "Quick Sort", category: "Sorting" },
  { id: "merge-sort", name: "Merge Sort", category: "Sorting" },
  { id: "insertion-sort", name: "Insertion Sort", category: "Sorting" },
  { id: "selection-sort", name: "Selection Sort", category: "Sorting" },
  { id: "heap-sort", name: "Heap Sort", category: "Sorting" },
  { id: "linear-search", name: "Linear Search", category: "Searching" },
  { id: "binary-search", name: "Binary Search", category: "Searching" },
];

const comparisonData: Record<
  string,
  { time: string; space: string; best: string; worst: string; stable: boolean }
> = {
  "bubble-sort": {
    time: "O(n²)",
    space: "O(1)",
    best: "O(n)",
    worst: "O(n²)",
    stable: true,
  },
  "quick-sort": {
    time: "O(n log n)",
    space: "O(log n)",
    best: "O(n log n)",
    worst: "O(n²)",
    stable: false,
  },
  "merge-sort": {
    time: "O(n log n)",
    space: "O(n)",
    best: "O(n log n)",
    worst: "O(n log n)",
    stable: true,
  },
  "insertion-sort": {
    time: "O(n²)",
    space: "O(1)",
    best: "O(n)",
    worst: "O(n²)",
    stable: true,
  },
  "selection-sort": {
    time: "O(n²)",
    space: "O(1)",
    best: "O(n²)",
    worst: "O(n²)",
    stable: false,
  },
  "heap-sort": {
    time: "O(n log n)",
    space: "O(1)",
    best: "O(n log n)",
    worst: "O(n log n)",
    stable: false,
  },
  "linear-search": {
    time: "O(n)",
    space: "O(1)",
    best: "O(1)",
    worst: "O(n)",
    stable: true,
  },
  "binary-search": {
    time: "O(log n)",
    space: "O(1)",
    best: "O(1)",
    worst: "O(log n)",
    stable: true,
  },
};

export default function ComparePage() {
  const [algorithm1, setAlgorithm1] = useState<string>("bubble-sort");
  const [algorithm2, setAlgorithm2] = useState<string>("quick-sort");

  const algo1Data = comparisonData[algorithm1];
  const algo2Data = comparisonData[algorithm2];
  const algo1Name = algorithms.find((a) => a.id === algorithm1)?.name || "";
  const algo2Name = algorithms.find((a) => a.id === algorithm2)?.name || "";

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: "rgba(var(--secondary), 0.15)" }}
          >
            <ArrowLeftRight
              className="w-4 h-4"
              style={{ color: "rgb(var(--secondary))" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "rgb(var(--secondary))" }}
            >
              Algorithm Comparison
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Compare Algorithms
          </h1>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ opacity: 0.7 }}
          >
            Select two algorithms to compare their time complexity, space
            complexity, and other characteristics side by side.
          </p>
        </motion.div>

        {/* Algorithm Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Algorithm 1 Selector */}
          <div className="relative">
            <label
              className="block text-sm font-medium mb-2"
              style={{ opacity: 0.7 }}
            >
              First Algorithm
            </label>
            <div className="relative">
              <select
                value={algorithm1}
                onChange={(e) => setAlgorithm1(e.target.value)}
                className="w-full appearance-none rounded-xl px-4 py-3 pr-10 text-base font-medium cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.05)",
                  border: "1px solid rgba(var(--foreground), 0.1)",
                  color: "rgb(var(--foreground))",
                }}
              >
                {algorithms.map((algo) => (
                  <option
                    key={algo.id}
                    value={algo.id}
                    style={{ backgroundColor: "rgb(var(--background))" }}
                  >
                    {algo.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                style={{ opacity: 0.5 }}
              />
            </div>
          </div>

          {/* Algorithm 2 Selector */}
          <div className="relative">
            <label
              className="block text-sm font-medium mb-2"
              style={{ opacity: 0.7 }}
            >
              Second Algorithm
            </label>
            <div className="relative">
              <select
                value={algorithm2}
                onChange={(e) => setAlgorithm2(e.target.value)}
                className="w-full appearance-none rounded-xl px-4 py-3 pr-10 text-base font-medium cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.05)",
                  border: "1px solid rgba(var(--foreground), 0.1)",
                  color: "rgb(var(--foreground))",
                }}
              >
                {algorithms.map((algo) => (
                  <option
                    key={algo.id}
                    value={algo.id}
                    style={{ backgroundColor: "rgb(var(--background))" }}
                  >
                    {algo.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                style={{ opacity: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "rgba(var(--foreground), 0.03)",
            border: "1px solid rgba(var(--foreground), 0.08)",
          }}
        >
          {/* Table Header */}
          <div
            className="grid grid-cols-3 gap-4 p-4 md:p-6"
            style={{ borderBottom: "1px solid rgba(var(--foreground), 0.08)" }}
          >
            <div className="text-sm font-medium" style={{ opacity: 0.5 }}>
              Metric
            </div>
            <div className="text-center">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold"
                style={{
                  backgroundColor: "rgba(var(--primary), 0.15)",
                  color: "rgb(var(--primary))",
                }}
              >
                {algo1Name}
              </span>
            </div>
            <div className="text-center">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold"
                style={{
                  backgroundColor: "rgba(var(--secondary), 0.15)",
                  color: "rgb(var(--secondary))",
                }}
              >
                {algo2Name}
              </span>
            </div>
          </div>

          {/* Table Rows */}
          <div
            className="divide-y"
            style={{ borderColor: "rgba(var(--foreground), 0.06)" }}
          >
            {/* Average Time Complexity */}
            <div className="grid grid-cols-3 gap-4 p-4 md:p-6 items-center">
              <div className="flex items-center gap-2">
                <Clock
                  className="w-4 h-4"
                  style={{ color: "rgb(var(--secondary))" }}
                />
                <span className="text-sm font-medium">Avg Time</span>
              </div>
              <div className="text-center font-mono text-sm md:text-base font-semibold">
                {algo1Data.time}
              </div>
              <div className="text-center font-mono text-sm md:text-base font-semibold">
                {algo2Data.time}
              </div>
            </div>

            {/* Best Case */}
            <div className="grid grid-cols-3 gap-4 p-4 md:p-6 items-center">
              <div className="flex items-center gap-2">
                <Zap
                  className="w-4 h-4"
                  style={{ color: "rgb(34, 197, 94)" }}
                />
                <span className="text-sm font-medium">Best Case</span>
              </div>
              <div
                className="text-center font-mono text-sm md:text-base"
                style={{ color: "rgb(34, 197, 94)" }}
              >
                {algo1Data.best}
              </div>
              <div
                className="text-center font-mono text-sm md:text-base"
                style={{ color: "rgb(34, 197, 94)" }}
              >
                {algo2Data.best}
              </div>
            </div>

            {/* Worst Case */}
            <div className="grid grid-cols-3 gap-4 p-4 md:p-6 items-center">
              <div className="flex items-center gap-2">
                <BarChart3
                  className="w-4 h-4"
                  style={{ color: "rgb(239, 68, 68)" }}
                />
                <span className="text-sm font-medium">Worst Case</span>
              </div>
              <div
                className="text-center font-mono text-sm md:text-base"
                style={{ color: "rgb(239, 68, 68)" }}
              >
                {algo1Data.worst}
              </div>
              <div
                className="text-center font-mono text-sm md:text-base"
                style={{ color: "rgb(239, 68, 68)" }}
              >
                {algo2Data.worst}
              </div>
            </div>

            {/* Space Complexity */}
            <div className="grid grid-cols-3 gap-4 p-4 md:p-6 items-center">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  style={{ color: "rgb(var(--secondary))" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                <span className="text-sm font-medium">Space</span>
              </div>
              <div className="text-center font-mono text-sm md:text-base">
                {algo1Data.space}
              </div>
              <div className="text-center font-mono text-sm md:text-base">
                {algo2Data.space}
              </div>
            </div>

            {/* Stability */}
            <div className="grid grid-cols-3 gap-4 p-4 md:p-6 items-center">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  style={{ color: "rgb(var(--secondary))" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-sm font-medium">Stable</span>
              </div>
              <div className="text-center">
                <span
                  className={`inline-flex px-2 py-1 rounded text-xs font-medium ${algo1Data.stable ? "text-green-500" : "text-red-500"}`}
                  style={{
                    backgroundColor: algo1Data.stable
                      ? "rgba(34, 197, 94, 0.15)"
                      : "rgba(239, 68, 68, 0.15)",
                  }}
                >
                  {algo1Data.stable ? "Yes" : "No"}
                </span>
              </div>
              <div className="text-center">
                <span
                  className={`inline-flex px-2 py-1 rounded text-xs font-medium ${algo2Data.stable ? "text-green-500" : "text-red-500"}`}
                  style={{
                    backgroundColor: algo2Data.stable
                      ? "rgba(34, 197, 94, 0.15)"
                      : "rgba(239, 68, 68, 0.15)",
                  }}
                >
                  {algo2Data.stable ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        >
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "rgba(var(--primary), 0.08)",
              border: "1px solid rgba(var(--primary), 0.15)",
            }}
          >
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "rgb(var(--primary))" }}
            >
              {algo1Name}
            </h3>
            <p className="text-sm" style={{ opacity: 0.7 }}>
              {algorithm1.includes("sort")
                ? `A ${algo1Data.stable ? "stable" : "unstable"} sorting algorithm with ${algo1Data.time} average time complexity.`
                : `A search algorithm with ${algo1Data.time} time complexity.`}
            </p>
          </div>
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "rgba(var(--secondary), 0.08)",
              border: "1px solid rgba(var(--secondary), 0.15)",
            }}
          >
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "rgb(var(--secondary))" }}
            >
              {algo2Name}
            </h3>
            <p className="text-sm" style={{ opacity: 0.7 }}>
              {algorithm2.includes("sort")
                ? `A ${algo2Data.stable ? "stable" : "unstable"} sorting algorithm with ${algo2Data.time} average time complexity.`
                : `A search algorithm with ${algo2Data.time} time complexity.`}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
