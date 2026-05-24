"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <motion.div className="relative mx-auto max-w-7xl px-8 text-center md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6 text-3xl font-light leading-[1.15] tracking-tight md:text-4xl lg:text-5xl"
        >
          Learn Algorithms the Way
          <br />
          <span className="font-light" style={{ color: "#8a4d98" }}>
            They Actually Work
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed opacity-80"
        >
          Follow each step visually, observe state changes, and build a deep
          understanding of algorithms through interactive execution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <button
            className="group relative cursor-pointer overflow-hidden rounded-lg px-6 py-2 text-sm font-light"
            style={{
              backgroundColor: "#8a4d98",
              color: "#ffffff",
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
            <span className="pointer-events-none absolute inset-y-0 -left-full w-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-out group-hover:left-full" />
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
      </motion.div>
    </section>
  );
}
