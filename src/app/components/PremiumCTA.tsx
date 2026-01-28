"use client";

import { motion } from "framer-motion";

interface PremiumCTAProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function PremiumCTA({
  href = "/algorithms",
  onClick,
  className = "",
}: PremiumCTAProps) {
  const ButtonWrapper = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <ButtonWrapper
      {...props}
      className={`
        relative inline-flex items-center justify-center
        px-6 py-2.5 
        text-sm font-medium
        rounded-full
        overflow-hidden
        group
        transition-all duration-500 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7e87cd] focus-visible:ring-offset-2
        ${className}
      `}
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Wavy animated background layer */}
      <span
        className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 10px,
              rgba(126, 135, 205, 0.05) 10px,
              rgba(126, 135, 205, 0.05) 20px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 10px,
              rgba(30, 70, 92, 0.05) 10px,
              rgba(30, 70, 92, 0.05) 20px
            )
          `,
          animation: "wave 8s linear infinite",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Base background with shimmer gradient */}
      <span
        className="absolute inset-0 group-hover:animate-shimmer-fast"
        style={{
          background:
            "linear-gradient(90deg, #1e465c 0%, #7e87cd 50%, #1e465c 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer-slow 4s ease-in-out infinite",
        }}
      />

      {/* Subtle border */}
      <span
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          border: "1px solid rgba(126, 135, 205, 0.2)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      />

      {/* Hover glow effect */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `
            0 0 20px rgba(126, 135, 205, 0.3),
            0 0 40px rgba(126, 135, 205, 0.15),
            inset 0 0 20px rgba(126, 135, 205, 0.1)
          `,
        }}
      />

      {/* Inner highlight on hover */}
      <span
        className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(126, 135, 205, 0.5), transparent)",
        }}
      />

      {/* Text */}
      <span
        className="relative z-10 transition-colors duration-300 group-hover:text-white"
        style={{
          color: "#d3dee9",
          textShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        Get Started
      </span>

      {/* Active state darkening overlay */}
      <span className="absolute inset-0 bg-black opacity-0 group-active:opacity-20 transition-opacity duration-100 rounded-full" />
    </ButtonWrapper>
  );
}
