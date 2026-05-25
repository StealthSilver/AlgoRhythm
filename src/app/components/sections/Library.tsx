"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

import {
  libraryCategories,
  libraryCategoryIconMap,
  totalLibraryTopics,
} from "@/app/data/algorithmLibrary";
import { getTopicIcon } from "@/app/data/topicIcons";

const ctaButtonClass =
  "group relative inline-flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-full px-7 text-base font-medium leading-none text-white transition-colors duration-150 sm:h-12 sm:px-8";

const ctaButtonStyle = {
  backgroundColor: "#8a4d98",
  boxShadow:
    "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
} as const;

export default function Library() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(),
  );

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <section
      id="library"
      className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <motion.div
        ref={ref}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl sm:mb-14 md:mb-16"
        >
          <p className="mb-4 text-xl font-extralight leading-snug tracking-tight sm:text-2xl md:text-3xl">
            The complete{" "}
            <span style={{ color: "#8a4d98" }}>algorithm library</span>
          </p>
          <p className="landing-body max-w-2xl text-sm font-extralight leading-relaxed tracking-wide sm:text-base">
            {totalLibraryTopics} interactive topics across{" "}
            {libraryCategories.length} categories. Pick any box to jump straight
            into step-by-step visualization.
          </p>
        </motion.div>

        <div className="landing-divide divide-y">
          {libraryCategories.map((category, categoryIndex) => {
            const CategoryIcon =
              libraryCategoryIconMap[category.name] ?? Sparkles;
            const isExpanded = expandedCategories.has(category.name);

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: 0.06 + categoryIndex * 0.04,
                }}
                className="landing-border first:border-t"
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(category.name)}
                  aria-expanded={isExpanded}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors hover:opacity-90 sm:py-6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="landing-icon-box flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                      <CategoryIcon
                        className="h-[18px] w-[18px] text-neutral-200"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-extralight tracking-tight sm:text-xl">
                        {category.name}
                      </h3>
                      <p className="landing-muted text-xs font-extralight tracking-wide sm:text-sm">
                        {category.algorithms.length} topics
                      </p>
                    </div>
                  </div>

                  <span
                    className="landing-icon-box flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-300 transition-colors"
                    aria-hidden
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" strokeWidth={1.5} />
                    ) : (
                      <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="topics"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-3 pb-6 sm:grid-cols-3 sm:gap-4 sm:pb-8 lg:grid-cols-4 xl:grid-cols-5">
                        {category.algorithms.map((topic) => {
                          const TopicIcon = getTopicIcon(
                            topic.slug,
                            topic.name,
                            category.name,
                          );

                          return (
                            <Link
                              key={topic.slug}
                              href={`/algorithms/${topic.slug}`}
                              className="landing-surface group flex h-full min-h-[108px] flex-col rounded-xl p-3.5 transition-[border-color,box-shadow] duration-200 hover:border-[#8a4d98]/50 sm:min-h-[116px] sm:p-4"
                            >
                              <div className="mb-3 flex items-start justify-between gap-2">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8a4d98]/10 sm:h-10 sm:w-10">
                                  <TopicIcon
                                    className="h-4 w-4 text-[#8a4d98] sm:h-[18px] sm:w-[18px]"
                                    strokeWidth={1.5}
                                  />
                                </div>
                                <ArrowUpRight
                                  className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-50"
                                  strokeWidth={1.5}
                                />
                              </div>
                              <span className="line-clamp-3 text-xs font-extralight leading-snug tracking-tight text-neutral-100 sm:text-sm">
                                {topic.name}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="landing-border mt-14 flex flex-col items-start gap-4 border-t pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:pt-10 md:mt-20"
        >
          <p className="landing-body text-sm font-extralight tracking-wide sm:text-base">
            Open the full workspace with search and step controls.
          </p>
          <Link
            href="/algorithms"
            className={ctaButtonClass}
            style={ctaButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(138, 77, 152, 0.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#8a4d98";
            }}
          >
            <span className="absolute inset-y-0 -left-full w-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-out group-hover:left-full" />
            <span className="relative z-10">Open algorithm workspace</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
