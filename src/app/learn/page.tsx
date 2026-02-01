"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Play,
  Clock,
  ChevronRight,
  Code2,
  BarChart3,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

const learningPaths = [
  {
    id: "fundamentals",
    title: "Algorithm Fundamentals",
    description:
      "Learn the basics of algorithmic thinking and problem-solving approaches.",
    duration: "2-3 hours",
    lessons: 8,
    level: "Beginner",
    color: "rgb(34, 197, 94)",
    topics: [
      "Big O Notation",
      "Time Complexity",
      "Space Complexity",
      "Problem Decomposition",
    ],
  },
  {
    id: "sorting",
    title: "Sorting Algorithms",
    description:
      "Master various sorting techniques from bubble sort to quick sort.",
    duration: "4-5 hours",
    lessons: 12,
    level: "Intermediate",
    color: "rgb(var(--secondary))",
    topics: [
      "Bubble Sort",
      "Selection Sort",
      "Merge Sort",
      "Quick Sort",
      "Heap Sort",
    ],
  },
  {
    id: "searching",
    title: "Searching Algorithms",
    description:
      "Explore different searching techniques for efficient data retrieval.",
    duration: "3-4 hours",
    lessons: 10,
    level: "Intermediate",
    color: "rgb(var(--primary))",
    topics: [
      "Linear Search",
      "Binary Search",
      "Jump Search",
      "Interpolation Search",
    ],
  },
  {
    id: "data-structures",
    title: "Data Structures",
    description: "Understand essential data structures that power algorithms.",
    duration: "6-8 hours",
    lessons: 15,
    level: "Advanced",
    color: "rgb(239, 68, 68)",
    topics: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs"],
  },
];

const featuredLessons = [
  {
    title: "Understanding Big O Notation",
    description: "Learn how to analyze algorithm efficiency",
    duration: "15 min",
    type: "Video",
  },
  {
    title: "Visualizing Bubble Sort",
    description: "Step-by-step animation of bubble sort",
    duration: "10 min",
    type: "Interactive",
  },
  {
    title: "Binary Search Deep Dive",
    description: "Master the divide and conquer approach",
    duration: "20 min",
    type: "Article",
  },
];

export default function LearnPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

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
            <GraduationCap
              className="w-4 h-4"
              style={{ color: "rgb(var(--secondary))" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "rgb(var(--secondary))" }}
            >
              Learning Center
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Learn Algorithms
          </h1>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ opacity: 0.7 }}
          >
            Structured learning paths to help you master algorithms and data
            structures through interactive lessons and visualizations.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: BookOpen, label: "Lessons", value: "45+" },
            { icon: Clock, label: "Hours of Content", value: "20+" },
            { icon: Code2, label: "Code Examples", value: "100+" },
            { icon: BarChart3, label: "Visualizations", value: "30+" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="rounded-xl p-4 text-center"
              style={{
                backgroundColor: "rgba(var(--foreground), 0.03)",
                border: "1px solid rgba(var(--foreground), 0.08)",
              }}
            >
              <stat.icon
                className="w-5 h-5 mx-auto mb-2"
                style={{ color: "rgb(var(--secondary))" }}
              />
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs" style={{ opacity: 0.6 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Learning Paths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Learning Paths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.03)",
                  border:
                    selectedPath === path.id
                      ? `2px solid ${path.color}`
                      : "1px solid rgba(var(--foreground), 0.08)",
                }}
                onClick={() =>
                  setSelectedPath(selectedPath === path.id ? null : path.id)
                }
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className="inline-flex px-2 py-1 rounded text-xs font-medium mb-2"
                      style={{
                        backgroundColor: `${path.color}20`,
                        color: path.color,
                      }}
                    >
                      {path.level}
                    </span>
                    <h3 className="text-lg font-semibold">{path.title}</h3>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform duration-200 ${selectedPath === path.id ? "rotate-90" : ""}`}
                    style={{ opacity: 0.5 }}
                  />
                </div>
                <p className="text-sm mb-4" style={{ opacity: 0.7 }}>
                  {path.description}
                </p>
                <div
                  className="flex items-center gap-4 text-sm"
                  style={{ opacity: 0.6 }}
                >
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {path.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {path.lessons} lessons
                  </span>
                </div>

                {/* Expanded Content */}
                {selectedPath === path.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4"
                    style={{
                      borderTop: "1px solid rgba(var(--foreground), 0.08)",
                    }}
                  >
                    <h4 className="text-sm font-medium mb-3">
                      Topics Covered:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {path.topics.map((topic) => (
                        <span
                          key={topic}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
                          style={{
                            backgroundColor: "rgba(var(--foreground), 0.05)",
                          }}
                        >
                          <CheckCircle2
                            className="w-3 h-3"
                            style={{ color: path.color }}
                          />
                          {topic}
                        </span>
                      ))}
                    </div>
                    <button
                      className="mt-4 w-full rounded-xl px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                      style={{
                        backgroundColor: path.color,
                        color: "white",
                      }}
                    >
                      <Play className="w-4 h-4" />
                      Start Learning
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Featured Lessons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredLessons.map((lesson, index) => (
              <div
                key={lesson.title}
                className="rounded-xl p-5 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.03)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: "rgba(var(--secondary), 0.15)",
                      color: "rgb(var(--secondary))",
                    }}
                  >
                    {lesson.type}
                  </span>
                  <span className="text-xs" style={{ opacity: 0.5 }}>
                    {lesson.duration}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{lesson.title}</h3>
                <p className="text-sm" style={{ opacity: 0.6 }}>
                  {lesson.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 rounded-2xl p-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(var(--primary), 0.1), rgba(var(--secondary), 0.1))",
            border: "1px solid rgba(var(--foreground), 0.08)",
          }}
        >
          <Lightbulb
            className="w-10 h-10 mx-auto mb-4"
            style={{ color: "rgb(var(--secondary))" }}
          />
          <h3 className="text-xl font-semibold mb-2">Ready to Practice?</h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ opacity: 0.7 }}>
            Head over to the algorithms explorer to see these concepts in action
            with interactive visualizations.
          </p>
          <Link
            href="/algorithms"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors"
            style={{
              backgroundColor: "rgb(var(--secondary))",
              color: "white",
            }}
          >
            Explore Algorithms
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
