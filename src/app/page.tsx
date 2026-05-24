"use client";

import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import CTA from "./components/sections/CTA";
import Categories from "./components/sections/Categories";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 overflow-x-hidden">
        <Hero />
        <Features />
        <Categories />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
