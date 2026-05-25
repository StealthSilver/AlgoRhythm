"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FeatureBentoIllustration,
  type FeatureIllustrationId,
} from "./feature-illustrations";

const features: {
  title: string;
  description: string;
  illustration: FeatureIllustrationId;
}[] = [
  {
    title: "Visual step-by-step execution",
    description:
      "Watch every operation, pointer move, and state change unfold in real time.",
    illustration: "step-through",
  },
  {
    title: "Interactive controls",
    description:
      "Play, pause, step through, and scrub execution at your own pace.",
    illustration: "interactive",
  },
  {
    title: "Clean code examples",
    description:
      "Study readable implementations with complexity notes and line-by-line context.",
    illustration: "code",
  },
  {
    title: "Custom input testing",
    description:
      "Enter your own datasets and see exactly how the algorithm handles them.",
    illustration: "custom-input",
  },
  {
    title: "Conceptual breakdowns",
    description:
      "Understand the why behind each approach with intuitive theory and use cases.",
    illustration: "concepts",
  },
  {
    title: "Performance analytics",
    description:
      "Compare time and space complexity side by side to pick the right tool.",
    illustration: "performance",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <motion.div
        ref={ref}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-5"
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-3xl text-xl font-extralight leading-snug tracking-tight sm:mb-12 sm:text-2xl md:text-3xl"
        >
          The complete{" "}
          <span style={{ color: "#8a4d98" }}>visual toolkit</span>
        </motion.p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 + index * 0.06 }}
              className="landing-surface flex min-h-[360px] flex-col rounded-xl p-5 sm:min-h-[400px] sm:p-6 md:min-h-[430px]"
            >
              <div className="flex flex-1 items-center justify-center px-2 py-6 sm:px-3 sm:py-8 md:px-4 md:py-8">
                <FeatureBentoIllustration
                  id={feature.illustration}
                  isInView={isInView}
                />
              </div>

              <div className="landing-border shrink-0 border-t pt-4 sm:pt-5">
                <h3 className="mb-2 text-base font-extralight leading-snug tracking-tight sm:text-lg">
                  {feature.title}
                </h3>
                <p className="landing-body text-sm font-extralight leading-relaxed tracking-wide">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
