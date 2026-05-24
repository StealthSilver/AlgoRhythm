"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Eye,
  Zap,
  Code2,
  PlayCircle,
  GraduationCap,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Visual Step-by-Step Execution",
    description:
      "Watch algorithms come to life with real-time visualization of every operation, variable change, and data structure manipulation.",
  },
  {
    icon: Zap,
    title: "Interactive Controls",
    description:
      "Pause, resume, step forward or backward through algorithm execution. Control the speed and focus on the details that matter.",
  },
  {
    icon: Code2,
    title: "Clean Code Examples",
    description:
      "Study well-documented, production-ready code with detailed explanations of time and space complexity for every algorithm.",
  },
  {
    icon: PlayCircle,
    title: "Custom Input Testing",
    description:
      "Test algorithms with your own datasets. Experiment with edge cases and understand how different inputs affect performance.",
  },
  {
    icon: GraduationCap,
    title: "Conceptual Breakdowns",
    description:
      "Deep dive into the theory behind each algorithm with intuitive explanations, use cases, and real-world applications.",
  },
  {
    icon: Clock,
    title: "Performance Analytics",
    description:
      "Compare algorithm efficiency with built-in benchmarking tools. Understand why certain algorithms work better for specific scenarios.",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
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
            <span style={{ opacity: 0.7 }}>Why Choose AlgoRhythm</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-2xl font-light leading-[1.15] tracking-tight sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Learn Through{" "}
            <span className="font-light" style={{ color: "#8a4d98" }}>
              Visualization
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm leading-relaxed sm:text-base md:text-lg"
            style={{ opacity: 0.8 }}
          >
            More than just theory. Experience algorithms in action with
            interactive visualizations designed to build deep, intuitive
            understanding.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
              className="feature-card group"
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: "rgba(138, 77, 152, 0.12)",
                }}
              >
                <feature.icon
                  className="h-5 w-5"
                  style={{ color: "#8a4d98" }}
                />
              </div>

              <h3 className="mb-2.5 text-base font-light transition-colors duration-300 group-hover:text-[#8a4d98]">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed" style={{ opacity: 0.75 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
