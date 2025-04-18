"use client";
import HistoryItem from "@/components/elements/profile/HistoryItem";
import ProfileFundItem from "@/components/elements/profile/ProfileFundItem";
import ProfileNavbar from "@/components/elements/profile/ProfileNavbar";
import ProfileProposeItem from "@/components/elements/profile/ProfileProposeItem";
import { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { LuPill } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";

const historyData = [
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Will Bitcoin hit 100K by April?",
    status: "Ongoing",
    percentage: "20%",
    answer: "Yes",
    amount: "150.45",
  },
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Who will win the 2025 election?",
    status: "Won",
    percentage: "13%",
    answer: "Yes",
    amount: "150.45",
  },
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Will Bitcoin hit 100K by April?",
    status: "Ongoing",
    percentage: "56%",
    answer: "No",
    amount: "150.45",
  },
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Will Bitcoin hit 100K by April?",
    status: "Won",
    percentage: "75%",
    answer: "Yes",
    amount: "150.45",
  },
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Liverpool win the 2024 Premier League",
    status: "Lost",
    percentage: "44%",
    answer: "No",
    amount: "150.45",
  },
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Will Bitcoin hit 100K by April?",
    status: "Ongoing",
    percentage: "89%",
    answer: "Yes",
    amount: "150.45",
  },
] as const;

const funds = [
  {
    image: "https://placehold.co/32x32",
    title: "Will Bitcoin hit 100K by April?",
    status: "Pending",
    betAmount: 5,
    percentage: 20,
    value: "$150.45",
  },
  {
    image: "https://placehold.co/32x32",
    title: "Who will win the 2025 election?",
    status: "Active",
    betAmount: 2,
    percentage: 50,
    value: "$150.45",
  },
  {
    image: "https://placehold.co/32x32",
    title: "Liverpool win the 2024 Premier League",
    status: "Expired",
    betAmount: 13,
    percentage: 86,
    value: "$150.45",
  },
] as const;

