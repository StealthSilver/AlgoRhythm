"use client";

import Navbar from "./components/sections/Navbar";
import CTA from "./components/sections/CTA";
import Categories from "./components/sections/Categories";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <>
      <main className="relative flex-1 overflow-x-hidden">
        <Navbar />

        {/* Hero Section */}

        {/* Categories Section */}
        <Categories />

        {/* CTA Section */}
        <CTA />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
