"use client";

import React from "react";
import MarketCarousel from "@/components/elements/carousel/MarketCarousel";
import Market from "@/components/elements/marketInfo/Market";
import RecentList from "@/components/elements/marketInfo/RecentList";

export default function Home() {
  return (
    <div className="self-stretch sm:px-[42px] px-5 inline-flex flex-col justify-start items-start gap-[50px] overflow-auto">
      {/* <div className="self-stretch relative">
        <MarketCarousel />
      </div> */}
      <div className="self-stretch inline-flex flex-col 2xl:flex-row justify-start items-start gap-[50px] ">
        <Market />
        <div className="md:w-[519px] w-full  inline-flex flex-col justify-start items-start md:gap-6 gap-4">
          <div className="self-stretch justify-start text-white text-[32px] font-semibold font-['Rubik'] leading-[48px]">
            📕 Recent Activity
          </div>
          <RecentList />
        </div>
      </div>
    </div>
  );
}
