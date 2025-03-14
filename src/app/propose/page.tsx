"use client";

import Icon from "@/components/elements/Icons";
import { pendingPredictions } from "@/components/elements/marketInfo/Market";
import PendingCard from "@/components/elements/marketInfo/PendingCard";
import Pagination from "@/components/elements/pagination/Pagination";
import { useState } from "react";
import { FaRegCircle, FaRegSquare } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { IoMdLink } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { LuCalendarCheck2 } from "react-icons/lu";

export default function Propose() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-[50px] flex-col 2xl:flex-row self-stretch inline-flex justify-start items-start gap-[50px] overflow-auto">
      <div className="flex-1 p-8 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex flex-col justify-center items-center gap-8">
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="justify-start text-white text-[40px] font-medium font-rubik leading-[48px]">
            Market Proposition
          </div>
          <div className="justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
            Create your market and start earning!
          </div>
        </div>
        <div className="self-stretch inline-flex flex-col lg:flex-row  justify-start items-start gap-8">
          <div className="rounded-2xl inline-flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
              Market Photo
            </div>
            <div className="xl:w-[280px] xl:h-[280px] w-[150px] h-[150px] px-4 py-2.5 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex flex-col justify-center items-center gap-4">
              <div className="w-4 h-4 relative overflow-hidden">
                <FiUpload size={16} color="gray" />
              </div>
              <div className="self-stretch text-center justify-start text-[#838587] text-lg font-medium font-satoshi leading-7">
                Upload photo
              </div>
            </div>
            <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
              *File format jpg, png, img. max size 5mb
            </div>
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
            <div className="self-stretch inline-flex justify-center items-end gap-5">
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                    Market Question
                  </div>
                  <div className="self-stretch px-4 py-3.5 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                    <div className="flex-1 justify-start text-[#838587] md:text-xl text-sm font-medium font-satoshi leading-7">
                      e.g. Will ETH hit $5K by June 2025?
                    </div>
                    <div className="w-4 h-4 relative opacity-0 overflow-hidden">
                      <FaRegCircle />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-14 flex justify-start items-center gap-2">
                <FaRegCircle color="gray" size={16} />
                <div className="justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                  Oracle Verifiable
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                Resolution link
              </div>
              <div className="self-stretch px-4 py-3.5 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                <div className="flex-1 justify-start text-[#838587] md:text-xl text-sm font-medium font-satoshi leading-7">
                  https://puppyonmarket.com
                </div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <IoMdLink size={16} className="text-white" />
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                Resolution date
              </div>
              <div className="self-stretch px-4 py-3.5 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                <div className="flex-1 justify-start text-[#838587] md:text-xl text-sm font-medium font-satoshi leading-7">
                  December 24, 2025
                </div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <LuCalendarCheck2 className="text-white" />
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                  Initial Funding
                </div>
                <div className="self-stretch px-4 py-3.5 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                  <div className="flex-1 justify-start text-[#838587] md:text-xl text-sm font-medium font-satoshi leading-7">
                    0 SOL
                  </div>
                  <div className="w-4 h-4 relative opacity-0 overflow-hidden">
                    <div className="w-3.5 h-3.5 left-[1.33px] top-[0.67px] absolute">
                      <div className="w-3.5 h-3.5 left-0 top-0 absolute outline-[1.50px] outline-offset-[-0.75px] outline-[#838587]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                *Minimum 30 SOL
              </div>
            </div>
            <div className="self-stretch h-[200px] flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                Description
              </div>
              <div className="self-stretch flex-1 px-4 py-3.5 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-start">
                <div className="flex-1 justify-start text-[#838587] md:text-xl text-sm font-medium font-satoshi leading-7">
                  Description...
                </div>
                <div className="w-4 h-4 relative opacity-0 overflow-hidden">
                  <div className="w-3.5 h-3.5 left-[1.33px] top-[0.67px] absolute">
                    <div className="w-3.5 h-3.5 left-0 top-0 absolute outline-[1.50px] outline-offset-[-0.75px] outline-[#838587]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <FaRegSquare className="text-white" />
              <div className="justify-start">
                <span className="text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  By clicking ‘Submit’ you agree to out{" "}
                </span>
                <span className="text-[#3fd145] text-lg font-medium font-satoshi underline leading-relaxed">
                  Terms & Conditions
                </span>
              </div>
            </div>
            <div
              data-size="Big"
              data-type="Prime"
              className="w-[300px] px-6 cursor-pointer py-3.5 opacity-60 bg-[#07b3ff] rounded-2xl shadow-[inset_0px_3px_0px_0px_rgba(255,255,255,0.16)] inline-flex justify-center items-center gap-2 transition-all duration-200 ease-in-out transform hover:opacity-100 hover:bg-[#0697e5] active:scale-95"
            >
              <div className="justify-start text-[#111111] text-xl font-medium font-satoshi leading-7">
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="2xl:w-[428px] w-auto  p-8 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex flex-col justify-center items-center gap-8">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-start items-center gap-4">
            <div className="flex-1 justify-start text-white text-2xl font-medium font-rubik leading-loose">
              Existing markets
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-3">
            <div className="flex-1 px-4 py-2.5 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center gap-2">
              <div className="w-4 h-4 relative overflow-hidden">
                <IoSearchOutline size={16} color="gray" />
              </div>
              <div className="flex-1 justify-start text-[#838587] text-base font-medium font-satoshi leading-normal">
                Search
              </div>
              <div className="w-4 h-4 relative opacity-0 overflow-hidden">
                <div className="w-3.5 h-3.5 left-[1.33px] top-[0.67px] absolute">
                  <div className="w-3.5 h-3.5 left-0 top-0 absolute outline-[1.50px] outline-offset-[-0.75px] outline-[#838587]" />
                </div>
              </div>
            </div>
            <div className="p-3.5 bg-[#282828] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center gap-2">
              <div className="w-4 h-4 relative overflow-hidden">
                <Icon name="Filter" />
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-2xl grid md:grid-cols-2 xl:grid-cols-3 gap-2 2xl:inline-flex justify-start items-start 2xl:gap-4 flex-wrap content-start">
            {pendingPredictions.map((prediction, index) => (
              <PendingCard
                key={index}
                category={prediction.category}
                question={prediction.question}
                volume={prediction.volume}
                timeLeft={prediction.timeLeft}
                comments={prediction.comments}
                imageUrl={prediction.imageUrl}
              />
            ))}
          </div>
          <div className="self-stretch inline-flex justify-center items-center gap-4">
            <Pagination
              totalPages={4}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
