"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
      id="features"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
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

      <div className="relative max-w-6xl mx-auto px-8 md:px-12" ref={ref}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm"
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
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] mb-6"
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
            className="text-lg leading-relaxed"
            style={{ opacity: 0.8 }}
          >
            More than just theory. Experience algorithms in action with
            interactive visualizations designed to build deep, intuitive
            understanding.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
              className="feature-card group"
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
                style={{
                  backgroundColor: "rgba(138, 77, 152, 0.12)",
                }}
              >
                <feature.icon
                  className="w-5 h-5"
                  style={{ color: "#8a4d98" }}
                />
              </div>

              <h3 className="text-base font-light mb-2.5 transition-colors duration-300 group-hover:text-[#8a4d98]">
                {feature.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{
                  opacity: 0.75,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
