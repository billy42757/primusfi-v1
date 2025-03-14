import ReferralItem from "@/components/elements/referral/ReferralItem";
import { LuCopy } from "react-icons/lu";

const referrals = [
  {
    referralCode: "asdjncinj6543Dhj5C49iumxcmvbnxc97",
    timeAgo: "2m ago",
    amount: "0.08",
  },
  {
    referralCode: "98bhvDjk34Nmcx49UJHJdsfncA9076",
    timeAgo: "5m ago",
    amount: "0.12",
  },
  {
    referralCode: "XCMN9834lkjdfCXM78934vhDJKC809",
    timeAgo: "10m ago",
    amount: "0.05",
  },
  {
    referralCode: "76BHVjdiuKJcmN8734jDJNmcx98347",
    timeAgo: "15m ago",
    amount: "0.15",
  },
  {
    referralCode: "MNBVHJ98dsfiUJ8BHVJK34nmzxc87",
    timeAgo: "20m ago",
    amount: "0.07",
  },
  {
    referralCode: "34XCMJKD89ncx8734NMZXCJKI8734",
    timeAgo: "25m ago",
    amount: "0.10",
  },
];

export default function Referral() {
  return (
    <div className="self-stretch w-auto h-[1184px] px-[300px] py-[100px] inline-flex flex-col overflow-auto justify-start items-start gap-[50px]">
      <div className="self-stretch flex flex-col justify-start items-start gap-3">
        <div className="justify-start text-white text-[32px] font-medium font-rubik leading-[48px]">
          Your Personal Referral Link
        </div>
        <div className="self-stretch h-[60px] p-2 bg-[#1e1e1e] rounded-xl shadow-[inset_2px_2px_6px_0px_rgba(0,0,0,0.20)] outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
          <div className="flex-1 px-6 py-3 rounded-lg flex justify-start items-center gap-2">
            <div className="justify-start text-[#838587] text-xl font-medium font-satothi leading-tight">
              ze13eyaa286d6ju76
            </div>
          </div>
          <div className="px-4 py-3 bg-[#282828] rounded-xl cursor-pointer shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] flex justify-start items-center gap-2">
            <div className="w-4 h-4 relative">
              <LuCopy className="text-white" />
            </div>
            <div className="justify-start text-white text-base font-medium font-satothi leading-none">
              Copy
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch w-full flex flex-col justify-start items-start gap-3">
        <div className="self-stretch justify-start text-white text-[28px] font-medium font-rubik leading-[48px]">
          Activity
        </div>
        {referrals.map((referral, index) => (
          <ReferralItem key={index} {...referral} />
        ))}
      </div>
    </div>
  );
}
