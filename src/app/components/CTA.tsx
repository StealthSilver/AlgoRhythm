"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function CTA() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [dots, setDots] = useState<
    Array<{ left: number; top: number; duration: number; delay: number }>
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

    // Check theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Background */}
      <div className="absolute inset-0 cta-gradient" />

      {/* Smooth Ripple Effects - Positioned correctly with wrapper */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <div className="absolute w-[600px] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 cta-ripple-1" />
      </div>
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <div className="absolute w-[800px] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 cta-ripple-2" />
      </div>
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <div className="absolute w-[1000px] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 cta-ripple-3" />
      </div>

      {/* Blinking dots - Theme aware */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            backgroundColor: isDark ? "rgb(126, 135, 205)" : "rgb(30, 70, 92)",
            opacity: 0,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: isDark ? [0.15, 0.35, 0.15] : [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-8 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] mb-6"
        >
          Learn Algorithms the Way
          <br />
          <span className="font-semibold" style={{ color: "#8a4d98" }}>
            They Actually Work
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl mx-auto text-lg leading-relaxed opacity-80 mb-12"
        >
          Follow each step visually, observe state changes, and build a deep
          understanding of algorithms through interactive execution.
        </motion.p>

        {/* CTA Button – SAME AS NAVBAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <button
            className="relative group px-6 py-2 text-sm font-semibold rounded-lg overflow-hidden cursor-pointer"
            style={{
              backgroundColor: "#8a4d98",
              color: "#ffffff",
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
            {/* Shimmer sweep */}
            <span className="pointer-events-none absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-out group-hover:left-full" />
            <span className="relative z-10">Get Started</span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-sm opacity-60"
        >
          Designed for focus, clarity, and real understanding.
        </motion.p>
      </div>
    </section>
  );
}
