import React from "react";

interface ProfileProposeItemProps {
  image: string;
  title: string;
  status: "Pending" | "Active" | "Expired";
  timeLeft: string;
  betAmount: number;
  totalAmount: number;
}

const statusColors: Record<string, string> = {
  Pending: "bg-[#3fd145]/10 text-[#3fd145]",
  Active: "bg-[#0054f5]/10 text-[#07b3ff]",
  Expired: "bg-[#ff6464]/10 text-[#ff6464]",
};

const ProfileProposeItem: React.FC<ProfileProposeItemProps> = ({
  image,
  title,
  status,
  timeLeft,
  betAmount,
  totalAmount,
}) => {
  return (
    <div className="self-stretch p-4 bg-[#1e1e1e] rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
      <img className="w-8 h-8 rounded-lg" src={image} alt="proposal-icon" />
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
      <div className="w-[100px] justify-start text-[#838587] text-sm font-medium font-satoshi leading-relaxed">
        {timeLeft}
      </div>
      <div className="inline-flex flex-col justify-center items-start">
        <div className="inline-flex justify-center items-center">
          <div className="w-[120px] justify-start">
            <span className="text-[#3fd145] text-sm font-medium font-interSemi leading-normal">
              {betAmount} SOL
            </span>
            <span className="text-[#838587] text-sm font-medium font-interSemi leading-normal">
              / {totalAmount} SOL
            </span>
          </div>
        </div>
        <div className="self-stretch h-[1.50px] bg-[#838587] rounded-[100px] flex flex-col justify-start items-start">
          <div
            className="bg-[#3fd145] rounded-[100px] flex-1"
            style={{ width: `${(betAmount / totalAmount) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileProposeItem;
