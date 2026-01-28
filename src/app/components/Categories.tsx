"use client";

import { useEffect, useRef, useState } from "react";

interface CategoryProps {
  name: string;
  delay: number;
}

function Category({ name, delay }: CategoryProps) {
  const [isVisible, setIsVisible] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 },
    );

    if (categoryRef.current) {
      observer.observe(categoryRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={categoryRef}
      className={`group relative px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 rounded-xl backdrop-blur-sm cursor-pointer transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{
        background: "rgba(141, 118, 233, 0.08)",
        border: "1px solid rgba(141, 118, 233, 0.2)",
      }}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow:
            "0 0 30px rgba(141, 118, 233, 0.5), inset 0 0 30px rgba(141, 118, 233, 0.1)",
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <span
          className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[rgb(141,118,233)] transition-colors duration-300"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {name}
        </span>

        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-[rgb(141,118,233)] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Categories() {
  const categories = [
    "Arrays",
    "Sorting",
    "Searching",
    "Linked Lists",
    "Stacks & Queues",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "Greedy Algorithms",
    "Backtracking",
    "Divide & Conquer",
    "Bit Manipulation",
  ];

  return (
    <section
      id="categories"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6"
    >
      {/* Background gradient accent */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(141, 118, 233, 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background:
                "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(200, 180, 255) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Explore by Category
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-white/70 max-w-2xl mx-auto px-4"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            From fundamentals to advanced techniques — organized and ready to
            learn
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {categories.map((category, index) => (
            <Category key={index} name={category} delay={index * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
