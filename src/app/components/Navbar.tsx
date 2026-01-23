"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            {/* Mobile logo - always use algo.svg */}
            <Image
              src="/algo.svg"
              alt="AlgoRhythm Logo"
              width={140}
              height={32}
              className="h-8 w-auto sm:hidden"
            />
            {/* Desktop logo - theme-based */}
            {mounted && (
              <Image
                src={theme === "dark" ? "/algo-light.svg" : "/algo-dark.svg"}
                alt="AlgoRhythm Logo"
                width={140}
                height={32}
                className="hidden sm:block h-10 w-auto"
              />
            )}
            {!mounted && (
              <Image
                src="/algo-light.svg"
                alt="AlgoRhythm Logo"
                width={140}
                height={32}
                className="hidden sm:block h-10 w-auto"
              />
            )}
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[rgb(141,118,233)] dark:hover:text-[rgb(141,118,233)] transition-colors"
            >
              Features
            </a>
            <a
              href="#categories"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[rgb(141,118,233)] dark:hover:text-[rgb(141,118,233)] transition-colors"
            >
              Categories
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[rgb(141,118,233)] dark:hover:text-[rgb(141,118,233)] transition-colors"
            >
              About
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Get Started Button - Desktop Only */}
            <a
              href="/algorithms"
              className="hidden sm:block px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: "rgb(141, 118, 233)",
                color: "white",
                boxShadow: "0 0 20px rgba(141, 118, 233, 0.3)",
              }}
            >
              Get Started
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[rgb(141,118,233)] dark:hover:text-[rgb(141,118,233)] transition-colors py-2"
            >
              Features
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[rgb(141,118,233)] dark:hover:text-[rgb(141,118,233)] transition-colors py-2"
            >
              Categories
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[rgb(141,118,233)] dark:hover:text-[rgb(141,118,233)] transition-colors py-2"
            >
              About
            </a>
            <a
              href="/algorithms"
              className="block w-full px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 mt-2 text-center"
              style={{
                background: "rgb(141, 118, 233)",
                color: "white",
                boxShadow: "0 0 20px rgba(141, 118, 233, 0.3)",
              }}
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
