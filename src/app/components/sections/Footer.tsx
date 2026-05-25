"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Github } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/StealthSilver/AlgoRhythm",
    label: "GitHub",
  },
  { icon: SiX, href: "https://x.com/silver_srs", label: "X" },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer
      id="connect"
      className="relative overflow-hidden pt-8 pb-20 sm:pt-10 sm:pb-24 md:pt-12 md:pb-28 lg:pt-14 lg:pb-32"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <div ref={ref} className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 w-full max-w-7xl px-4 sm:mb-14 md:mb-16 sm:px-5"
        >
          <p className="max-w-3xl text-xl font-extralight leading-snug tracking-tight sm:text-2xl md:text-3xl">
            Keep building{" "}
            <span style={{ color: "#8a4d98" }}>algorithm intuition</span>
          </p>
        </motion.div>

        <div aria-hidden className="landing-border w-full border-t" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-10"
        >
          <Image
            src="/algo-light.svg"
            alt="AlgoRhythm Logo"
            width={130}
            height={32}
            className="h-7 w-auto sm:h-8"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="flex items-center gap-3"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.18 + index * 0.05 }}
                className="landing-icon-box flex h-10 w-10 items-center justify-center rounded-lg text-neutral-200 transition-[border-color] duration-200 hover:border-white"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" strokeWidth={1.5} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="landing-border w-full border-t"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4 px-4 pt-8 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:pt-10"
        >
          <p className="landing-muted text-sm font-extralight tracking-wide">
            © {new Date().getFullYear()} AlgoRhythm. All rights reserved.
          </p>

          <p className="text-sm font-extralight tracking-wide">
            <span className="landing-muted">Built by </span>
            <a
              href="https://silverstudios.art"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#e6e6e6]/90 underline-offset-2 transition-[text-decoration] duration-150 hover:underline"
            >
              Silver Studios
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
