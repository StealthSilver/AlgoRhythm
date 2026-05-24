"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "../../context/ThemeContext";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

type NavbarLink = { name: string; href: string };

interface NavbarProps {
  linksOverride?: NavbarLink[];
  activeLinkName?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const defaultNavLinks: NavbarLink[] = [
  { name: "Need", href: "/#need" },
  { name: "Features", href: "/#features" },
  { name: "Library", href: "/#library" },
  { name: "Students", href: "/learn" },
  { name: "Contact", href: "/#connect" },
];

const ctaButtonClass =
  "group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-full px-3.5 text-[13px] font-medium leading-none text-white transition-colors duration-150";

const ctaButtonStyle = {
  backgroundColor: "#8a4d98",
  boxShadow:
    "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
} as const;

function NavbarCtaButton({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(ctaButtonClass, className)}
      style={ctaButtonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(138, 77, 152, 0.85)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#8a4d98";
      }}
    >
      <span className="absolute inset-y-0 -left-full w-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-out group-hover:left-full" />
      <span className="relative z-10">{label}</span>
    </button>
  );
}

export default function Navbar({
  linksOverride,
  activeLinkName,
  ctaLabel = "Start Learning",
  ctaHref = "/algorithms",
}: NavbarProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const navLinks = linksOverride ?? defaultNavLinks;

  const themeToggleClassName = cn(
    "inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-150",
    isDark
      ? "text-[#e6e6e6]/75 hover:bg-white/10 hover:text-white"
      : "text-[#1a1a1a]/75 hover:bg-black/5 hover:text-[#0e0e10]",
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinkClass = cn(
    "text-[13px] font-medium leading-none transition-colors duration-150",
    isDark
      ? "text-[#e6e6e6]/90 hover:text-white"
      : "text-[#1a1a1a]/80 hover:text-[#0e0e10]",
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        isDark
          ? "border-white/[0.08] bg-[rgb(var(--background))]/95 backdrop-blur-md"
          : "border-black/[0.08] bg-[rgb(var(--background))]/95 backdrop-blur-md",
      )}
    >
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-5"
        aria-label="Main"
      >
        <Link
          href="/#home"
          className="inline-flex shrink-0 items-center"
          aria-label="Navigate to home"
        >
          {mounted ? (
            <>
              <Image
                src={isDark ? "/licon.svg" : "/dicon.svg"}
                alt="AlgoRhythm Logo"
                width={20}
                height={20}
                className="h-5 w-5 sm:hidden"
              />
              <Image
                src={isDark ? "/algo-light.svg" : "/algo-dark.svg"}
                alt="AlgoRhythm Logo"
                width={110}
                height={28}
                className="hidden sm:block h-7 w-auto"
              />
            </>
          ) : (
            <>
              <Image
                src="/licon.svg"
                alt="AlgoRhythm Logo"
                width={20}
                height={20}
                className="h-5 w-5 sm:hidden"
              />
              <Image
                src="/algo-light.svg"
                alt="AlgoRhythm Logo"
                width={110}
                height={28}
                className="hidden sm:block h-7 w-auto"
              />
            </>
          )}
        </Link>

        <ul className="hidden min-w-0 flex-1 items-center justify-end gap-4 md:flex lg:gap-5">
          <li className="flex items-center gap-4 lg:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  navLinkClass,
                  activeLinkName === link.name &&
                    (isDark ? "text-white" : "text-[#0e0e10]"),
                )}
                aria-current={activeLinkName === link.name ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </li>

          <li
            className={cn(
              "h-4 w-px",
              isDark ? "bg-white/15" : "bg-black/15",
            )}
            aria-hidden
          />

          <li className="flex items-center gap-2.5 lg:gap-3">
            <AnimatedThemeToggler className={themeToggleClassName} />
            <NavbarCtaButton
              label={ctaLabel}
              onClick={() => router.push(ctaHref)}
            />
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <AnimatedThemeToggler className={themeToggleClassName} />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-150",
              isDark
                ? "text-[#e6e6e6]/75 hover:bg-white/10 hover:text-white"
                : "text-[#1a1a1a]/75 hover:bg-black/5 hover:text-[#0e0e10]",
            )}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className={cn(
            "border-t md:hidden",
            isDark
              ? "border-white/[0.08] bg-[rgb(var(--background))]"
              : "border-black/[0.08] bg-[rgb(var(--background))]",
          )}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "rounded-md px-2 py-2.5 text-[13px] font-medium transition-colors duration-150",
                  isDark
                    ? "text-[#e6e6e6]/90 hover:bg-white/5 hover:text-white"
                    : "text-[#1a1a1a]/80 hover:bg-black/5 hover:text-[#0e0e10]",
                  activeLinkName === link.name &&
                    (isDark ? "text-white" : "text-[#0e0e10]"),
                )}
                aria-current={activeLinkName === link.name ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
            <NavbarCtaButton
              label={ctaLabel}
              className="mt-2 w-fit"
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push(ctaHref);
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}
