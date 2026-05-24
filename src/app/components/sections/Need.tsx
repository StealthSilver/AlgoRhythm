"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { NeedIllustrations } from "./need-illustrations";

const painPoints = [
  {
    title: "Theory alone doesn't build intuition",
    description:
      "You can read every definition and still not really feel how an algorithm behaves.",
  },
  {
    title: "Static diagrams hide state changes",
    description:
      "Textbook images never show you how data actually shifts from one step to the next.",
  },
  {
    title: "Memorizing code is not understanding",
    description:
      "Copying patterns works until the problem changes shape on you.",
  },
  {
    title: "Interviews demand real intuition",
    description:
      "Confidence comes from seeing the process unfold, not from reciting it from memory.",
  },
];

export default function Need() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="need"
      className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <motion.div
        ref={ref}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-5"
      >
        <motion.div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12 lg:gap-x-16">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.08 }}
              className="border-t border-black/[0.08] pt-6 dark:border-white/[0.08] sm:pt-8"
            >
              <h3 className="mb-3 text-xl font-extralight leading-snug tracking-tight sm:mb-4 sm:text-2xl">
                {point.title}
              </h3>
              <p className="max-w-md text-base font-extralight tracking-wide opacity-80">
                {point.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 max-w-2xl text-xl font-extralight leading-snug tracking-tight sm:mt-16 sm:text-2xl md:mt-20 md:text-3xl"
        >
          AlgoRhythm makes algorithms{" "}
          <span style={{ color: "#8a4d98" }}>visible</span>,{" "}
          <span style={{ color: "#8a4d98" }}>interactive</span>, and{" "}
          <span style={{ color: "#8a4d98" }}>unforgettable</span>.
        </motion.p>

        <NeedIllustrations isInView={isInView} />
      </motion.div>
    </section>
  );
}
