"use client";

import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 sm:py-16 px-4 sm:px-6 border-t border-[rgba(141,118,233,0.2)] bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-10 md:gap-8">
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <h3
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background:
                  "linear-gradient(135deg, rgb(141, 118, 233) 0%, rgb(200, 180, 255) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AlgoRhythm
            </h3>
            <p
              className="text-gray-600 dark:text-white/60 text-sm"
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Where Algorithms Find Their Flow
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
            <div>
              <h4
                className="text-[rgb(141,118,233)] font-semibold mb-3 text-sm uppercase tracking-wider"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Learn
              </h4>
              <ul className="space-y-2">
                {[
                  "Algorithms",
                  "Data Structures",
                  "Visualizations",
                  "Documentation",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-white/60 hover:text-[rgb(141,118,233)] transition-colors duration-300 text-sm"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="text-[rgb(141,118,233)] font-semibold mb-3 text-sm uppercase tracking-wider"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Resources
              </h4>
              <ul className="space-y-2">
                {["Blog", "Tutorials", "Examples", "Community"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-white/60 hover:text-[rgb(141,118,233)] transition-colors duration-300 text-sm"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="text-[rgb(141,118,233)] font-semibold mb-3 text-sm uppercase tracking-wider"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Connect
              </h4>
              <ul className="space-y-2">
                {["GitHub", "Twitter", "Discord", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-white/60 hover:text-[rgb(141,118,233)] transition-colors duration-300 text-sm"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[rgba(141,118,233,0.1)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <p
              className="text-gray-500 dark:text-white/40 text-xs sm:text-sm text-center md:text-left"
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              © {currentYear} AlgoRhythm. Crafted with precision and flow.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://github.com/StealthSilver/AlgoRhythm"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-[rgb(141,118,233)]/10 transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github
                  className="w-5 h-5 text-gray-600 dark:text-white/60 group-hover:text-[rgb(141,118,233)] transition-colors"
                  strokeWidth={1.5}
                />
              </a>
              <a
                href="https://x.com/silver_srs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-[rgb(141,118,233)]/10 transition-all duration-300 group"
                aria-label="X (Twitter)"
              >
                <Twitter
                  className="w-5 h-5 text-gray-600 dark:text-white/60 group-hover:text-[rgb(141,118,233)] transition-colors"
                  strokeWidth={1.5}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/rajat-saraswat-0491a3259/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-[rgb(141,118,233)]/10 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin
                  className="w-5 h-5 text-gray-600 dark:text-white/60 group-hover:text-[rgb(141,118,233)] transition-colors"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
