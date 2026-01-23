"use client";

import { useParams } from "next/navigation";
import AlgorithmsNavbar from "../../components/AlgorithmsNavbar";
import AlgorithmsSidebar from "../../components/AlgorithmsSidebar";
import { algorithmData } from "@/app/data/algorithmData";

export default function AlgorithmPage() {
  const params = useParams();
  const slug = params.slug as string;

  const algorithm = algorithmData[slug];

  if (!algorithm) {
    return (
      <>
        <div className="flex-1 bg-white dark:bg-black">
          <AlgorithmsNavbar />
          <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
            <AlgorithmsSidebar isOpen={true} selectedSlug={slug} />
            <main className="flex-1 ml-72">
              <div className="p-8 sm:p-10 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background:
                        "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(200, 180, 255) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Algorithm Not Found
                  </h1>
                  <p
                    className="text-lg text-gray-600 dark:text-gray-400"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    The algorithm you're looking for doesn't exist.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full px-8 py-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <p
            className="text-center text-sm text-gray-600 dark:text-gray-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            © {new Date().getFullYear()} AlgoRhythm. All rights reserved.
          </p>
        </footer>
      </>
    );
  }

  return (
    <>
      <div className="flex-1 bg-white dark:bg-black">
        <AlgorithmsNavbar />
        <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
          <AlgorithmsSidebar isOpen={true} selectedSlug={slug} />
          <main className="flex-1 ml-72">
            <div className="p-8 sm:p-10 md:p-12">
              <div className="max-w-4xl mx-auto">
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background:
                      "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(200, 180, 255) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {algorithm.name}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      background: "rgba(141, 118, 233, 0.1)",
                      color: "rgb(141, 118, 233)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {algorithm.category}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(141, 118, 233, 0.15)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Time: {algorithm.timeComplexity}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(141, 118, 233, 0.15)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Space: {algorithm.spaceComplexity}
                  </span>
                </div>

                {/* Description */}
                <section className="mb-8">
                  <h2
                    className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    Description
                  </h2>
                  <p
                    className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {algorithm.description}
                  </p>
                </section>

                {/* How it Works */}
                <section className="mb-8">
                  <h2
                    className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    How it Works
                  </h2>
                  <ol className="space-y-3">
                    {algorithm.steps.map((step, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-gray-600 dark:text-gray-400"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold"
                          style={{
                            background: "rgba(141, 118, 233, 0.1)",
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

                {/* Use Cases */}
                <section className="mb-8">
                  <h2
                    className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    Use Cases
                  </h2>
                  <ul className="space-y-2">
                    {algorithm.useCases.map((useCase, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        <span className="text-[rgb(141,118,233)] mt-1">•</span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Visualization Placeholder */}
                <section className="mb-8">
                  <h2
                    className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    Visualization
                  </h2>
                  <div
                    className="rounded-2xl p-12 flex items-center justify-center"
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(141, 118, 233, 0.15)",
                    }}
                  >
                    <p
                      className="text-gray-500 dark:text-gray-400"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Interactive visualization coming soon...
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-8 py-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <p
          className="text-center text-sm text-gray-600 dark:text-gray-400"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          © {new Date().getFullYear()} AlgoRhythm. All rights reserved.
        </p>
      </footer>
    </>
  );
}
