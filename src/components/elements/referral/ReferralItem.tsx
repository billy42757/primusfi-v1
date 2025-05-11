"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaClock, FaCoins } from "react-icons/fa";

// Define types for props
interface ReferralItemProps {
  referralCode: string;
  timeAgo: string;
  amount: string;
  status: "active" | "pending";
  user: string;
}

const ReferralItem: React.FC<ReferralItemProps> = ({
  referralCode,
  timeAgo,
  amount,
  status,
  user,
}) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="w-full h-[100px] p-4 bg-[#1e1e1e] rounded-xl border border-[#313131] flex items-center justify-between gap-4"
    >
      {/* Left Section - User Info */}
      <div className="flex items-center gap-4 min-w-[300px]">
        <div className="w-12 h-12 flex items-center justify-center bg-[#282828] rounded-lg">
          <FaUser className="text-[#00b4d8] text-xl" />
        </div>
        <div className="flex flex-col">
          <div className="text-white text-lg font-medium font-satoshi">
            {user}
          </div>
          <div className="text-[#838587] text-sm font-medium font-satoshi truncate max-w-[200px]">
            {referralCode}
          </div>
        </div>
      </div>

      {/* Right Section - Status and Amount */}
      <div className="flex items-center gap-6">
        {/* Time Ago */}
        <div className="flex items-center gap-2 min-w-[100px]">
          <FaClock className="text-[#00b4d8] text-lg" />
          <div className="text-[#00b4d8] text-base font-medium font-satoshi">
            {timeAgo}
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-lg text-sm font-medium min-w-[100px] text-center ${
          status === "active" 
            ? "bg-[#00b4d8]/10 text-[#00b4d8]" 
            : "bg-[#838587]/10 text-[#838587]"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>

        {/* Amount Earned */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <FaCoins className="text-[#00b4d8] text-lg" />
          <div className="flex items-center gap-1">
            <span className="text-[#00b4d8] text-lg font-medium font-satoshi">
              {amount}
            </span>
            <span className="text-[#00b4d8] text-lg font-medium font-satoshi">
              SOL
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReferralItem;
