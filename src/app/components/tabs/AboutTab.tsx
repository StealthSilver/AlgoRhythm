"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ListOrdered, Sparkles } from "lucide-react";

import type { Algorithm } from "@/app/data/algorithmData";

interface AboutTabProps {
  algorithm: Algorithm;
}

export function AboutTab({ algorithm }: AboutTabProps) {
  return (
    <div className="space-y-8">
      {/* Description */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h3
          className="text-xl font-semibold mb-3"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          What is {algorithm.name}?
        </h3>
        <p
          className="text-base sm:text-lg leading-relaxed"
          style={{ opacity: 0.75 }}
        >
          {algorithm.description}
        </p>
      </motion.section>

      {/* Steps */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="rounded-2xl p-6"
        style={{
          backgroundColor: "rgba(var(--foreground), 0.02)",
          border: "1px solid rgba(var(--foreground), 0.08)",
        }}
      >
        <h3
          className="text-xl font-semibold mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          <ListOrdered
            className="w-5 h-5"
            style={{ color: "rgb(141, 118, 233)" }}
          />
          How it Works
        </h3>

        <ol className="space-y-3" style={{ opacity: 0.85 }}>
          {algorithm.steps.map((step, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 + index * 0.04 }}
              className="flex gap-3"
            >
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-light"
                style={{
                  background: "rgba(141, 118, 233, 0.12)",
                  color: "rgb(141, 118, 233)",
                }}
              >
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </motion.li>
          ))}
        </ol>
      </motion.section>

      {/* Use Cases */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3
          className="text-xl font-semibold mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          <CheckCircle2
            className="w-5 h-5"
            style={{ color: "rgb(141, 118, 233)" }}
          />
          Common Use Cases
        </h3>

        <div className="grid gap-3">
          {algorithm.useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 + index * 0.04 }}
              className="rounded-xl p-4"
              style={{
                backgroundColor: "rgba(var(--foreground), 0.03)",
                border: "1px solid rgba(var(--foreground), 0.08)",
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5"
                  style={{ color: "rgb(141, 118, 233)" }}
                >
                  •
                </span>
                <p style={{ opacity: 0.85 }}>{useCase}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Quick Facts */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="rounded-2xl p-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(141, 118, 233, 0.10) 0%, rgba(200, 180, 255, 0.08) 100%)",
          border: "1px solid rgba(141, 118, 233, 0.18)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles
            className="w-5 h-5"
            style={{ color: "rgb(141, 118, 233)" }}
          />
          <h4
            className="text-lg font-semibold"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Quick Facts
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm" style={{ opacity: 0.7 }}>
              Category
            </p>
            <p className="mt-1" style={{ opacity: 0.9 }}>
              {algorithm.category}
            </p>
          </div>
          <div>
            <p className="text-sm" style={{ opacity: 0.7 }}>
              Time
            </p>
            <p className="mt-1 font-mono" style={{ opacity: 0.9 }}>
              {algorithm.timeComplexity}
            </p>
          </div>
          <div>
            <p className="text-sm" style={{ opacity: 0.7 }}>
              Space
            </p>
            <p className="mt-1 font-mono" style={{ opacity: 0.9 }}>
              {algorithm.spaceComplexity}
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
