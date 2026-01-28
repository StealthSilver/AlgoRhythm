"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Categories", href: "#categories" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center">
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
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[rgb(141,118,233)] dark:hover:text-[rgb(141,118,233)] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {mounted && (
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            <a
              href="/algorithms"
              className="hidden md:inline-flex px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: "rgb(141, 118, 233)",
                color: "white",
                boxShadow: "0 0 20px rgba(141, 118, 233, 0.3)",
              }}
            >
              Get Started
            </a>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 dark:bg-black/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[rgb(141,118,233)] dark:hover:text-[rgb(141,118,233)] transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/algorithms"
                className="w-full px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 mt-2 text-center"
                style={{
                  background: "rgb(141, 118, 233)",
                  color: "white",
                  boxShadow: "0 0 20px rgba(141, 118, 233, 0.3)",
                }}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
