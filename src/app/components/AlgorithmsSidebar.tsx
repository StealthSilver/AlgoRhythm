"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface AlgorithmCategory {
  name: string;
  algorithms: string[];
}

interface AlgorithmsSidebarProps {
  isOpen: boolean;
}

export default function AlgorithmsSidebar({ isOpen }: AlgorithmsSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "Sorting",
  ]);

  const categories: AlgorithmCategory[] = [
    {
      name: "Sorting",
      algorithms: [
        "Bubble Sort",
        "Quick Sort",
        "Merge Sort",
        "Insertion Sort",
        "Selection Sort",
        "Heap Sort",
      ],
    },
    {
      name: "Searching",
      algorithms: ["Linear Search", "Binary Search", "Jump Search"],
    },
    {
      name: "Arrays",
      algorithms: [
        "Two Pointers",
        "Sliding Window",
        "Kadane's Algorithm",
        "Dutch National Flag",
      ],
    },
    {
      name: "Linked Lists",
      algorithms: [
        "Reverse Linked List",
        "Detect Cycle",
        "Merge Two Lists",
        "Remove Nth Node",
      ],
    },
    {
      name: "Trees",
      algorithms: [
        "Tree Traversal",
        "Binary Search Tree",
        "AVL Tree",
        "Segment Tree",
      ],
    },
    {
      name: "Graphs",
      algorithms: ["DFS", "BFS", "Dijkstra's", "Bellman-Ford", "Kruskal's"],
    },
    {
      name: "Dynamic Programming",
      algorithms: [
        "Fibonacci",
        "Knapsack",
        "Longest Common Subsequence",
        "Edit Distance",
      ],
    },
    {
      name: "Greedy",
      algorithms: [
        "Activity Selection",
        "Huffman Coding",
        "Fractional Knapsack",
      ],
    },
    {
      name: "Backtracking",
      algorithms: ["N-Queens", "Sudoku Solver", "Rat in Maze"],
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
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform duration-300 z-40"
      style={{
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="p-4">
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
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {/* Algorithm List */}
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {category.algorithms.map((algorithm) => (
                      <button
                        key={algorithm}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-[rgb(141,118,233)] dark:hover:text-[rgb(141,118,233)] hover:bg-[rgb(141,118,233)]/5 transition-all duration-200"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {algorithm}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
