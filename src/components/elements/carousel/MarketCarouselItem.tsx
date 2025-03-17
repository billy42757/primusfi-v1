import { MarketCarouselItemProps } from "@/types/type";
import Icon from "../Icons";
import { useEffect, useState } from "react";

const MarketCarouselItem: React.FC<MarketCarouselItemProps> = ({
  category,
  title,
  bgImage,
  mainImage,
  overlayImage,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
  }, []);

  return (
    <div className="relative w-full max-w-[970px] h-[312px] rounded-2xl cursor-pointer outline-1 outline-offset-[-1px] outline-[#313131] overflow-hidden carousel-item">
      {/* Background Image */}
      <div className="absolute right-0 top-0 w-[65%] h-full overflow-hidden">
        <img
          className="w-full h-full object-cover carousel-image"
          src={bgImage}
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1e1e1e]/0 via-[#1e1e1e]/70 to-[#1e1e1e]" />
      </div>

      {/* Main Image */}
      <div className="absolute right-[30%] top-1/2 transform -translate-y-1/2 w-[250px] h-[250px] hidden md:block overflow-hidden">
        <img
          className="w-full h-full object-contain carousel-image"
          src={mainImage}
          alt="Main"
        />
      </div>

      {/* Content */}
      <div className="absolute left-0 top-0 w-full md:w-[45%] h-full p-4 md:p-8 flex flex-col justify-between items-start z-10">
        <div className="flex flex-col justify-start items-start gap-3 w-full">
          <div className="text-[#07b3ff] text-lg md:text-2xl font-semibold font-interSemi leading-loose carousel-text category">
            {category}
          </div>
          <div className="text-white text-2xl md:text-[32px] font-medium font-rubik leading-tight md:leading-[42px] carousel-text title">
            {title}
          </div>
        </div>

        {/* Button */}
        <div
          className="group px-4 py-2.5 bg-[#07b3ff] rounded-2xl shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.16)] 
          inline-flex justify-start items-center gap-4 carousel-button
          transition-all duration-300 ease-in-out hover:bg-[#0595d3] hover:scale-105 hover:shadow-lg cursor-pointer
          hover:shadow-[0_0_20px_rgba(7,179,255,0.4)]"
        >
          <div className="text-[#111111] text-base md:text-lg font-bold font-stoshi leading-7 transition-all duration-300 ease-in-out group-hover:translate-x-1">
            Start Trade Now
          </div>
          <Icon
            name="Arrow"
            className="transition-all duration-300 ease-in-out group-hover:translate-x-2"
          />
        </div>
      </div>

      {/* Overlay Image */}
      <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2 w-[236px] h-[236px] hidden lg:block overflow-hidden">
        <img
          className="w-full h-full object-contain carousel-image"
          src={overlayImage}
          alt="Overlay"
        />
      </div>
    </div>
  );
};

export default MarketCarouselItem;
