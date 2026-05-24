"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NoiseTexture } from "../ui/noise-texture";

const ctaButtonClass =
  "group relative inline-flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-full px-7 text-base font-medium leading-none text-white transition-colors duration-150 sm:h-12 sm:px-8";

const ctaButtonStyle = {
  backgroundColor: "#8a4d98",
  boxShadow:
    "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
} as const;

export default function Hero() {
  const router = useRouter();

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 sm:px-6"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-radial-glow absolute inset-0">
          <NoiseTexture
            frequency={0.85}
            octaves={8}
            noiseOpacity={0.35}
            className="opacity-30 dark:opacity-40"
          />
        </div>
        <div className="hero-grid-bg absolute inset-0" />
      </div>

      <motion.div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-8 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 text-3xl font-extralight leading-[1.1] tracking-tight sm:mb-10 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        >
          Visualize Algorithms
          <br />
          <span className="font-extralight" style={{ color: "#8a4d98" }}>
            Master Data Structures
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <button
            type="button"
            className={ctaButtonClass}
            style={ctaButtonStyle}
            onClick={() => router.push("/algorithms")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(138, 77, 152, 0.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#8a4d98";
            }}
          >
            <span className="absolute inset-y-0 -left-full w-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-out group-hover:left-full" />
            <span className="relative z-10">Start Learning</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
