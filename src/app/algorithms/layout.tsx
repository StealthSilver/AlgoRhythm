import type { ReactNode } from "react";

import Navbar from "../components/sections/Navbar";
import Footer from "../components/sections/Footer";

export default function AlgorithmsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative flex-1 overflow-x-hidden">
      <Navbar
        linksOverride={[
          { name: "Explorer", href: "/algorithms" },
          { name: "Course", href: "/#categories" },
          { name: "Connect", href: "/#connect" },
        ]}
        activeLinkName="Explorer"
        ctaLabel="Subscribe"
        ctaHref="/#cta"
      />

      {/* Offset for fixed navbar: 4rem mobile, 5rem md+ */}
      <div className="pt-16 md:pt-20">{children}</div>

      <Footer />
    </main>
  );
}
