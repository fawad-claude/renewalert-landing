import React from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesShowcase } from "@/components/features-showcase";
import { CountriesSection } from "@/components/countries-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesShowcase />
        <CountriesSection />
      </main>
      <Footer />
    </div>
  );
}
