"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegStar } from "react-icons/fa6";
import Icon from "../Icons";
import { GiAlarmClock } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { getCountDown } from "@/utils";
// Define types for the props
interface PendingCardProps {
  category: string;
  question: string;
  volume: number;
  timeLeft: string;
  comments: number;
  imageUrl: string;
  index: number;
}

const PendingCard: React.FC<PendingCardProps> = ({
  index,
  category,
  question,
  comments,
  imageUrl,
  volume,
  timeLeft,
}) => {
  const router = useRouter(); // Initialize router
  const [counter, setCounter] = useState("7d : 6h : 21m : 46s");

  useEffect(() => {
    const interval = setInterval(() => {
      let remainTime = getCountDown(timeLeft)
      setCounter(remainTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to navigate to detail page
  const handleDetailClick = (index: number) => {
    const formattedQuestion = encodeURIComponent(question); // Encode for URL safety
    router.push(`/fund/${index}`); // Navigate to dynamic page
  };

  return (
    <div className="sm:p-6 p-5 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex flex-col justify-start items-start sm:gap-6 gap-4">
      <div className="self-stretch flex flex-col justify-start items-start gap-4">
        <div className="self-stretch inline-flex justify-start items-center sm:gap-3 gap-2">
          <div className="flex-1 justify-start text-[#07b3ff] text-base font-semibold font-Inter leading-normal">
            {category}
          </div>
          <div className="flex justify-start items-center gap-1">
            <div className="w-5 h-5 relative overflow-hidden">
              <Icon name="Message" />
            </div>
            <div className="justify-start text-[#838587] text-sm font-semibold font-interSemi leading-tight">
              {comments}
            </div>
          </div>
          <div className="justify-start">
            <div className="w-5 h-5 relative overflow-hidden">
              <FaRegStar className="text-gray" />
            </div>
          </div>
        </div>
        <div className="self-stretch h-14 inline-flex justify-start items-start overflow-auto gap-4">
          <div className="flex-1 justify-start text-white text-xl font-medium font-rubik">
            {question}
          </div>
          <img className="w-12 h-12 rounded-lg" src={imageUrl} alt={category} />
        </div>
        <div className="self-stretch rounded-xl lg:flex-row md:flex-col inline-flex gap-2 justify-between lg:items-center">
          <div className="lg:text-right justify-start text-[#838587] text-sm font-normal font-interSemi leading-tight">
            Time Left to Fund
          </div>
          <div className="px-2 py-1 bg-[#838587]/20 rounded-xl flex justify-start items-center gap-2">
            <div className="w-4 h-4 relative overflow-hidden">
              <GiAlarmClock size={16} className="text-gray" />
            </div>
            <div className="justify-start text-[#838587] text-xs font-medium font-satoshi leading-[18px]">
              {counter}
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-xl inline-flex justify-between items-center">
          <div className="text-right justify-start text-[#838587] text-sm font-normal font-interSemi leading-tight">
            Collected
          </div>
          <div className="self-stretch rounded-xl flex justify-start items-center gap-1">
            <div className="justify-start">
              <span className="text-white text-sm font-medium font-interSemi leading-tight">
                {volume.toFixed(4)}
              </span>
              <span className="text-[#838587] text-sm font-medium font-interSemi leading-tight">
                / 30
              </span>
            </div>
            <div className="text-right justify-start text-[#838587] text-sm font-medium font-interSemi leading-tight">
              SOL raised
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch inline-flex justify-start items-center gap-3">
        <button
          onClick={() => handleDetailClick(index)} // Call handleDetailClick when clicked
          className="flex-1 px-4 py-2 bg-[#282828] cursor-pointer rounded-2xl flex justify-center items-center gap-2 transition-all duration-200 ease-in-out transform hover:bg-[#333] active:scale-95"
        >
          <div className="justify-start text-white text-base font-medium font-satoshi leading-normal">
            Detail
          </div>
        </button>

        <button
          data-size="Small"
          data-type="Secondary"
          className="flex-1 px-4 py-2 bg-[#111111] cursor-pointer rounded-2xl shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.16)] outline-1 outline-offset-[-1px] outline-[#07b3ff] flex justify-center items-center gap-2 transition-all duration-200 ease-in-out transform hover:text-white active:scale-95"
        >
          <div className="justify-start text-[#07b3ff] text-base font-medium font-satoshi leading-normal">
            Fund now
          </div>
        </button>
      </div>
    </div>
  );
};

export default PendingCard;
