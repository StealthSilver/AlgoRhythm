"use client";

import Image from "next/image";
import { Github, Twitter } from "lucide-react";

export default function AlgorithmsNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-full mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left section with logo and navigation links */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <Image
                src="/algo.svg"
                alt="AlgoRhythm Logo"
                width={140}
                height={32}
                className="h-8 sm:h-10 w-auto"
              />
            </a>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="/"
                className="text-gray-700 dark:text-gray-200 hover:text-[rgb(141,118,233)] transition-colors duration-300 text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-200 hover:text-[rgb(141,118,233)] transition-colors duration-300 text-sm font-medium"
              >
                Show
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-200 hover:text-[rgb(141,118,233)] transition-colors duration-300 text-sm font-medium"
              >
                Explore
              </a>
            </div>
          </div>

          {/* Right section - Social Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/StealthSilver/AlgoRhythm"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="GitHub"
            >
              <Github
                className="w-5 h-5 text-gray-700 dark:text-gray-200"
                strokeWidth={1.5}
              />
            </a>
            <a
              href="https://x.com/silver_srs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter
                className="w-5 h-5 text-gray-700 dark:text-gray-200"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
