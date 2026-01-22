"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <div
        className={`transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1
          className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            textShadow:
              "0 0 40px rgba(141, 118, 233, 0.5), 0 0 80px rgba(141, 118, 233, 0.2)",
            background:
              "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(200, 180, 255) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AlgoRhythm
        </h1>

        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-[rgb(141,118,233)]"
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            letterSpacing: "0.05em",
            textShadow: "0 0 30px rgba(141, 118, 233, 0.3)",
          }}
        >
          Where Algorithms Find Their Flow
        </h2>

        <p
          className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-white/90"
          style={{
            fontFamily: "'Inter', 'DM Sans', sans-serif",
          }}
        >
          Explore, understand, and visualize every algorithm — from fundamentals
          to advanced concepts — all in one rhythmic, interactive platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            className="group relative px-8 py-4 text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: "rgb(141, 118, 233)",
              boxShadow:
                "0 0 30px rgba(141, 118, 233, 0.4), 0 10px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            <span className="relative z-10 text-white">
              Start Exploring Algorithms
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgb(160, 140, 245) 0%, rgb(141, 118, 233) 100%)",
              }}
            />
          </button>

          <button
            className="group px-8 py-4 text-lg font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 dark:hover:bg-white/5 hover:bg-[rgb(141,118,233)]/5"
            style={{
              fontFamily: "'Inter', sans-serif",
              borderColor: "rgb(141, 118, 233)",
              color: "rgb(141, 118, 233)",
              boxShadow: "0 0 20px rgba(141, 118, 233, 0.2)",
            }}
          >
            View Visualizations
          </button>
        </div>
      </div>
    </div>
  );
}
