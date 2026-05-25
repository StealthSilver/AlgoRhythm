import dynamic from "next/dynamic";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";

const Need = dynamic(() => import("./components/sections/Need"));
const Features = dynamic(() => import("./components/sections/Features"));
const Library = dynamic(() => import("./components/sections/Library"));
const Students = dynamic(() => import("./components/sections/Students"));
const Footer = dynamic(() => import("./components/sections/Footer"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 overflow-x-hidden">
        <Hero />
        <Need />
        <Features />
        <Library />
        <Students />
        <Footer />
      </main>
    </>
  );
}
