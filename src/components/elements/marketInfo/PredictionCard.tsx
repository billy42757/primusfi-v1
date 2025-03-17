"use client";

import React from "react";
import { FaRegClock, FaRegStar } from "react-icons/fa6";
import Icon from "../Icons";
import ProgressBar from "./ProgressBar";
import VoteButton from "../buttons/VoteBtn";

// Define types for the props
interface PredictionCardProps {
    category: string;
    question: string;
    volume: string;
    timeLeft: string;
    comments: number;
    yesPercentage: number;
    imageUrl: string;
    onVote: () => void;
  }

const PredictionCard: React.FC<PredictionCardProps> = ({
  category,
  question,
  volume,
  timeLeft,
  comments,
  yesPercentage,
  imageUrl,
  onVote,
}) => {
  return (
    <div className="lg:p-6 p-4 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] shadow-xl/20 outline-[#313131] inline-flex flex-col justify-start items-start lg:gap-6 gap-4">
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch inline-flex justify-start items-center gap-2">
          <div className="flex-1 justify-start text-[#07b3ff] lg:text-base text-xs font-semibold font-Inter leading-normal">
            {category}
          </div>
          <div className="lg:w-5 lg:h-5 w-4 h-4 relative overflow-hidden">
            <FaRegStar className="text-white" />
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-4">
          <div className="flex-1 lg:h-[96px] h-[80px] h- overflow-auto justify-start text-white lg:text-2xl text-lg font-medium font-rubik leading-loose">
            {question}
          </div>
          <img className="lg:w-14 lg:h-14 w-12 h-12 rounded-lg" src={imageUrl} alt={category} />
        </div>
        <div className="self-stretch inline-flex justify-start items-center gap-4">
          <div className="flex-1 flex justify-start items-center gap-2">
            <div className="justify-start text-[#838587] text-sm font-semibold font-inter leading-tight">
              Volume :
            </div>
            <div className="flex-1 justify-start text-white text-sm font-semibold font-inter leading-tight">
              {volume}
            </div>
          </div>
          <div className="flex justify-center items-center gap-1">
            <FaRegClock className="text-[#3fd145] flex items-center justify-center" />
            <div className="justify-start text-[#3fd145] text-sm font-semibold font-inter leading-[14px]">
              {timeLeft}
            </div>
          </div>
          <div className="flex justify-start items-center gap-1">
            <div className="w-5 h-5 relative overflow-hidden">
              <Icon name="Message" />
            </div>
            <div className="justify-start text-[#838587] text-sm font-semibold font-inter leading-[14px]">
              {comments}
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch max-h-[37.5px] flex-1 flex flex-col justify-start items-start gap-4">
        <ProgressBar yesPercentage={yesPercentage} />
      </div>
      <div className="self-stretch inline-flex justify-start items-center gap-3">
        <VoteButton onClick={onVote} label="Yes" color="#3fd145" icon="yes" />
        <VoteButton onClick={onVote} label="No" color="#ff6464" icon="no" />
      </div>
    </div>
  );
};

export default PredictionCard;
