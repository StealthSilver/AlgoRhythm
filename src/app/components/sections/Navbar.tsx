"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../ui/button";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Features", href: "/#features" },
  { name: "Categories", href: "/#categories" },
  { name: "About", href: "/#about" },
];

export default function Navbar() {
  const router = useRouter();
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      style={{
        backgroundColor: isScrolled
          ? "rgba(var(--background), 0.8)"
          : "transparent",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left side: Logo + Nav Links */}
          <div className="flex items-end gap-8">
            {/* Logo */}
            <a href="/#home" className="flex items-end flex-shrink-0">
              {/* Mobile logo - theme-based with dicon/licon */}
              {mounted && (
                <Image
                  src={theme === "dark" ? "/licon.svg" : "/dicon.svg"}
                  alt="AlgoRhythm Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6 sm:hidden"
                />
              )}
              {!mounted && (
                <Image
                  src="/dicon.svg"
                  alt="AlgoRhythm Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6 sm:hidden"
                />
              )}
              {/* Desktop logo - theme-based */}
              {mounted && (
                <Image
                  src={theme === "dark" ? "/algo-light.svg" : "/algo-dark.svg"}
                  alt="AlgoRhythm Logo"
                  width={110}
                  height={28}
                  className="hidden sm:block h-7 w-auto"
                />
              )}
              {!mounted && (
                <Image
                  src="/algo-light.svg"
                  alt="AlgoRhythm Logo"
                  width={110}
                  height={28}
                  className="hidden sm:block h-7 w-auto"
                />
              )}
            </a>

            {/* Desktop Navigation - Adjacent to Logo */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-sm font-medium transition-colors duration-300"
                  style={{
                    color: "rgb(var(--foreground))",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#8a4d98";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgb(var(--foreground))";
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
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

            {/* Get Started Button - Desktop */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block relative px-6 py-2 text-white text-sm font-semibold rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundColor: "#8a4d98",
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
              }}
              onClick={() => router.push("/algorithms")}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(138, 77, 152, 0.85)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#8a4d98";
              }}
            >
              {/* Metallic shine overlay */}
              <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-700 ease-out"></span>
              <span className="relative z-10">Get Started</span>
            </motion.button>

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
            className="md:hidden backdrop-blur-md"
            style={{
              backgroundColor: "rgba(var(--background), 0.95)",
              borderTop: "1px solid rgba(var(--foreground), 0.1)",
            }}
          >
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium transition-colors py-2"
                  style={{
                    color: "rgb(var(--foreground))",
                    fontWeight: 500,
                  }}
                >
                  {link.name}
                </a>
              ))}

              {/* Get Started Button in Mobile Menu */}
              <motion.button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/algorithms");
                }}
                className="relative px-6 py-3 text-white text-sm font-semibold rounded-lg overflow-hidden group cursor-pointer mt-2"
                style={{
                  backgroundColor: "#8a4d98",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
                }}
              >
                <span className="relative z-10">Get Started</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
