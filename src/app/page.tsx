"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";

import CTA from "./components/CTA";

export default function Home() {
  return (
    <>
      <main className="relative flex-1 overflow-x-hidden">
        <Navbar />

        {/* Hero Section with Animated Background */}

        {/* CTA Section */}
        <CTA />
      </main>
    </>
  );
}
