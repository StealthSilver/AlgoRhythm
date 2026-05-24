"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpDown,
  Search,
  GitBranch,
  TreeDeciduous,
  Boxes,
  RotateCcw,
} from "lucide-react";

const categories = [
  {
    icon: ArrowUpDown,
    title: "Sorting Algorithms",
    description:
      "Bubble, Quick, Merge, Heap sort and more with step-by-step visualization.",
    count: 12,
  },
  {
    icon: Search,
    title: "Searching Algorithms",
    description:
      "Binary search, linear search, and advanced search techniques.",
    count: 8,
  },
  {
    icon: GitBranch,
    title: "Graph Algorithms",
    description: "BFS, DFS, Dijkstra, Bellman-Ford, and topological sorting.",
    count: 15,
  },
  {
    icon: TreeDeciduous,
    title: "Trees & BST",
    description:
      "Binary trees, AVL, Red-Black trees, and tree traversal methods.",
    count: 10,
  },
  {
    icon: Boxes,
    title: "Dynamic Programming",
    description: "Knapsack, LCS, matrix chain, and optimization problems.",
    count: 14,
  },
  {
    icon: RotateCcw,
    title: "Recursion & Backtracking",
    description: "N-Queens, Sudoku solver, permutations, and combinations.",
    count: 9,
  },
];

export default function Categories() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="categories"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <motion.div
        ref={ref}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12"
      >
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:mb-6 sm:px-4 sm:py-2 sm:text-sm"
            style={{
              backgroundColor: "rgba(var(--foreground), 0.05)",
              border: "1px solid rgba(var(--foreground), 0.1)",
            }}
          >
            <span style={{ opacity: 0.7 }}>Explore Categories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-2xl font-light leading-[1.15] tracking-tight sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Comprehensive{" "}
            <span className="font-light" style={{ color: "#8a4d98" }}>
              Algorithm Library
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm leading-relaxed sm:text-base md:text-lg"
            style={{ opacity: 0.8 }}
          >
            From fundamental sorting algorithms to advanced graph theory,
            explore our curated collection of interactive visualizations.
          </motion.p>
        </div>

        <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="category-card group cursor-pointer"
            >
              <div className="mb-3 flex items-start justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(138, 77, 152, 0.12)",
                  }}
                >
                  <category.icon
                    className="h-5 w-5"
                    style={{ color: "#8a4d98" }}
                  />
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(138, 77, 152, 0.1)",
                    color: "#8a4d98",
                  }}
                >
                  {category.count} lessons
                </span>
              </div>

              <h3 className="mb-2 text-base font-light transition-colors duration-300 group-hover:text-[#8a4d98]">
                {category.title}
              </h3>

              <p
                className="mb-3 text-sm leading-relaxed"
                style={{ opacity: 0.75 }}
              >
                {category.description}
              </p>

              <div
                className="flex items-center text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ color: "#8a4d98" }}
              >
                <span>Explore</span>
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
