"use client";

import AlgorithmsNavbar from "../components/AlgorithmsNavbar";
import AlgorithmsSidebar from "../components/AlgorithmsSidebar";

export default function AlgorithmsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black max-w-7xl mx-auto">
      <AlgorithmsNavbar />
      <div className="flex pt-16">
        <AlgorithmsSidebar isOpen={true} />
        <main className="flex-1 ml-72">
          <div className="p-8 sm:p-10 md:p-12">
            <div className="max-w-7xl mx-auto">
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
                Algorithm Explorer
              </h1>
              <p
                className="text-lg text-gray-600 dark:text-gray-400 mb-8"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Choose an algorithm from the sidebar to begin exploring
              </p>

              {/* Placeholder content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Bubble Sort",
                  "Quick Sort",
                  "Merge Sort",
                  "Binary Search",
                  "Linear Search",
                  "DFS",
                ].map((algo, index) => (
                  <div
                    key={index}
                    className="group relative p-6 rounded-2xl backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-xl"
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(141, 118, 233, 0.15)",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle at top left, rgba(141, 118, 233, 0.08) 0%, transparent 70%)",
                      }}
                    />
                    <div className="relative z-10">
                      <h3
                        className="text-xl font-semibold mb-2 text-gray-900 dark:text-white"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        {algo}
                      </h3>
                      <p
                        className="text-gray-600 dark:text-gray-400 text-sm"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        Click to explore and visualize
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
