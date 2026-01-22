"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import PathfindingCanvas from "./components/PathfindingCanvas";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Categories from "./components/Categories";
import Philosophy from "./components/Philosophy";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-black">
        <PathfindingCanvas />
        <Hero />
      </section>

      {/* Features Section */}
      <Features />

      {/* Algorithm Categories */}
      <Categories />

      {/* Philosophy Section */}
      <Philosophy />

      {/* Footer */}
      <Footer />
    </main>
  );
}
