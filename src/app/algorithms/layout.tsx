import type { ReactNode } from "react";

import AlgorithmsNavbar from "../components/AlgorithmsNavbar";
import Footer from "../components/sections/Footer";

export default function AlgorithmsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative flex-1 overflow-x-hidden">
      <AlgorithmsNavbar />

      {/* Offset for fixed navbar: 4rem mobile, 5rem md+ */}
      <div className="pt-16 md:pt-20">{children}</div>

      <Footer />
    </main>
  );
}
