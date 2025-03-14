import React from "react";

interface ProfileFundItemProps {
  image: string;
  title: string;
  status: "Pending" | "Active" | "Expired";
  betAmount: number;
  percentage: number;
  value: string;
}

const statusColors: Record<string, string> = {
  Pending: "bg-[#3fd145]/10 text-[#3fd145]",
  Active: "bg-[#0054f5]/10 text-[#07b3ff]",
  Expired: "bg-[#ff6464]/10 text-[#ff6464]",
};

const ProfileFundItem: React.FC<ProfileFundItemProps> = ({
  image,
  title,
  status,
  betAmount,
  percentage,
  value,
}) => {
  return (
    <div className="self-stretch p-4 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
      <img className="w-8 h-8 rounded-lg" src={image} alt="market-icon" />
      <div className="flex-1 justify-center text-white text-sm font-medium font-satoshi leading-relaxed">
        {title}
      </div>
      <div className="w-[100px] rounded-[100px] inline-flex flex-col justify-center items-start">
        <div
          className={`px-2.5 ${statusColors[status]} rounded-[100px] inline-flex justify-center items-center gap-2.5`}
        >
          <div className="justify-start text-sm font-medium font-satoshi leading-normal">
            {status}
          </div>
        </div>
      </div>
      <div className="w-[120px] flex justify-start items-center gap-1">
        <div className="justify-start text-[#838587] text-sm font-medium font-satoshi leading-relaxed">
          {betAmount} SOL /
        </div>
        <div className="w-[50px] justify-start text-[#3fd145] text-sm font-medium font-satoshi leading-relaxed">
          {percentage}%
        </div>
      </div>
      <div className="w-[100px] justify-start text-white text-sm font-medium font-interSemi leading-relaxed">
        {value}
      </div>
    </div>
  );
};

export default ProfileFundItem;
