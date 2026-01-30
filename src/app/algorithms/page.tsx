import Link from "next/link";
import AlgorithmsSidebar from "../components/AlgorithmsSidebar";

export default function AlgorithmsPage() {
  const algorithmCards = [
    { name: "Bubble Sort", slug: "bubble-sort" },
    { name: "Quick Sort", slug: "quick-sort" },
    { name: "Merge Sort", slug: "merge-sort" },
    { name: "Binary Search", slug: "binary-search" },
    { name: "Linear Search", slug: "linear-search" },
    { name: "DFS", slug: "dfs" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
      <AlgorithmsSidebar isOpen={true} />

      <main className="flex-1 md:ml-72">
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-10 md:py-14">
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
            Algorithm Explorer
          </h1>
          <p className="text-base sm:text-lg mb-8" style={{ opacity: 0.7 }}>
            Choose an algorithm from the sidebar to begin exploring.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithmCards.map((algo) => (
              <Link
                key={algo.slug}
                href={`/algorithms/${algo.slug}`}
                className="group relative p-6 rounded-2xl backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.03)",
                  border: "1px solid rgba(var(--foreground), 0.1)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at top left, rgba(138, 77, 152, 0.12) 0%, transparent 70%)",
                  }}
                />
                <div className="relative z-10">
                  <h3
                    className="text-xl font-light mb-2"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {algo.name}
                  </h3>
                  <p className="text-sm" style={{ opacity: 0.7 }}>
                    Click to explore and visualize.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
