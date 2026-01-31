"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import type {
  Algorithm,
  AlgorithmCodeLanguage,
} from "@/app/data/algorithmData";
import { CodeEditor } from "@/app/components/ui/CodeEditor";

interface CodeTabProps {
  algorithm: Algorithm;
}

const LANGS: Array<{
  id: AlgorithmCodeLanguage;
  label: string;
  ext: string;
}> = [
  { id: "cpp", label: "C++", ext: "cpp" },
  { id: "python", label: "Python", ext: "py" },
  { id: "java", label: "Java", ext: "java" },
];

export function CodeTab({ algorithm }: CodeTabProps) {
  const available = useMemo(() => {
    return LANGS.filter((l) => Boolean(algorithm.code?.[l.id]));
  }, [algorithm.code]);

  const defaultLang = available[0]?.id ?? "cpp";
  const [activeLang, setActiveLang] =
    useState<AlgorithmCodeLanguage>(defaultLang);

  const active = LANGS.find((l) => l.id === activeLang) ?? LANGS[0];
  const code = algorithm.code?.[activeLang] ?? "";

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "rgba(var(--foreground), 0.02)",
          border: "1px solid rgba(var(--foreground), 0.08)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-2"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Code
        </h3>
        <p className="text-sm" style={{ opacity: 0.7 }}>
          Reference implementations in C++, Python, and Java. (Sorting
          algorithms are filled in first.)
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {LANGS.map((lang) => {
            const isActive = activeLang === lang.id;
            const isAvailable = Boolean(algorithm.code?.[lang.id]);

            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => isAvailable && setActiveLang(lang.id)}
                disabled={!isAvailable}
                className="px-3 py-1.5 rounded-lg text-sm transition"
                style={
                  isActive
                    ? {
                        background: "rgba(141, 118, 233, 0.14)",
                        border: "1px solid rgba(141, 118, 233, 0.22)",
                        color: "rgb(141,118,233)",
                      }
                    : {
                        backgroundColor: "rgba(var(--foreground), 0.04)",
                        border: "1px solid rgba(var(--foreground), 0.10)",
                        opacity: isAvailable ? 0.75 : 0.35,
                        cursor: isAvailable ? "pointer" : "not-allowed",
                      }
                }
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {available.length === 0 ? (
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "rgba(var(--foreground), 0.02)",
            border: "1px solid rgba(var(--foreground), 0.08)",
          }}
        >
          <p className="text-sm" style={{ opacity: 0.75 }}>
            Code for this algorithm is coming soon.
          </p>
        </div>
      ) : (
        <motion.div
          key={activeLang}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <CodeEditor
            code={code}
            language={activeLang}
            languageLabel={active.label}
            fileName={`${algorithm.slug}.${active.ext}`}
          />
        </motion.div>
      )}
    </div>
  );
}
