"use client";

import React from "react";

// Define types for props
interface ReferralItemProps {
  referralCode: string;
  timeAgo: string;
  amount: string;
}

const ReferralItem: React.FC<ReferralItemProps> = ({
  referralCode,
  timeAgo,
  amount,
}) => {
  return (
    <div className="self-stretch p-4 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-6">
      {/* Referral Code */}
      <div className="flex-1 justify-center text-white text-lg font-medium font-satoshi leading-relaxed truncate">
        {referralCode}
      </div>

      {/* Time Ago */}
      <div className="justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
        {timeAgo}
      </div>

      {/* Amount Earned */}
      <div className="w-[120px] text-right justify-start text-[#3fd145] text-lg font-medium font-satoshi leading-loose">
        {amount} SOL
      </div>
    </div>
  );
};

export default ReferralItem;
