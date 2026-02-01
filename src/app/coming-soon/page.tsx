"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Bell,
  ChevronRight,
  Rocket,
  Zap,
  Brain,
  GitBranch,
  Puzzle,
  Trophy,
  Users,
  Code2,
} from "lucide-react";

const upcomingFeatures = [
  {
    id: "challenges",
    title: "Coding Challenges",
    description:
      "Test your skills with timed algorithm challenges and compete on leaderboards.",
    icon: Trophy,
    status: "In Development",
    eta: "Q1 2026",
    color: "rgb(234, 179, 8)",
  },
  {
    id: "pathfinding",
    title: "Pathfinding Algorithms",
    description:
      "Visualize A*, Dijkstra's, BFS, DFS and more on interactive grids.",
    icon: GitBranch,
    status: "Coming Soon",
    eta: "Q1 2026",
    color: "rgb(34, 197, 94)",
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    description:
      "Master DP with step-by-step visualizations of memoization and tabulation.",
    icon: Puzzle,
    status: "Planned",
    eta: "Q2 2026",
    color: "rgb(var(--secondary))",
  },
  {
    id: "ai-tutor",
    title: "AI Algorithm Tutor",
    description: "Get personalized explanations and hints powered by AI.",
    icon: Brain,
    status: "Research",
    eta: "Q2 2026",
    color: "rgb(168, 85, 247)",
  },
  {
    id: "multiplayer",
    title: "Multiplayer Mode",
    description:
      "Race against friends to solve algorithm puzzles in real-time.",
    icon: Users,
    status: "Planned",
    eta: "Q3 2026",
    color: "rgb(236, 72, 153)",
  },
  {
    id: "code-playground",
    title: "Code Playground",
    description:
      "Write and execute your own algorithm implementations in the browser.",
    icon: Code2,
    status: "In Development",
    eta: "Q1 2026",
    color: "rgb(var(--primary))",
  },
];

const statusColors: Record<string, string> = {
  "In Development": "rgb(34, 197, 94)",
  "Coming Soon": "rgb(59, 130, 246)",
  Planned: "rgb(var(--secondary))",
  Research: "rgb(168, 85, 247)",
};

export default function ComingSoonPage() {
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
            <Sparkles
              className="w-4 h-4"
              style={{ color: "rgb(var(--secondary))" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "rgb(var(--secondary))" }}
            >
              Roadmap
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Coming Soon
          </h1>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ opacity: 0.7 }}
          >
            Exciting new features are on the way! Here&apos;s a sneak peek at
            what we&apos;re building to make AlgoRhythm even better.
          </p>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 md:p-8 mb-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(var(--primary), 0.15), rgba(var(--secondary), 0.15))",
            border: "1px solid rgba(var(--foreground), 0.1)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(var(--secondary), 0.2)" }}
              >
                <Bell
                  className="w-8 h-8"
                  style={{ color: "rgb(var(--secondary))" }}
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-semibold mb-2">Stay Updated</h2>
              <p className="text-sm" style={{ opacity: 0.7 }}>
                Be the first to know when new features launch. We&apos;ll send
                you a quick email when something exciting is ready.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-3 rounded-xl text-sm w-full sm:w-64 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.05)",
                  border: "1px solid rgba(var(--foreground), 0.1)",
                  color: "rgb(var(--foreground))",
                }}
              />
              <button
                className="px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "rgb(var(--secondary))",
                  color: "white",
                }}
              >
                Notify Me
              </button>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Upcoming Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.03)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon
                      className="w-6 h-6"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${statusColors[feature.status]}20`,
                      color: statusColors[feature.status],
                    }}
                  >
                    {feature.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm mb-4" style={{ opacity: 0.7 }}>
                  {feature.description}
                </p>
                <div
                  className="flex items-center text-sm"
                  style={{ opacity: 0.5 }}
                >
                  <Rocket className="w-4 h-4 mr-1" />
                  Expected: {feature.eta}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Development Timeline
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "rgba(var(--foreground), 0.03)",
              border: "1px solid rgba(var(--foreground), 0.08)",
            }}
          >
            <div className="space-y-6">
              {[
                {
                  quarter: "Q1 2026",
                  items: [
                    "Coding Challenges",
                    "Pathfinding Algorithms",
                    "Code Playground",
                  ],
                  current: true,
                },
                {
                  quarter: "Q2 2026",
                  items: ["Dynamic Programming", "AI Algorithm Tutor"],
                  current: false,
                },
                {
                  quarter: "Q3 2026",
                  items: ["Multiplayer Mode", "Graph Algorithms"],
                  current: false,
                },
              ].map((period, index) => (
                <div key={period.quarter} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: period.current
                          ? "rgb(var(--secondary))"
                          : "rgba(var(--foreground), 0.2)",
                        boxShadow: period.current
                          ? "0 0 0 4px rgba(var(--secondary), 0.3)"
                          : "none",
                      }}
                    />
                    {index < 2 && (
                      <div
                        className="w-0.5 h-full min-h-15"
                        style={{
                          backgroundColor: "rgba(var(--foreground), 0.1)",
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{period.quarter}</span>
                      {period.current && (
                        <span
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{
                            backgroundColor: "rgba(var(--secondary), 0.15)",
                            color: "rgb(var(--secondary))",
                          }}
                        >
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {period.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-lg text-sm"
                          style={{
                            backgroundColor: "rgba(var(--foreground), 0.05)",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm mb-4" style={{ opacity: 0.6 }}>
            Want to help shape the future of AlgoRhythm?
          </p>
          <Link
            href="/algorithms"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors"
            style={{
              backgroundColor: "rgba(var(--foreground), 0.08)",
              border: "1px solid rgba(var(--foreground), 0.1)",
            }}
          >
            <Zap
              className="w-4 h-4"
              style={{ color: "rgb(var(--secondary))" }}
            />
            Explore Current Features
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
