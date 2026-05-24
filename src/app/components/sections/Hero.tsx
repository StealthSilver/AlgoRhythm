"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { Meteors } from "../ui/meteors";
import { useTheme } from "../../context/ThemeContext";

export default function Hero() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-4 sm:px-6"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <Meteors number={6} />
      {/* Smooth Ripple Effects */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <motion.div
          className="absolute w-75 sm:w-125 md:w-175 aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 hero-ripple-1"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <motion.div
          className="absolute w-100 sm:w-150 md:w-225 aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 hero-ripple-2"
          style={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <motion.div
          className="absolute w-125 sm:w-175 md:w-275 aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 hero-ripple-3"
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
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 text-center"
      >
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight tracking-tight leading-[1.1] mb-8 sm:mb-10"
        >
          Visualize Algorithms
          <br />
          <span
            className="font-extralight"
            style={{
              color: "#8a4d98",
            }}
          >
            Master Data Structures
          </span>
        </motion.h1>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center w-full sm:w-auto"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="relative group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-white text-sm sm:text-base font-semibold rounded-lg overflow-hidden cursor-pointer"
            style={{
              backgroundColor: "#8a4d98",
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => router.push("/algorithms")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(138, 77, 152, 0.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#8a4d98";
            }}
          >
            <span className="absolute inset-y-0 -left-full w-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-700 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-5 h-5" fill="currentColor" />
              Start Learning
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="relative group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: "transparent",
              border: "0.5px solid transparent",
              color: "rgb(var(--foreground))",
            }}
            onClick={() => router.push("/algorithms")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.65)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "transparent";
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
    </section>
  );
}
