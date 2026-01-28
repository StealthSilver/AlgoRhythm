"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowUpDown,
  Search,
  GitBranch,
  TreeDeciduous,
  Boxes,
  RotateCcw,
} from "lucide-react";
import { Meteors } from "../ui/meteors";

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
  const [dots, setDots] = useState<
    Array<{ left: number; top: number; duration: number; delay: number }>
  >([]);
  const [floatingElements, setFloatingElements] = useState<
    Array<{
      left: number;
      top: number;
      duration: number;
      delay: number;
      size: number;
    }>
  >([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Generate random positions only on client side to avoid hydration mismatch
    setDots(
      Array.from({ length: 25 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 5 + Math.random() * 4,
        delay: Math.random() * 4,
      })),
    );

    setFloatingElements(
      Array.from({ length: 8 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
        size: 40 + Math.random() * 80,
      })),
    );

    // Check theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const codeSnippets = [
    "quickSort(arr)",
    "bfs(graph)",
    "dijkstra()",
    "mergeSort()",
    "dfs(node)",
  ];

  return (
    <section
      id="categories"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <Meteors number={20} />
      {/* Blinking dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            backgroundColor: isDark ? "#00c8fc" : "#1e465c",
            opacity: 0,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: isDark ? [0.15, 0.35, 0.15] : [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}

      {/* Floating code elements */}
      {floatingElements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            width: element.size,
            height: element.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        >
          <div
            className="w-full h-full rounded-lg flex items-center justify-center text-xs font-mono"
            style={{
              backgroundColor: "rgba(138, 77, 152, 0.08)",
              border: "1px solid rgba(138, 77, 152, 0.2)",
            }}
          >
            {codeSnippets[i % codeSnippets.length]}
          </div>
        </motion.div>
      ))}

      <div
        className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
        ref={ref}
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm"
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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] mb-4 sm:mb-6"
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
            className="text-sm sm:text-base md:text-lg leading-relaxed"
            style={{ opacity: 0.8 }}
          >
            From fundamental sorting algorithms to advanced graph theory,
            explore our curated collection of interactive visualizations.
          </motion.p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="category-card cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(138, 77, 152, 0.12)",
                  }}
                >
                  <category.icon
                    className="w-5 h-5"
                    style={{ color: "#8a4d98" }}
                  />
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(138, 77, 152, 0.1)",
                    color: "#8a4d98",
                  }}
                >
                  {category.count} lessons
                </span>
              </div>

              <h3 className="text-base font-light mb-2 transition-colors duration-300 group-hover:text-[#8a4d98]">
                {category.title}
              </h3>

              <p
                className="text-sm leading-relaxed mb-3"
                style={{
                  opacity: 0.75,
                }}
              >
                {category.description}
              </p>

              <div
                className="flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: "#8a4d98" }}
              >
                <span>Explore</span>
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
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
        </div>
      </div>
    </section>
  );
}
