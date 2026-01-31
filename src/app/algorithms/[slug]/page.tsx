"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import AlgorithmsSidebar from "../../components/AlgorithmsSidebar";
import { algorithmData } from "@/app/data/algorithmData";

export default function AlgorithmPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const algorithm = algorithmData[slug];

  if (!algorithm) {
    return (
      <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 lg:gap-10 items-start">
            <div className="hidden md:block">
              <AlgorithmsSidebar
                isOpen={true}
                visibilityClassName="block"
                selectedSlug={slug}
                className="md:sticky md:top-6 h-[calc(100vh-9.5rem)] md:h-[calc(100vh-11rem)]"
              />
            </div>

            <main className="min-w-0">
              <div className="md:hidden mb-4">
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(true)}
                  className="w-full rounded-xl px-4 py-3 text-sm font-medium flex items-center justify-between"
                  style={{
                    backgroundColor: "rgba(var(--foreground), 0.04)",
                    border: "1px solid rgba(var(--foreground), 0.08)",
                  }}
                  aria-label="Open algorithm list"
                >
                  <span style={{ opacity: 0.9 }}>Browse algorithms</span>
                  <span style={{ opacity: 0.6 }}>Tap to open</span>
                </button>
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-light mb-4"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  background:
                    "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(200, 180, 255) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Algorithm Not Found
              </h1>
              <p className="text-base sm:text-lg" style={{ opacity: 0.7 }}>
                The algorithm you're looking for doesn't exist.
              </p>
            </main>
          </div>
        </div>

        {/* Mobile sidebar drawer */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <button
              type="button"
              className="absolute inset-0"
              onClick={() => setMobileSidebarOpen(false)}
              aria-label="Close algorithm list"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
            />
            <div className="absolute inset-y-0 left-0 w-[88vw] max-w-90 p-4">
              <AlgorithmsSidebar
                isOpen={true}
                mode="drawer"
                visibilityClassName="block"
                selectedSlug={slug}
                className="h-[calc(100vh-2rem)]"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 lg:gap-10 items-start">
          <div className="hidden md:block">
            <AlgorithmsSidebar
              isOpen={true}
              visibilityClassName="block"
              selectedSlug={slug}
              className="md:sticky md:top-6 h-[calc(100vh-9.5rem)] md:h-[calc(100vh-11rem)]"
            />
          </div>

          <main className="min-w-0">
            <div className="md:hidden mb-4">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="w-full rounded-xl px-4 py-3 text-sm font-medium flex items-center justify-between"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.04)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
                aria-label="Open algorithm list"
              >
                <span style={{ opacity: 0.9 }}>Browse algorithms</span>
                <span style={{ opacity: 0.6 }}>Tap to open</span>
              </button>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-light mb-4"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                background:
                  "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(200, 180, 255) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {algorithm.name}
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  background: "rgba(141, 118, 233, 0.12)",
                  color: "rgb(141, 118, 233)",
                }}
              >
                {algorithm.category}
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.04)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                  opacity: 0.9,
                }}
              >
                Time: {algorithm.timeComplexity}
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.04)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                  opacity: 0.9,
                }}
              >
                Space: {algorithm.spaceComplexity}
              </span>
            </div>

            <section className="mb-10">
              <h2
                className="text-2xl font-medium mb-3"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                }}
              >
                Description
              </h2>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ opacity: 0.75 }}
              >
                {algorithm.description}
              </p>
            </section>

            <section className="mb-10">
              <h2
                className="text-2xl font-medium mb-4"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                }}
              >
                How it Works
              </h2>
              <ol className="space-y-3" style={{ opacity: 0.8 }}>
                {algorithm.steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
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
                  </li>
                ))}
              </ol>
            </section>

            <section className="mb-10">
              <h2
                className="text-2xl font-medium mb-4"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                }}
              >
                Use Cases
              </h2>
              <ul className="space-y-2" style={{ opacity: 0.8 }}>
                {algorithm.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span
                      style={{ color: "rgb(141, 118, 233)" }}
                      className="mt-1"
                    >
                      •
                    </span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2
                className="text-2xl font-medium mb-4"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                }}
              >
                Visualization
              </h2>
              <div
                className="rounded-2xl p-12 flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.03)",
                  border: "1px solid rgba(var(--foreground), 0.1)",
                }}
              >
                <p style={{ opacity: 0.7 }}>
                  Interactive visualization coming soon...
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close algorithm list"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
          />
          <div className="absolute inset-y-0 left-0 w-[88vw] max-w-90 p-4">
            <AlgorithmsSidebar
              isOpen={true}
              mode="drawer"
              visibilityClassName="block"
              selectedSlug={slug}
              className="h-[calc(100vh-2rem)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
