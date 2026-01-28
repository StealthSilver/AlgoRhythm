"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, Play, Code2, Sparkles } from "lucide-react";
import { Meteors } from "../ui/meteors";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate dots and floating elements
    setDots(
      Array.from({ length: 30 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 3,
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

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 px-4 sm:pt-20 sm:px-6"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <Meteors number={6} />
      {/* Smooth Ripple Effects */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <motion.div
          className="absolute w-[300px] sm:w-[500px] md:w-[700px] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 hero-ripple-1"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <motion.div
          className="absolute w-[400px] sm:w-[600px] md:w-[900px] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 hero-ripple-2"
          style={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <motion.div
          className="absolute w-[500px] sm:w-[700px] md:w-[1100px] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 hero-ripple-3"
          style={{
            x: mousePosition.x * 0.3,
            y: mousePosition.y * 0.3,
          }}
        />
      </div>

      {/* Blinking dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            backgroundColor: isDark ? "#00c8fc" : "#1e465c",
            opacity: 0,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: isDark ? [0.06, 0.14, 0.06] : [0.1, 0.22, 0.1],
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

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 md:px-12 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm"
          style={{
            backgroundColor: "rgba(var(--foreground), 0.05)",
            border: "1px solid rgba(var(--foreground), 0.1)",
          }}
        >
          <Sparkles className="w-4 h-4" style={{ color: "#8a4d98" }} />
          <span style={{ opacity: 0.8 }}>
            Interactive Algorithm Learning Platform
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.1] mb-4 sm:mb-6"
        >
          Visualize Algorithms
          <br />
          <span
            className="font-light"
            style={{
              color: "#8a4d98",
            }}
          >
            Master Data Structures
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12"
          style={{ opacity: 0.8 }}
        >
          Watch algorithms come to life with step-by-step visualizations. Build
          intuition, understand complexity, and ace your coding interviews.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-white text-sm sm:text-base font-semibold rounded-lg overflow-hidden cursor-pointer"
            style={{
              backgroundColor: "#8a4d98",
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(138, 77, 152, 0.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#8a4d98";
            }}
          >
            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-700 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-5 h-5" fill="currentColor" />
              Start Learning
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: "rgba(var(--foreground), 0.05)",
              border: "1px solid rgba(var(--foreground), 0.2)",
              color: "rgb(var(--foreground))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(var(--foreground), 0.1)";
              e.currentTarget.style.borderColor = "rgba(138, 77, 152, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(var(--foreground), 0.05)";
              e.currentTarget.style.borderColor =
                "rgba(var(--foreground), 0.2)";
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Browse Algorithms
            </span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12"
        >
          {[
            { value: "50+", label: "Algorithms" },
            { value: "21", label: "Categories" },
            { value: "100%", label: "Interactive" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-light mb-1"
                style={{ color: "#8a4d98" }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm" style={{ opacity: 0.7 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => {
          document
            .getElementById("features")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span
          className="text-sm transition-colors duration-300"
          style={{ opacity: 0.6 }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{
            border: "2px solid rgba(var(--foreground), 0.2)",
          }}
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: "#8a4d98",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
