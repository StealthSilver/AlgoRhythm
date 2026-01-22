"use client";

import { useEffect, useRef, useState } from "react";

export default function Philosophy() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden bg-white dark:bg-black"
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(141, 118, 233, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(141, 118, 233, 0.15) 0%, transparent 50%)",
          animation: "pulse 8s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="mb-6 sm:mb-8">
            <div
              className="inline-block w-12 sm:w-16 h-1 rounded-full mb-6 sm:mb-8"
              style={{
                background: "rgb(141, 118, 233)",
                boxShadow: "0 0 20px rgba(141, 118, 233, 0.6)",
              }}
            />
          </div>

          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-relaxed mb-6 sm:mb-8 px-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "rgb(200, 180, 255)",
              textShadow: "0 0 30px rgba(141, 118, 233, 0.3)",
            }}
          >
            Algorithms aren't just logic.
          </p>

          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-relaxed mb-6 sm:mb-8 px-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "rgb(141, 118, 233)",
              textShadow: "0 0 30px rgba(141, 118, 233, 0.4)",
            }}
          >
            They're patterns. They're rhythm.
          </p>

          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-relaxed px-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background:
                "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(220, 200, 255) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 40px rgba(141, 118, 233, 0.5)",
            }}
          >
            And every great solution has a flow.
          </p>

          <div className="mt-12 sm:mt-16">
            <div
              className="inline-block w-12 sm:w-16 h-1 rounded-full"
              style={{
                background: "rgb(141, 118, 233)",
                boxShadow: "0 0 20px rgba(141, 118, 233, 0.6)",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
