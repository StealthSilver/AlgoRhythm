"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Hash,
  Layers,
  Link2,
  ListOrdered,
  MousePointerClick,
  Repeat,
  Route,
  Search,
  Share2,
  Shuffle,
  Sparkles,
  TreePine,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface AlgorithmCategory {
  name: string;
  algorithms: { name: string; slug: string }[];
}

interface AlgorithmsSidebarProps {
  isOpen: boolean;
  selectedSlug?: string;
  className?: string;
  visibilityClassName?: string;
  mode?: "desktop" | "drawer";
  onSelectAlgorithm?: (slug: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function AlgorithmsSidebar({
  isOpen,
  selectedSlug,
  className,
  visibilityClassName = "hidden md:block",
  mode = "desktop",
  onSelectAlgorithm,
  isCollapsed = false,
  onToggleCollapse,
}: AlgorithmsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const isSearching = searchQuery.trim().length > 0;
  const expandedWidth = 320;
  const collapsedWidth = 72;
  const categories: AlgorithmCategory[] = [
    {
      name: "Arrays & Basic Operations",
      algorithms: [
        { name: "Array Traversal", slug: "array-traversal" },
        { name: "Insertion in Array", slug: "insertion-in-array" },
        { name: "Deletion in Array", slug: "deletion-in-array" },
        { name: "Rotation of Array", slug: "rotation-of-array" },
        { name: "Prefix Sum", slug: "prefix-sum" },
        { name: "Sliding Window Technique", slug: "sliding-window" },
        { name: "Two Pointer Technique", slug: "two-pointers" },
        { name: "Kadane's Algorithm", slug: "kadanes-algorithm" },
        { name: "Majority Element (Moore's Voting)", slug: "majority-element" },
        { name: "Dutch National Flag Algorithm", slug: "dutch-national-flag" },
      ],
    },
    {
      name: "Searching Algorithms",
      algorithms: [
        { name: "Linear Search", slug: "linear-search" },
        { name: "Binary Search", slug: "binary-search" },
        { name: "Ternary Search", slug: "ternary-search" },
        { name: "Jump Search", slug: "jump-search" },
        { name: "Interpolation Search", slug: "interpolation-search" },
        { name: "Exponential Search", slug: "exponential-search" },
      ],
    },
    {
      name: "Sorting Algorithms",
      algorithms: [
        { name: "Bubble Sort", slug: "bubble-sort" },
        { name: "Selection Sort", slug: "selection-sort" },
        { name: "Insertion Sort", slug: "insertion-sort" },
        { name: "Merge Sort", slug: "merge-sort" },
        { name: "Quick Sort", slug: "quick-sort" },
        { name: "Heap Sort", slug: "heap-sort" },
        { name: "Counting Sort", slug: "counting-sort" },
        { name: "Radix Sort", slug: "radix-sort" },
        { name: "Bucket Sort", slug: "bucket-sort" },
        {
          name: "Stable vs Unstable Sorting",
          slug: "stable-vs-unstable-sorting",
        },
        {
          name: "In-place vs Out-of-place Sorting",
          slug: "inplace-vs-outofplace-sorting",
        },
      ],
    },
    {
      name: "Recursion Patterns",
      algorithms: [
        { name: "Basic Recursion", slug: "basic-recursion" },
        { name: "Tail Recursion", slug: "tail-recursion" },
        { name: "Factorial", slug: "factorial" },
        { name: "Fibonacci", slug: "fibonacci" },
        { name: "Tower of Hanoi", slug: "tower-of-hanoi" },
        { name: "Subset Generation", slug: "subset-generation" },
        { name: "Permutations", slug: "permutations" },
      ],
    },
    {
      name: "Linked Lists",
      algorithms: [
        { name: "Singly Linked List", slug: "singly-linked-list" },
        { name: "Doubly Linked List", slug: "doubly-linked-list" },
        { name: "Circular Linked List", slug: "circular-linked-list" },
        { name: "Insertion Operations", slug: "linked-list-insertion" },
        { name: "Deletion Operations", slug: "linked-list-deletion" },
        { name: "Reverse Linked List", slug: "reverse-linked-list" },
        { name: "Detect Cycle (Floyd's Algorithm)", slug: "detect-cycle" },
        { name: "Merge Two Sorted Lists", slug: "merge-two-lists" },
        {
          name: "Intersection of Linked Lists",
          slug: "intersection-of-linked-lists",
        },
      ],
    },
    {
      name: "Stack Algorithms",
      algorithms: [
        { name: "Stack Push / Pop", slug: "stack-push-pop" },
        { name: "Stack using Array", slug: "stack-using-array" },
        { name: "Stack using Linked List", slug: "stack-using-linked-list" },
        { name: "Balanced Parentheses", slug: "balanced-parentheses" },
        { name: "Infix to Postfix", slug: "infix-to-postfix" },
        { name: "Postfix Evaluation", slug: "postfix-evaluation" },
        { name: "Next Greater Element", slug: "next-greater-element" },
        {
          name: "Largest Rectangle in Histogram",
          slug: "largest-rectangle-histogram",
        },
      ],
    },
    {
      name: "Queue Algorithms",
      algorithms: [
        { name: "Queue Operations", slug: "queue-operations" },
        { name: "Circular Queue", slug: "circular-queue" },
        { name: "Deque", slug: "deque" },
        { name: "Priority Queue", slug: "priority-queue" },
        { name: "Queue using Stack", slug: "queue-using-stack" },
        { name: "Stack using Queue", slug: "stack-using-queue" },
      ],
    },
    {
      name: "Hashing",
      algorithms: [
        { name: "Hash Table", slug: "hash-table" },
        { name: "Hash Functions", slug: "hash-functions" },
        { name: "Collision Handling", slug: "collision-handling" },
        { name: "Chaining", slug: "chaining" },
        { name: "Open Addressing", slug: "open-addressing" },
        { name: "Linear Probing", slug: "linear-probing" },
        { name: "Quadratic Probing", slug: "quadratic-probing" },
        { name: "Double Hashing", slug: "double-hashing" },
      ],
    },
    {
      name: "Trees",
      algorithms: [
        { name: "Tree Terminology", slug: "tree-terminology" },
        { name: "Binary Tree", slug: "binary-tree" },
        { name: "Inorder Traversal", slug: "inorder-traversal" },
        { name: "Preorder Traversal", slug: "preorder-traversal" },
        { name: "Postorder Traversal", slug: "postorder-traversal" },
        { name: "Level Order Traversal", slug: "level-order-traversal" },
        { name: "BST Insertion", slug: "bst-insertion" },
        { name: "BST Deletion", slug: "bst-deletion" },
        { name: "BST Search", slug: "bst-search" },
        { name: "AVL Tree (Rotations)", slug: "avl-tree" },
        { name: "Red-Black Tree", slug: "red-black-tree" },
        { name: "Min Heap", slug: "min-heap" },
        { name: "Max Heap", slug: "max-heap" },
        { name: "Heapify", slug: "heapify" },
        { name: "Segment Tree", slug: "segment-tree" },
        { name: "Fenwick Tree (Binary Indexed Tree)", slug: "fenwick-tree" },
        { name: "Trie (Prefix Tree)", slug: "trie" },
      ],
    },
    {
      name: "Graph Algorithms",
      algorithms: [
        { name: "Graph Representation", slug: "graph-representation" },
        {
          name: "Directed vs Undirected Graph",
          slug: "directed-vs-undirected",
        },
        {
          name: "Weighted vs Unweighted Graph",
          slug: "weighted-vs-unweighted",
        },
        { name: "Breadth First Search (BFS)", slug: "bfs" },
        { name: "Depth First Search (DFS)", slug: "dfs" },
        { name: "Dijkstra's Algorithm", slug: "dijkstras" },
        { name: "Bellman-Ford Algorithm", slug: "bellman-ford" },
        { name: "Floyd-Warshall Algorithm", slug: "floyd-warshall" },
        { name: "A* Algorithm", slug: "a-star" },
        { name: "Kruskal's Algorithm", slug: "kruskals" },
        { name: "Prim's Algorithm", slug: "prims" },
        { name: "Topological Sort", slug: "topological-sort" },
        { name: "Union Find (Disjoint Set)", slug: "union-find" },
        { name: "Cycle Detection", slug: "cycle-detection" },
      ],
    },
    {
      name: "Dynamic Programming",
      algorithms: [
        { name: "Memoization", slug: "memoization" },
        { name: "Tabulation", slug: "tabulation" },
        { name: "Fibonacci DP", slug: "fibonacci-dp" },
        { name: "Climbing Stairs", slug: "climbing-stairs" },
        { name: "Coin Change", slug: "coin-change" },
        { name: "0/1 Knapsack", slug: "knapsack" },
        { name: "Unbounded Knapsack", slug: "unbounded-knapsack" },
        {
          name: "Longest Common Subsequence",
          slug: "longest-common-subsequence",
        },
        {
          name: "Longest Increasing Subsequence",
          slug: "longest-increasing-subsequence",
        },
        {
          name: "Matrix Chain Multiplication",
          slug: "matrix-chain-multiplication",
        },
        { name: "Edit Distance", slug: "edit-distance" },
      ],
    },
    {
      name: "Greedy Algorithms",
      algorithms: [
        { name: "Activity Selection", slug: "activity-selection" },
        { name: "Fractional Knapsack", slug: "fractional-knapsack" },
        { name: "Job Sequencing", slug: "job-sequencing" },
        { name: "Huffman Coding", slug: "huffman-coding" },
        { name: "Optimal Merge Pattern", slug: "optimal-merge-pattern" },
      ],
    },
    {
      name: "Backtracking",
      algorithms: [
        { name: "Subset Sum", slug: "subset-sum" },
        { name: "Permutations", slug: "backtracking-permutations" },
        { name: "Combinations", slug: "combinations" },
        { name: "N-Queens Problem", slug: "n-queens" },
        { name: "Sudoku Solver", slug: "sudoku-solver" },
        { name: "Rat in a Maze", slug: "rat-in-maze" },
      ],
    },
    {
      name: "Advanced Algorithms",
      algorithms: [
        { name: "KMP String Matching", slug: "kmp-string-matching" },
        { name: "Rabin-Karp Algorithm", slug: "rabin-karp" },
        { name: "Z Algorithm", slug: "z-algorithm" },
        { name: "Manacher's Algorithm", slug: "manachers-algorithm" },
        { name: "Suffix Array", slug: "suffix-array" },
        { name: "Suffix Tree", slug: "suffix-tree" },
        { name: "Network Flow (Ford-Fulkerson)", slug: "ford-fulkerson" },
        { name: "Edmonds-Karp Algorithm", slug: "edmonds-karp" },
      ],
    },
  ];

  const categoryIconMap: Record<string, LucideIcon> = {
    "Arrays & Basic Operations": MousePointerClick,
    "Searching Algorithms": Search,
    "Sorting Algorithms": Shuffle,
    "Recursion Patterns": Repeat,
    "Linked Lists": Link2,
    "Stack Algorithms": Layers,
    "Queue Algorithms": ListOrdered,
    Hashing: Hash,
    Trees: TreePine,
    "Graph Algorithms": Share2,
    "Dynamic Programming": Workflow,
    "Greedy Algorithms": Sparkles,
    Backtracking: Route,
    "Advanced Algorithms": Cpu,
  };

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;

    return categories
      .map((category) => {
        const algorithms = category.algorithms.filter((algo) =>
          algo.name.toLowerCase().includes(q),
        );
        return { ...category, algorithms };
      })
      .filter((category) => category.algorithms.length > 0);
  }, [categories, searchQuery]);

