"use client";

import { useState, useEffect, useMemo } from "react";
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

  return (
    <aside
      className="hidden md:block fixed top-16 md:top-20 left-0 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-72 overflow-y-auto transition-transform duration-300 z-40 custom-scrollbar backdrop-blur-md"
      style={{
        backgroundColor: "rgba(var(--background), 0.8)",
        borderRight: "1px solid rgba(var(--foreground), 0.1)",
        boxShadow: "2px 0 16px rgba(0, 0, 0, 0.08)",
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
      <div className="py-6 pr-6 pl-8 sm:pl-10 lg:pl-12">
        <h2
          className="text-lg font-light mb-4"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            color: "rgb(var(--foreground))",
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
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-light transition-colors"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    color: "rgb(var(--foreground))",
                    backgroundColor: "rgba(var(--foreground), 0.03)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(var(--foreground), 0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(var(--foreground), 0.03)";
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
                            ? "bg-[rgb(141,118,233)]/10 text-[rgb(141,118,233)] font-light"
                            : "hover:text-[rgb(141,118,233)] hover:bg-[rgb(141,118,233)]/5"
                        }`}
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          color: isSelected
                            ? "rgb(141, 118, 233)"
                            : "rgb(var(--foreground))",
                          opacity: isSelected ? 1 : 0.72,
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
