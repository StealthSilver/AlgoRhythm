"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { SiX } from "@icons-pack/react-simple-icons";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/StealthSilver/AlgoRhythm",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/rajat-saraswat-0491a3259/",
    label: "LinkedIn",
  },
  { icon: SiX, href: "https://x.com/silver_srs", label: "X" },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer
      id="connect"
      ref={ref}
      className="relative pt-24 pb-8"
      style={{
        fontFamily: "var(--font-outfit), sans-serif",
        backgroundColor: "rgb(var(--background))",
        borderTop: "1px solid rgba(var(--foreground), 0.1)",
      }}
    >
      <motion.div className="relative mx-auto max-w-7xl px-8 md:px-12">
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-md"
          >
            {mounted ? (
              <Image
                src={theme === "dark" ? "/algo-light.svg" : "/algo-dark.svg"}
                alt="AlgoRhythm Logo"
                width={130}
                height={32}
                className="mx-auto mb-4 h-8 w-auto"
              />
            ) : (
              <Image
                src="/algo-light.svg"
                alt="AlgoRhythm Logo"
                width={130}
                height={32}
                className="mx-auto mb-4 h-8 w-auto"
              />
            )}

            <p
              className="mb-6 text-sm leading-relaxed"
              style={{ opacity: 0.7 }}
            >
              Master algorithms through interactive visualizations. Learn,
              practice, and understand the way algorithms actually work.
            </p>

            <div className="flex items-center justify-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(var(--foreground), 0.05)",
                    border: "1px solid rgba(var(--foreground), 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(138, 77, 152, 0.12)";
                    e.currentTarget.style.borderColor =
                      "rgba(138, 77, 152, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(var(--foreground), 0.05)";
                    e.currentTarget.style.borderColor =
                      "rgba(var(--foreground), 0.1)";
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" style={{ opacity: 0.7 }} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
          style={{
            borderColor: "rgba(var(--foreground), 0.1)",
          }}
        >
          <p className="text-sm" style={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} AlgoRhythm. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm transition-colors duration-300"
              style={{ opacity: 0.6 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#8a4d98";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgb(var(--foreground))";
                e.currentTarget.style.opacity = "0.6";
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm transition-colors duration-300"
              style={{ opacity: 0.6 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#8a4d98";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgb(var(--foreground))";
                e.currentTarget.style.opacity = "0.6";
              }}
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
