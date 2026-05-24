"use client";

import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Need from "./components/sections/Need";
import Features from "./components/sections/Features";
import Library from "./components/sections/Library";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 overflow-x-hidden">
        <Hero />
        <Need />
        <Features />
        <Library />
        <Footer />
      </main>
    </>
  );
}
