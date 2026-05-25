"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HeroGridAnimations } from "../hero/HeroGridAnimations";

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
      className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-radial-glow absolute inset-0" />
      </div>

      <motion.div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 pt-28 text-left sm:px-5 sm:pt-20 md:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 text-3xl font-extralight leading-[1.1] tracking-tight sm:mb-10 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        >
          Visualize Algorithms
          <br />
          Master Data Structures
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="landing-body mb-8 max-w-xl text-base font-extralight tracking-wide sm:mb-10"
        >
          Interactive visualizations that transform complex concepts into intuitive
          understanding
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-start"
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

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 z-[1] max-sm:inset-x-0 max-sm:overflow-hidden pb-4"
      >
        <HeroGridAnimations />
      </div>
    </section>
  );
}
