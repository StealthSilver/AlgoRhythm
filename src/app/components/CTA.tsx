"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
      style={{
        backgroundColor: "#00c8fc",
      }}
    >
      {/* Animated background elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          animate={{
            y: [-20, 20],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white font-medium">
              Start your journey today
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            style={{
              color: "rgb(var(--foreground))",
            }}
          >
            Ready to Master
            <br />
            <span
              className="font-bold"
              style={{
                background: "linear-gradient(135deg, #8a4d98 0%, #5a2d68 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Algorithms?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg mb-10 max-w-xl mx-auto"
            style={{
              color: "rgb(var(--foreground))",
              opacity: 0.9,
            }}
          >
            Join thousands of developers who have transformed their
            understanding of algorithms through visual learning. Start for free,
            no credit card required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Get Started Button - Same as Navbar */}
            <motion.button
              className="relative px-8 py-3 text-white text-base font-semibold rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundColor: "#8a4d98",
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(138, 77, 152, 0.85)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#8a4d98";
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Metallic shine overlay */}
              <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-700 ease-out"></span>
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>

            {/* View Documentation Button */}
            <motion.button
              className="px-8 py-3 text-base font-semibold rounded-lg backdrop-blur-sm transition-all"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                color: "rgb(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.2)";
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Documentation
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-sm"
            style={{
              color: "rgb(var(--foreground))",
              opacity: 0.8,
            }}
          >
            No credit card required. Free tier includes 10+ algorithms.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
