"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

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
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            {mounted && (
              <Image
                src={theme === "dark" ? "/algo-light.svg" : "/algo-dark.svg"}
                alt="AlgoRhythm Logo"
                width={180}
                height={40}
                className="h-10 w-auto"
              />
            )}
            {!mounted && (
              <Image
                src="/algo-light.svg"
                alt="AlgoRhythm Logo"
                width={180}
                height={40}
                className="h-10 w-auto"
              />
            )}
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
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

          {/* Right Section: Get Started */}
          <div className="flex items-center">
            {/* Get Started Button */}
            <button
              className="px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: "rgb(141, 118, 233)",
                color: "white",
                boxShadow: "0 0 20px rgba(141, 118, 233, 0.3)",
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
