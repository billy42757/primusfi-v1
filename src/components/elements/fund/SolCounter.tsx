import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const SolCounter = () => {
  const [solAmount, setSolAmount] = useState(0);

  const increaseSol = () => setSolAmount((prev) => prev + 1);
  const decreaseSol = () => {
    if (solAmount > 0) {
      setSolAmount((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="self-stretch p-2 bg-[#111111] rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
      {/* Decrease Button */}
      <div
        onClick={solAmount > 0 ? decreaseSol : undefined}
        className={` self-stretch p-3 bg-[#1e1e1e] rounded-xl flex justify-center items-center gap-1.5 cursor-pointer transition-all duration-300 
          ${solAmount > 0 ? "hover:bg-[#2e2e2e] active:scale-95" : "opacity-50 cursor-not-allowed"}`}
      >
        <FaMinus className="text-white" />
      </div>

      {/* SOL Amount Display */}
      <div className="flex-1 px-6 py-3 rounded-lg flex justify-center items-center gap-2">
        <div className="justify-start text-[#838587] text-xl font-medium font-satoshi leading-tight">
          {solAmount} SOL
        </div>
      </div>

      {/* Increase Button */}
      <div
        onClick={increaseSol}
        className="self-stretch p-3 bg-[#1e1e1e] rounded-xl shadow-[inset_-2px_-2px_6px_0px_rgba(0,0,0,0.20)] flex justify-center items-center gap-1.5 cursor-pointer transition-all duration-300 hover:bg-[#2e2e2e] active:scale-95"
      >
        <FaPlus className="text-white" />
      </div>
    </div>
  );
};

export default SolCounter;
