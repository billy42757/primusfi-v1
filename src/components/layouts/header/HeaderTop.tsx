"use client";

import { useState } from "react";
import Icon from "@/components/elements/Icons";
import { useGlobalContext } from "@/providers/GlobalContext";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import HeaderSideBar from "./HeaderSideBar";

const HeaderTop = () => {
  const { activeTab, setActiveTab } = useGlobalContext(); // Use Global Context
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex flex-col relative">
      <div className="self-stretch  px-[50px] py-4 inline-flex justify-between items-center w-full">
        <div className="flex gap-2 items-center md:hidden">
          <div onClick={() => setIsCollapsed(!isCollapsed)} className="w-4 h-4 md:hidden relative overflow-hidden">
            <RxHamburgerMenu size={16} className="text-white" />
          </div>
          <div className="flex-1 md:hidden flex justify-start items-center gap-2">
            <Link href="/">
              <Icon name="Logo" size={24} />
            </Link>
            <Link
              href="/"
              className="text-xl leading-9 font-normal font-['anton'] text-white uppercase"
            >
              speculape
            </Link>
          </div>
        </div>

        <div className="md:flex hidden justify-start items-center gap-5">
          {/* Market Tab Switch */}
          {pathname === "/" ? (
            <div className="p-0.5 bg-[#111111] rounded-[18px] outline-1 outline-offset-[-1px] outline-[#313131] flex">
              {/* Active Market Button */}
              <button
                onClick={() => setActiveTab("ActiveMarket")}
                className={`px-4 py-2.5 rounded-2xl flex items-center cursor-pointer gap-2 transition-all duration-300
        ${
          activeTab === "ActiveMarket"
            ? "bg-[#282828] shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)]"
            : "bg-transparent hover:bg-[#2a2a2a] hover:shadow-md hover:scale-95"
        }`}
              >
                <Icon
                  name="ActiveMarket"
                  color={activeTab === "ActiveMarket" ? "#FF6464" : "#838587"}
                  className="transition-all duration-300 ease-in-out hover:scale-110"
                />
                <span
                  className={`text-base font-medium font-satoshi leading-normal transition-all duration-300 ease-in-out
          ${activeTab === "ActiveMarket" ? "text-white" : "text-[#838587]"}`}
                >
                  Active Market
                </span>
              </button>

              {/* Pending Market Button */}
              <button
                onClick={() => setActiveTab("PendingMarket")}
                className={`px-4 py-2.5 rounded-2xl flex items-center cursor-pointer gap-2 transition-all duration-300
        ${
          activeTab === "PendingMarket"
            ? "bg-[#282828] shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)]"
            : "bg-transparent hover:bg-[#2a2a2a] hover:shadow-md hover:scale-95"
        }`}
              >
                <Icon
                  name="PendingMarket"
                  color={activeTab === "PendingMarket" ? "#FF6464" : "#838587"}
                  className="transition-all duration-300 ease-in-out hover:scale-110"
                />
                <span
                  className={`text-base font-medium font-satoshi leading-normal transition-all duration-300 ease-in-out
          ${activeTab === "PendingMarket" ? "text-white" : "text-[#838587]"}`}
                >
                  Pending Market
                </span>
              </button>
            </div>
          ) : (
            ""
          )}

          {/* Search Bar */}
          <div className="2xl:w-[480px] hidden px-4 py-3 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] lg:flex lg:w-auto justify-start items-center gap-3">
            <span className="cursor-pointer">
              <Icon name="Search" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent text-[#838587] text-base font-medium font-satoshi leading-normal outline-none"
            />
            <div className="px-2 py-1 bg-[#111111] rounded-lg outline-1 outline-offset-[-1px] outline-[#313131] flex justify-center items-center gap-2.5">
              <span className="text-[#838587] cursor-pointer text-sm font-medium font-satoshi leading-none">
                ⌘V
              </span>
            </div>
          </div>
        </div>

        {/* Language Selector & Wallet Button */}
        <div className="flex justify-start items-center gap-5">
          {/* Language Selector */}
          <div
            className="px-4 py-2.5 bg-[#282828] rounded-2xl xl:flex hidden justify-center items-center gap-2 
    transition-all duration-300 ease-in-out hover:bg-[#3a3a3a] hover:shadow-md cursor-pointer"
          >
            <span className="text-white text-lg font-medium font-satoshi leading-7 transition-all duration-300 ease-in-out hover:text-[#07b3ff]">
              EN
            </span>
            <Icon
              name="Down"
              className="transition-all duration-300 ease-in-out hover:rotate-180"
            />
          </div>

          {/* Connect Wallet Button */}
          <button
            className="md:px-4 px-3 md:py-2.5 py-1 bg-[#07b3ff] rounded-2xl flex items-center gap-2 
    transition-all cursor-pointer duration-300 ease-in-out hover:bg-[#0595d3] hover:scale-105 hover:shadow-lg"
          >
            <span className="text-black md:text-lg text-sm font-medium font-satoshi leading-7 transition-all duration-300 ease-in-out">
              Connect Wallet
            </span>
          </button>
        </div>
      </div>
      <div className="px-[50px]">
        {/* Search Bar */}
        <div className="lg:hidden px-4 py-3 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center gap-3">
          <span className="cursor-pointer">
            <Icon name="Search" />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent text-[#838587] md:text-base text-sm font-medium font-satoshi leading-normal outline-none"
          />
          <div className="px-2 py-1 bg-[#111111] rounded-lg outline-1 outline-offset-[-1px] outline-[#313131] flex justify-center items-center gap-2.5">
            <span className="text-[#838587] cursor-pointer text-sm font-medium font-satoshi leading-none">
              ⌘V
            </span>
          </div>
        </div>
      </div>
      <div className={`absolute z-10 md:hidden ${isCollapsed ? "hidden":""}`}>
        <HeaderSideBar isCancel={isCollapsed} setIsCanceled={setIsCollapsed} />
      </div>
    </div>
  );
};

export default HeaderTop;
