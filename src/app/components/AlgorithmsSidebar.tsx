"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

interface AlgorithmCategory {
  name: string;
  algorithms: { name: string; slug: string }[];
}

interface AlgorithmsSidebarProps {
  isOpen: boolean;
  selectedSlug?: string;
}

export default function AlgorithmsSidebar({
  isOpen,
  selectedSlug,
}: AlgorithmsSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "Sorting",
  ]);

  const categories: AlgorithmCategory[] = [
    {
      name: "Sorting",
      algorithms: [
        { name: "Bubble Sort", slug: "bubble-sort" },
        { name: "Quick Sort", slug: "quick-sort" },
        { name: "Merge Sort", slug: "merge-sort" },
        { name: "Insertion Sort", slug: "insertion-sort" },
        { name: "Selection Sort", slug: "selection-sort" },
        { name: "Heap Sort", slug: "heap-sort" },
      ],
    },
    {
      name: "Searching",
      algorithms: [
        { name: "Linear Search", slug: "linear-search" },
        { name: "Binary Search", slug: "binary-search" },
        { name: "Jump Search", slug: "jump-search" },
      ],
    },
    {
      name: "Arrays",
      algorithms: [
        { name: "Two Pointers", slug: "two-pointers" },
        { name: "Sliding Window", slug: "sliding-window" },
        { name: "Kadane's Algorithm", slug: "kadanes-algorithm" },
        { name: "Dutch National Flag", slug: "dutch-national-flag" },
      ],
    },
    {
      name: "Linked Lists",
      algorithms: [
        { name: "Reverse Linked List", slug: "reverse-linked-list" },
        { name: "Detect Cycle", slug: "detect-cycle" },
        { name: "Merge Two Lists", slug: "merge-two-lists" },
        { name: "Remove Nth Node", slug: "remove-nth-node" },
      ],
    },
    {
      name: "Trees",
      algorithms: [
        { name: "Tree Traversal", slug: "tree-traversal" },
        { name: "Binary Search Tree", slug: "binary-search-tree" },
        { name: "AVL Tree", slug: "avl-tree" },
        { name: "Segment Tree", slug: "segment-tree" },
      ],
    },
    {
      name: "Graphs",
      algorithms: [
        { name: "DFS", slug: "dfs" },
        { name: "BFS", slug: "bfs" },
        { name: "Dijkstra's", slug: "dijkstras" },
        { name: "Bellman-Ford", slug: "bellman-ford" },
        { name: "Kruskal's", slug: "kruskals" },
      ],
    },
    {
      name: "Dynamic Programming",
      algorithms: [
        { name: "Fibonacci", slug: "fibonacci" },
        { name: "Knapsack", slug: "knapsack" },
        {
          name: "Longest Common Subsequence",
          slug: "longest-common-subsequence",
        },
        { name: "Edit Distance", slug: "edit-distance" },
      ],
    },
    {
      name: "Greedy",
      algorithms: [
        { name: "Activity Selection", slug: "activity-selection" },
        { name: "Huffman Coding", slug: "huffman-coding" },
        { name: "Fractional Knapsack", slug: "fractional-knapsack" },
      ],
    },
    {
      name: "Backtracking",
      algorithms: [
        { name: "N-Queens", slug: "n-queens" },
        { name: "Sudoku Solver", slug: "sudoku-solver" },
        { name: "Rat in Maze", slug: "rat-in-maze" },
      ],
    },
  ];

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    );
  };

  return (
    <aside
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform duration-300 z-40"
      style={{
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="py-6 pr-6 pl-8 sm:pl-10 lg:pl-12">
        <h2
          className="text-lg font-bold mb-4 text-gray-900 dark:text-white"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Algorithm Categories
        </h2>

        <nav className="space-y-2">
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.name);

            return (
              <div key={category.name}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  <span>{category.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-0" : "-rotate-90"}`}
                  />
                </button>

                {/* Algorithm List */}
                <div
                  className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "max-h-96 opacity-100 mt-1"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {category.algorithms.map((algorithm) => {
                    const isSelected = selectedSlug === algorithm.slug;
                    return (
                      <Link
                        key={algorithm.slug}
                        href={`/algorithms/${algorithm.slug}`}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          isSelected
                            ? "bg-[rgb(141,118,233)]/10 text-[rgb(141,118,233)] font-semibold"
                            : "text-gray-600 dark:text-gray-400 hover:text-[rgb(141,118,233)] dark:hover:text-[rgb(141,118,233)] hover:bg-[rgb(141,118,233)]/5"
                        }`}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {algorithm.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
