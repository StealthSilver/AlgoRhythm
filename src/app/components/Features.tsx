"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Zap, Network, Code } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay: number;
}

function FeatureCard({
  title,
  description,
  icon: Icon,
  delay,
}: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`group relative p-5 sm:p-6 md:p-8 rounded-2xl backdrop-blur-sm transition-all duration-700 hover:shadow-xl ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(141, 118, 233, 0.15)",
      }}
    >
      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(141, 118, 233, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <div className="mb-4 sm:mb-5 inline-flex p-2.5 sm:p-3 rounded-xl bg-[rgb(141,118,233)]/10 group-hover:bg-[rgb(141,118,233)]/20 transition-colors duration-300">
          <Icon
            className="text-[rgb(141,118,233)] transition-transform duration-300 group-hover:scale-110"
            size={24}
            strokeWidth={1.5}
          />
        </div>

        <h3
          className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {title}
        </h3>

        <p
          className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-[15px]"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Features() {
  const features = [
    {
      title: "Visual Algorithm Explorer",
      description:
        "Watch algorithms come to life with real-time visualizations. See every step, every decision, every path.",
      icon: Eye,
    },
    {
      title: "Step-by-Step Animations",
      description:
        "Control the pace. Pause, rewind, and replay. Master complex algorithms at your own rhythm.",
      icon: Zap,
    },
    {
      title: "From Arrays to Graphs",
      description:
        "Complete coverage of data structures and algorithms — from fundamentals to advanced techniques.",
      icon: Network,
    },
    {
      title: "Clean Explanations + Code",
      description:
        "Understand the logic with clear explanations and clean, readable code in multiple languages.",
      icon: Code,
    },
  ];

  return (
    <section
      id="features"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white dark:bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white px-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Built for{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(200, 180, 255) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Learning
            </span>
          </h2>
          <p
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Everything you need to master algorithms, all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
