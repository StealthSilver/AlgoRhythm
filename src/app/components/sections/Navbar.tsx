"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  { name: "Students", href: "/#students" },
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

const navLinkClass =
  "text-[13px] font-medium leading-none text-[#e6e6e6]/90 transition-colors duration-150 hover:text-white";

export default function Navbar({
  linksOverride,
  activeLinkName,
  ctaLabel = "Start Learning",
  ctaHref = "/algorithms",
}: NavbarProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = linksOverride ?? defaultNavLinks;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[rgb(var(--background))]/95 backdrop-blur-md relative">
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-5"
        aria-label="Main"
      >
        <Link
          href="/#home"
          className="inline-flex shrink-0 items-center"
          aria-label="Navigate to home"
        >
          <span className="inline-flex items-center gap-2 sm:hidden">
            <Image
              src="/licon.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
              aria-hidden
            />
            <span
              className="text-[15px] font-semibold tracking-tight text-[#e6e6e6]"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              AlgoRhythm
            </span>
          </span>
          {mounted ? (
            <Image
              src="/algo-light.svg"
              alt="AlgoRhythm Logo"
              width={110}
              height={28}
              className="hidden h-7 w-auto sm:block"
            />
          ) : (
            <Image
              src="/algo-light.svg"
              alt="AlgoRhythm Logo"
              width={110}
              height={28}
              className="hidden h-7 w-auto sm:block"
            />
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
                  activeLinkName === link.name && "text-white",
                )}
                aria-current={activeLinkName === link.name ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </li>

          <li className="flex items-center gap-2.5 lg:gap-3">
            <NavbarCtaButton
              label={ctaLabel}
              onClick={() => router.push(ctaHref)}
            />
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#e6e6e6]/75 transition-colors duration-150 hover:bg-white/10 hover:text-white"
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="absolute top-full right-0 left-0 z-50 overflow-hidden border-t border-white/[0.08] bg-[rgb(var(--background))]/95 shadow-lg shadow-black/25 backdrop-blur-md md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col items-end gap-1 px-4 py-4 text-right sm:px-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "rounded-md px-2 py-2.5 text-right text-[13px] font-medium text-[#e6e6e6]/90 transition-colors duration-150 hover:bg-white/5 hover:text-white",
                    activeLinkName === link.name && "text-white",
                  )}
                  aria-current={
                    activeLinkName === link.name ? "page" : undefined
                  }
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
