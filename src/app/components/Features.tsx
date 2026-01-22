"use client";

import { useEffect, useRef, useState } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

function FeatureCard({ title, description, icon, delay }: FeatureCardProps) {
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
      className={`group relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        background: "rgba(141, 118, 233, 0.05)",
        border: "1px solid rgba(141, 118, 233, 0.2)",
      }}
    >
      {/* Glowing border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(141, 118, 233, 0.3) 0%, rgba(141, 118, 233, 0) 100%)",
          boxShadow: "0 0 40px rgba(141, 118, 233, 0.4)",
        }}
      />

      <div className="relative z-10">
        <div
          className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{
            filter: "drop-shadow(0 0 10px rgba(141, 118, 233, 0.5))",
          }}
        >
          {icon}
        </div>

        <h3
          className="text-2xl font-bold mb-3 text-[rgb(141,118,233)]"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            textShadow: "0 0 20px rgba(141, 118, 233, 0.3)",
          }}
        >
          {title}
        </h3>

        <p
          className="text-gray-600 dark:text-white/80 leading-relaxed"
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
      icon: "🎯",
    },
    {
      title: "Step-by-Step Animations",
      description:
        "Control the pace. Pause, rewind, and replay. Master complex algorithms at your own rhythm.",
      icon: "⚡",
    },
    {
      title: "From Arrays to Graphs",
      description:
        "Complete coverage of data structures and algorithms — from fundamentals to advanced techniques.",
      icon: "🌐",
    },
    {
      title: "Clean Explanations + Code",
      description:
        "Understand the logic with clear explanations and clean, readable code in multiple languages.",
      icon: "💻",
    },
  ];

  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background:
                "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(200, 180, 255) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Built for Learning
          </h2>
          <p
            className="text-xl text-gray-600 dark:text-white/70 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Everything you need to master algorithms, all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