const proposals = [
  {
    image: "https://placehold.co/32x32",
    title: "Will Bitcoin hit 100K by April?",
    status: "Pending",
    timeLeft: "3d 2h",
    betAmount: 8.9,
    totalAmount: 20,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Who will win the 2025 election?",
    status: "Active",
    timeLeft: "4h 55m",
    betAmount: 12.5,
    totalAmount: 25,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will ETH surpass $5K by June?",
    status: "Expired",
    timeLeft: "-",
    betAmount: 15,
    totalAmount: 30,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will Solana flip Ethereum in market cap?",
    status: "Pending",
    timeLeft: "10d 8h",
    betAmount: 5,
    totalAmount: 15,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will the S&P 500 reach a new ATH in 2025?",
    status: "Active",
    timeLeft: "2d 5h",
    betAmount: 7.2,
    totalAmount: 18,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will AI stocks outperform the market in 2025?",
    status: "Expired",
    timeLeft: "-",
    betAmount: 6.3,
    totalAmount: 12,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will the Fed cut interest rates this year?",
    status: "Pending",
    timeLeft: "6d 4h",
    betAmount: 10,
    totalAmount: 22,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will Tesla stock reach $1000 in 2025?",
    status: "Active",
    timeLeft: "7h 30m",
    betAmount: 9,
    totalAmount: 21,
  },
] as const;

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "Betting History" | "Funded Market" | "Proposed Market"
  >("Betting History");

  return (
    <div className="self-stretch h-[1184px] px-[50px] flex-col min-w-[1600px]:flex-row inline-flex justify-start items-start gap-[50px] overflow-auto">
      <div className="lg:w-[680px] flex-col lg:flex-row p-6 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-start gap-4">
        <img
          className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-[10px] border border-white"
          src="https://placehold.co/100x100"
          alt=""
        />
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="flex-1 h-[100px] inline-flex flex-col justify-center items-start gap-1">
              <div className="justify-start text-[#3fd145] text-[32px] font-medium font-satoshi leading-loose">
                Ahmed45
              </div>
              <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                @ahmmeada
              </div>
            </div>
            <div className="flex-1 h-[100px] flex justify-end items-center gap-1">
              <div className="px-3 py-1 rounded-[100px] outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center gap-1">
                <div className="w-6 h-6 relative overflow-hidden">
                  <div className="w-[5.50px] h-[1.50px] left-[5px] top-[7px] absolute bg-[#838587]" />
                  <div className="w-[9px] h-2 left-[14px] top-[8px] absolute bg-[#838587]" />
                  <div className="w-[19.14px] h-[17.50px] left-[2px] top-[3px] absolute opacity-50 bg-[#838587]" />
                </div>
                <div className="justify-start text-[#07b3ff] text-xl font-medium font-satoshi leading-relaxed">
                  0x214..e14sd
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  {" "}
                  Total Portfolio Value
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  $215,340
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Active Bet
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  25
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Total Bet
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  753
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Total Liquidity Provided
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  41 SOL
                </div>
              </div>
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Fees Earned From Liquidity
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  89 SOL
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Earning From Bet
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  $215,340
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Proposed Market
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  12
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Total Referrals
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  9
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch pt-6 flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-start text-white text-2xl font-medium font-satoshi leading-relaxed">
              About
            </div>
            <div className="self-stretch justify-start">
              <span className="text-[#838587] text-base font-normal font-satoshi leading-tight">
                Trump Memes are intended to function as an expression of support
                for, and engagement with, the ideals and beliefs embodied by the
                symbol {`"$TRUMP"`} and the associated artwork, and are not intended
                to be, or to be the subject of, an investment opportunity,
                investment contract, or security of any type.
              </span>
              <span className="text-[#07b3ff] text-base font-bold font-satoshi leading-tight">
                Show more
              </span>
            </div>
          </div>
          <div className="self-stretch rounded-2xl flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-center text-white text-2xl font-medium font-satoshi capitalize leading-normal">
              Socials
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-2 flex-wrap content-start">
              <div className="px-3 py-2 opacity-80 bg-[#111111] rounded-xl flex justify-end items-center gap-1">
                <div className="w-4 h-4 relative overflow-hidden">
                  <RiTwitterXFill size={16} color="gray" />
                </div>
                <div className="justify-start text-white text-xs font-normal font-satoshi leading-none">
                  x (Twitter)
                </div>
              </div>
              <div className="px-3 py-2 opacity-80 bg-[#111111] rounded-xl flex justify-end items-center gap-1">
                <div className="w-4 h-4 relative overflow-hidden">
                  <FaTelegramPlane color="gray" size={16} />
                </div>
                <div className="justify-start text-white text-xs font-normal font-satoshi leading-none">
                  Telegram
                </div>
              </div>
              <div className="px-3 py-2 opacity-80 bg-[#111111] rounded-xl flex justify-end items-center gap-1">
                <div className="w-4 h-4 relative overflow-hidden">
                  <TbWorld color="gray" size={16} />
                </div>
                <div className="justify-start text-white text-xs font-normal font-satoshi leading-none">
                  Website
                </div>
              </div>
              <div className="px-3 py-2 opacity-80 bg-[#111111] rounded-xl flex justify-end items-center gap-1">
                <div className="w-4 h-4 relative overflow-hidden">
                  <LuPill size={16} color="gray" />
                </div>
                <div className="justify-start text-white text-xs font-normal font-satoshi leading-none">
                  More
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 inline-flex flex-col justify-start items-start gap-[11px]">
        <ProfileNavbar activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "Betting History" && (
          <>
            <div className="self-stretch justify-start text-white text-[28px] font-medium font-['Rubik'] leading-[48px]">
              All Betting History
            </div>
            <div className="self-stretch px-4 py-2 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
              <div className="w-8 opacity-0 text-right justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                St
              </div>
              <div className="flex-1 justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Name
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Status
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Odds
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Bet Amount
              </div>
            </div>
            {historyData.map((item, index) => (
              <HistoryItem key={index} {...item} />
            ))}
          </>
        )}

        {activeTab === "Funded Market" && (
          <>
            <div className="self-stretch justify-start text-white text-[28px] font-medium font-['Rubik'] leading-[48px]">
              All Funded Market
            </div>
            <div className="self-stretch px-4 py-2 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
              <div className="w-8 opacity-0 text-right justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                St
              </div>
              <div className="flex-1 justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Name
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Status
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Fund Amount
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Ext. Payment
              </div>
            </div>
            {funds.map((fund, index) => (
              <ProfileFundItem key={index} {...fund} />
            ))}
          </>
        )}

        {activeTab === "Proposed Market" && (
          <>
            <div className="self-stretch justify-start text-white text-[28px] font-medium font-['Rubik'] leading-[48px]">
              All Proposed Market
            </div>
            <div className="self-stretch px-4 py-2 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
              <div className="w-8 opacity-0 text-right justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                St
              </div>
              <div className="flex-1 justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Name
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Status
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Exp. in
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Initial Liquidity
              </div>
            </div>
            {proposals.map((proposal, index) => (
              <ProfileProposeItem key={index} {...proposal} />
            ))}
          </>
        )}

      </div>
    </div>
  );
}