  // Find category containing selected algorithm
  const selectedCategory = useMemo(() => {
    if (!selectedSlug) return null;
    return categories.find((category) =>
      category.algorithms.some((algo) => algo.slug === selectedSlug),
    );
  }, [selectedSlug]);

  // Initialize expanded categories with selected category
  const [expandedCategories, setExpandedCategories] = useState<string[]>(() => {
    if (selectedCategory) {
      return [selectedCategory.name];
    }
    return ["Arrays & Basic Operations"];
  });

  // Update expanded categories when selection changes
  useEffect(() => {
    if (
      selectedCategory &&
      !expandedCategories.includes(selectedCategory.name)
    ) {
      setExpandedCategories((prev) => [...prev, selectedCategory.name]);
    }
  }, [selectedCategory]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    );
  };

  const widthAnimation =
    mode === "desktop"
      ? { width: isCollapsed ? collapsedWidth : expandedWidth }
      : undefined;

  return (
    <motion.aside
      className={cn(
        visibilityClassName,
        "custom-scrollbar overflow-y-auto",
        "relative rounded-2xl backdrop-blur-md",
        mode === "desktop" ? "will-change-[width]" : undefined,
        mode === "drawer" ? "w-full" : undefined,
        className,
      )}
      animate={widthAnimation}
      transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.9 }}
      style={{
        width: mode === "drawer" ? "100%" : undefined,
        background:
          "linear-gradient(180deg, rgba(141, 118, 233, 0.10) 0%, rgba(138, 77, 152, 0.06) 100%)",
        border: "1px solid rgba(var(--foreground), 0.08)",
        boxShadow: "0 18px 50px rgba(0, 0, 0, 0.18)",
      }}
    >
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(141, 118, 233, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(141, 118, 233, 0.4);
          border-radius: 4px;
          transition: background 0.2s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(141, 118, 233, 0.6);
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(141, 118, 233, 0.4) rgba(141, 118, 233, 0.05);
        }
      `}</style>
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(141, 118, 233, 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative p-4">
        <div className={cn("mb-4", isCollapsed ? "space-y-3" : "space-y-3")}>
          <div
            className={cn(
              "flex items-center",
              isCollapsed ? "justify-center" : "justify-between",
            )}
          >
            {!isCollapsed && (
              <h2
                className="text-sm font-semibold tracking-wide"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  color: "rgb(var(--foreground))",
                }}
              >
                Algorithms
              </h2>
            )}

            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                className={cn(
                  "rounded-xl p-2 transition-colors",
                  isCollapsed ? "" : "ml-3",
                )}
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.04)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(138, 77, 152, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(var(--foreground), 0.04)";
                }}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" style={{ opacity: 0.85 }} />
                ) : (
                  <ChevronLeft className="w-4 h-4" style={{ opacity: 0.85 }} />
                )}
              </button>
            )}
          </div>

          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                key="sidebar-search"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                className="rounded-xl px-3 py-2 flex items-center gap-2"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.04)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
              >
                <Search className="w-4 h-4" style={{ opacity: 0.75 }} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search algorithms..."
                  className="w-full bg-transparent outline-none text-sm"
                  style={{ color: "rgb(var(--foreground))" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {isCollapsed ? (
            <motion.nav
              key="collapsed-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-2"
            >
              {filteredCategories.map((category) => {
                const Icon = categoryIconMap[category.name] ?? Sparkles;
                return (
                  <button
                    key={category.name}
                    type="button"
                    className="w-full flex items-center justify-center rounded-xl p-3 transition-colors"
                    style={{
                      backgroundColor: "rgba(var(--foreground), 0.03)",
                      border: "1px solid rgba(var(--foreground), 0.08)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(138, 77, 152, 0.10)";
                      e.currentTarget.style.borderColor =
                        "rgba(138, 77, 152, 0.22)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(var(--foreground), 0.03)";
                      e.currentTarget.style.borderColor =
                        "rgba(var(--foreground), 0.08)";
                    }}
                    onClick={() => {
                      // Expand and focus this category
                      onToggleCollapse?.();
                      setExpandedCategories([category.name]);
                    }}
                    aria-label={category.name}
                    title={category.name}
                  >
                    <Icon className="w-5 h-5" style={{ opacity: 0.9 }} />
                  </button>
                );
              })}
            </motion.nav>
          ) : (
            <motion.nav
              key="expanded-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-2"
            >
              {filteredCategories.length === 0 && isSearching ? (
                <div
                  className="rounded-xl px-3 py-3 text-sm"
                  style={{
                    backgroundColor: "rgba(var(--foreground), 0.03)",
                    border: "1px solid rgba(var(--foreground), 0.08)",
                    color: "rgb(var(--foreground))",
                    opacity: 0.8,
                  }}
                >
                  No matching algorithms.
                  <button
                    type="button"
                    className="ml-2 underline underline-offset-2"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </button>
                </div>
              ) : null}

              {filteredCategories.map((category) => {
                const isExpanded =
                  isSearching || expandedCategories.includes(category.name);
                const Icon = categoryIconMap[category.name] ?? Sparkles;

                return (
                  <div
                    key={category.name}
                    className="rounded-xl"
                    style={{
                      backgroundColor: "rgba(var(--background), 0.28)",
                      boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {/* Category Header */}
                    <button
                      onClick={() => {
                        if (isSearching) return;
                        toggleCategory(category.name);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                        color: "rgb(var(--foreground))",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(138, 77, 152, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <span
                        className="flex items-center gap-2 text-[13px]"
                        style={{ opacity: 0.9 }}
                      >
                        <Icon className="w-4 h-4" style={{ opacity: 0.85 }} />
                        {category.name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-0" : "-rotate-90"}`}
                        style={{ opacity: 0.75 }}
                      />
                    </button>

                    {/* Algorithm List */}
                    <div
                      className={`px-2 pb-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "max-h-96 opacity-100 mt-1"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {category.algorithms.map((algorithm) => {
                        const isSelected = selectedSlug === algorithm.slug;

                        if (onSelectAlgorithm) {
                          return (
                            <button
                              key={algorithm.slug}
                              type="button"
                              onClick={() => onSelectAlgorithm(algorithm.slug)}
                              className={cn(
                                "block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                                "text-[rgb(var(--foreground))] opacity-70",
                                "hover:text-[rgb(141,118,233)] hover:bg-[rgba(141,118,233,0.08)] hover:opacity-100",
                                isSelected &&
                                  "text-[rgb(141,118,233)] bg-[rgba(141,118,233,0.12)] opacity-100",
                              )}
                              style={{
                                fontFamily: "var(--font-inter), sans-serif",
                              }}
                            >
                              {algorithm.name}
                            </button>
                          );
                        }

                        return (
                          <Link
                            key={algorithm.slug}
                            href={`/algorithms/${algorithm.slug}`}
                            className={cn(
                              "block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                              "text-[rgb(var(--foreground))] opacity-70 visited:text-[rgb(var(--foreground))]",
                              "hover:text-[rgb(141,118,233)] hover:bg-[rgba(141,118,233,0.08)] hover:opacity-100",
                              isSelected &&
                                "text-[rgb(141,118,233)] bg-[rgba(141,118,233,0.12)] opacity-100",
                            )}
                            style={{
                              fontFamily: "var(--font-inter), sans-serif",
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
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
