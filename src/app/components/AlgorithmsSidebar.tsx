"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
} from "lucide-react";

import {
  libraryCategories,
  libraryCategoryIconMap,
  type LibraryCategory,
} from "@/app/data/algorithmLibrary";
import { cn } from "@/lib/utils";

interface AlgorithmsSidebarProps {
  isOpen: boolean;
  selectedSlug?: string;
  className?: string;
  visibilityClassName?: string;
  mode?: "desktop" | "drawer";
  onSelectAlgorithm?: (slug: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function AlgorithmsSidebar({
  isOpen,
  selectedSlug,
  className,
  visibilityClassName = "hidden md:block",
  mode = "desktop",
  onSelectAlgorithm,
  isCollapsed = false,
  onToggleCollapse,
}: AlgorithmsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const isSearching = searchQuery.trim().length > 0;
  const expandedWidth = 320;
  const collapsedWidth = 72;
  const categories: LibraryCategory[] = libraryCategories;
  const categoryIconMap = libraryCategoryIconMap;

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;

    return categories
      .map((category) => {
        const algorithms = category.algorithms.filter((algo) =>
          algo.name.toLowerCase().includes(q),
        );
        return { ...category, algorithms };
      })
      .filter((category) => category.algorithms.length > 0);
  }, [categories, searchQuery]);

  // Find category containing selected algorithm
  const selectedCategory = useMemo(() => {
    if (!selectedSlug) return null;
    return categories.find((category) =>
      category.algorithms.some((algo) => algo.slug === selectedSlug),
    );
  }, [selectedSlug]);

  // Initialize expanded categories with selected category
  const [expandedCategories, setExpandedCategories] = useState<string[]>(() => {
    if (selectedCategory) {
      return [selectedCategory.name];
    }
    return ["Arrays & Basic Operations"];
  });

