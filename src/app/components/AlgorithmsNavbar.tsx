"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Explore", href: "/algorithms" },
  { name: "Compare", href: "/compare" },
  { name: "Learn", href: "/learn" },
  { name: "Coming Soon", href: "/coming-soon" },
];

export default function AlgorithmsNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="max-w-full mx-auto px-8 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: Logo */}
          <div className="flex items-end gap-8">
            <Link href="/" className="flex items-end shrink-0">
              {/* Mobile logo - theme-based */}
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
            </Link>

            {/* Center nav - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors"
                    style={{
                      color: "rgb(var(--foreground))",
                      opacity: isActive ? 1 : 0.7,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.color = "#8a4d98";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = isActive ? "1" : "0.7";
                      e.currentTarget.style.color = isActive
                        ? "#8a4d98"
                        : "rgb(var(--foreground))";
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="algorithms-navbar-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                        style={{ backgroundColor: "#8a4d98" }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden"
              aria-label="Toggle theme"
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

            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="hidden sm:block relative px-5 py-2 text-white text-sm font-semibold rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundColor: "#8a4d98",
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
              }}
              onClick={() => router.push("/#cta")}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(138, 77, 152, 0.85)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#8a4d98";
              }}
            >
              <span className="absolute inset-y-0 -left-full w-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-700 ease-out" />
              <span className="relative z-10">Subscribe</span>
            </motion.button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
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
            <div className="max-w-full mx-auto px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(138, 77, 152, 0.12)"
                        : "transparent",
                      color: isActive ? "#8a4d98" : "rgb(var(--foreground))",
                      opacity: isActive ? 1 : 0.8,
                      border: isActive
                        ? "1px solid rgba(138, 77, 152, 0.25)"
                        : "1px solid transparent",
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <motion.button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/#cta");
                }}
                className="relative px-6 py-3 text-white text-sm font-semibold rounded-lg overflow-hidden group cursor-pointer mt-3"
                style={{
                  backgroundColor: "#8a4d98",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
                }}
              >
                <span className="relative z-10">Subscribe</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
