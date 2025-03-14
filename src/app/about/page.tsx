"use client"

import { AboutSection } from "@/components/elements/about/AboutSection";
import AboutSubSidebar from "@/components/elements/about/AboutSubSidebar";
import { useState } from "react";

const faqItems = [
  "What is ChainTrend?",
  "What is ChainTrend’s mission?",
  "What are prediction markets?",
  "Is ChainTrend regulated?",
  "How does ChainTrend make money?",
  "Picking your first market",
  "Placing your first trade",
  "Selling your position",
  "The orderbook",
  "Buying Yes vs Selling No",
  "Collateral return",
  "Where markets come from",
  "Who are you trading with?",
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="self-stretch inline-flex flex-col md:flex-row justify-start items-start gap-10">
      {/* This is a sidebar in FAQs */}
      <div className="lg:w-[286px] w-full px-10 py-6 bg-[#161616] border-r border-[#313131] self-stretch justify-start items-start inline-flex flex-col gap-6 overflow-auto">
        {faqItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)} // Handle item selection
            className={`self-stretch text-base font-medium font-['Rubik'] leading-normal 
              ${index === selectedIndex ? "text-[#07b3ff]" : "text-[#838587]"}
              hover:text-[#07b3ff]`} // Hover effect for color change
          >
            {item}
          </div>
        ))}
      </div>
      <AboutSection />
      <AboutSubSidebar />
    </div>
  );
}