  // Update expanded categories when selection changes
  useEffect(() => {
    if (
      selectedCategory &&
      !expandedCategories.includes(selectedCategory.name)
    ) {
      setExpandedCategories((prev) => [...prev, selectedCategory.name]);
    }
  }, [selectedCategory]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    );
  };

  const widthAnimation =
    mode === "desktop"
      ? { width: isCollapsed ? collapsedWidth : expandedWidth }
      : undefined;

  return (
    <motion.aside
      className={cn(
        visibilityClassName,
        "custom-scrollbar overflow-y-auto",
        "relative rounded-2xl backdrop-blur-md",
        mode === "desktop" ? "will-change-[width]" : undefined,
        mode === "drawer" ? "w-full" : undefined,
        className,
      )}
      animate={widthAnimation}
      transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.9 }}
      style={{
        width: mode === "drawer" ? "100%" : undefined,
        background:
          "linear-gradient(180deg, rgba(141, 118, 233, 0.10) 0%, rgba(138, 77, 152, 0.06) 100%)",
        border: "1px solid rgba(var(--foreground), 0.08)",
        boxShadow: "0 18px 50px rgba(0, 0, 0, 0.18)",
      }}
    >
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(211, 222, 233, 0.16);
          border-radius: 9999px;
          border: 2px solid transparent;
          background-clip: padding-box;
          transition: background-color 0.2s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(211, 222, 233, 0.28);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(211, 222, 233, 0.18) transparent;
        }
      `}</style>
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(141, 118, 233, 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative p-4">
        <div className={cn("mb-4", isCollapsed ? "space-y-3" : "space-y-3")}>
          <div
            className={cn(
              "flex items-center",
              isCollapsed ? "justify-center" : "justify-between",
            )}
          >
            {!isCollapsed && (
              <h2
                className="text-sm font-semibold tracking-wide"
                style={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  color: "rgb(var(--foreground))",
                }}
              >
                Algorithms
              </h2>
            )}

            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                className={cn(
                  "rounded-xl p-2 transition-colors",
                  isCollapsed ? "" : "ml-3",
                )}
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.04)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(138, 77, 152, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(var(--foreground), 0.04)";
                }}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" style={{ opacity: 0.85 }} />
                ) : (
                  <ChevronLeft className="w-4 h-4" style={{ opacity: 0.85 }} />
                )}
              </button>
            )}
          </div>

          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                key="sidebar-search"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                className="rounded-xl px-3 py-2 flex items-center gap-2"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.04)",
                  border: "1px solid rgba(var(--foreground), 0.08)",
                }}
              >
                <Search className="w-4 h-4" style={{ opacity: 0.75 }} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search algorithms..."
                  className="w-full bg-transparent outline-none text-sm"
                  style={{ color: "rgb(var(--foreground))" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {isCollapsed ? (
            <motion.nav
              key="collapsed-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-2"
            >
              {filteredCategories.map((category) => {
                const Icon = categoryIconMap[category.name] ?? Sparkles;
                return (
                  <button
                    key={category.name}
                    type="button"
                    className="w-full flex items-center justify-center rounded-xl p-3 transition-colors"
                    style={{
                      backgroundColor: "rgba(var(--foreground), 0.03)",
                      border: "1px solid rgba(var(--foreground), 0.08)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(138, 77, 152, 0.10)";
                      e.currentTarget.style.borderColor =
                        "rgba(138, 77, 152, 0.22)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(var(--foreground), 0.03)";
                      e.currentTarget.style.borderColor =
                        "rgba(var(--foreground), 0.08)";
                    }}
                    onClick={() => {
                      // Expand and focus this category
                      onToggleCollapse?.();
                      setExpandedCategories([category.name]);
                    }}
                    aria-label={category.name}
                    title={category.name}
                  >
                    <Icon className="w-5 h-5" style={{ opacity: 0.9 }} />
                  </button>
                );
              })}
            </motion.nav>
          ) : (
            <motion.nav
              key="expanded-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-2"
            >
              {filteredCategories.length === 0 && isSearching ? (
                <div
                  className="rounded-xl px-3 py-3 text-sm"
                  style={{
                    backgroundColor: "rgba(var(--foreground), 0.03)",
                    border: "1px solid rgba(var(--foreground), 0.08)",
                    color: "rgb(var(--foreground))",
                    opacity: 0.8,
                  }}
                >
                  No matching algorithms.
                  <button
                    type="button"
                    className="ml-2 underline underline-offset-2"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </button>
                </div>
              ) : null}

              {filteredCategories.map((category) => {
                const isExpanded =
                  isSearching || expandedCategories.includes(category.name);
                const Icon = categoryIconMap[category.name] ?? Sparkles;

                return (
                  <div
                    key={category.name}
                    className="rounded-xl"
                    style={{
                      backgroundColor: "rgba(var(--background), 0.28)",
                      boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {/* Category Header */}
                    <button
                      onClick={() => {
                        if (isSearching) return;
                        toggleCategory(category.name);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                      style={{
                        fontFamily: "var(--font-outfit), sans-serif",
                        color: "rgb(var(--foreground))",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(138, 77, 152, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <span
                        className="flex items-center gap-2 text-[13px]"
                        style={{ opacity: 0.9 }}
                      >
                        <Icon className="w-4 h-4" style={{ opacity: 0.85 }} />
                        {category.name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-0" : "-rotate-90"}`}
                        style={{ opacity: 0.75 }}
                      />
                    </button>

                    {/* Algorithm List */}
                    <div
                      className={`px-2 pb-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "max-h-96 opacity-100 mt-1"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {category.algorithms.map((algorithm) => {
                        const isSelected = selectedSlug === algorithm.slug;

                        if (onSelectAlgorithm) {
                          return (
                            <button
                              key={algorithm.slug}
                              type="button"
                              onClick={() => onSelectAlgorithm(algorithm.slug)}
                              className={cn(
                                "block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                                "text-[rgb(var(--foreground))] opacity-70",
                                "hover:text-[rgb(141,118,233)] hover:bg-[rgba(141,118,233,0.08)] hover:opacity-100",
                                isSelected &&
                                  "text-[rgb(141,118,233)] bg-[rgba(141,118,233,0.12)] opacity-100",
                              )}
                              style={{
                                fontFamily: "var(--font-outfit), sans-serif",
                              }}
                            >
                              {algorithm.name}
                            </button>
                          );
                        }

                        return (
                          <Link
                            key={algorithm.slug}
                            href={`/algorithms/${algorithm.slug}`}
                            className={cn(
                              "block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                              "text-[rgb(var(--foreground))] opacity-70 visited:text-[rgb(var(--foreground))]",
                              "hover:text-[rgb(141,118,233)] hover:bg-[rgba(141,118,233,0.08)] hover:opacity-100",
                              isSelected &&
                                "text-[rgb(141,118,233)] bg-[rgba(141,118,233,0.12)] opacity-100",
                            )}
                            style={{
                              fontFamily: "var(--font-outfit), sans-serif",
                            }}
                          >
                            {algorithm.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
