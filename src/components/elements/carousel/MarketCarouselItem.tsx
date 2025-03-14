import { MarketCarouselItemProps } from "@/types/type";
import Icon from "../Icons";

const MarketCarouselItem: React.FC<MarketCarouselItemProps> = ({
  category,
  title,
  bgImage,
  mainImage,
  overlayImage,
}) => {
  return (
    <div className="w-[970px] h-[312px] relative rounded-2xl cursor-pointer outline-1 outline-offset-[-1px] outline-[#313131] overflow-hidden">
      {/* Background Image */}
      <img
        className="w-[627px] h-[312px] left-[405px] top-[0x] absolute"
        src={bgImage}
        alt="Background"
      />
      <div className="w-[627px] h-[312px] left-0 top-0 absolute bg-gradient-to-l from-[#1e1e1e]/0 via-[#1e1e1e]/70 to-[#1e1e1e]" />

      {/* Main Image */}
      <img
        className="w-[250px] h-[250px] left-[434px] top-[81px] absolute"
        src={mainImage}
        alt="Main"
      />

      {/* Content */}
      <div className="w-[443px] h-[312px] p-8 left-0 top-0 absolute inline-flex flex-col justify-between items-start">
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
          <div className="self-stretch justify-start text-[#07b3ff] text-2xl font-semibold font-interSemi leading-loose">
            {category}
          </div>
          <div className="self-stretch justify-start text-white text-[32px] font-medium font-rubik leading-[42px]">
            {title}
          </div>
        </div>

        {/* Button */}
        <div
          className="px-4 py-2.5 bg-[#07b3ff] rounded-2xl shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.16)] inline-flex justify-start items-center gap-4 
  transition-all duration-300 ease-in-out hover:bg-[#0595d3] hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          <div
            className="justify-start text-[#111111] text-lg font-bold font-stoshi leading-7 
    transition-all duration-300 ease-in-out"
          >
            Start Trade Now
          </div>
          <Icon
            name="Arrow"
            className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
          />
        </div>
      </div>

      {/* Overlay Image */}
      <img
        className="w-[236px] h-[236px] left-[723px] top-[85px] absolute"
        src={overlayImage}
        alt="Overlay"
      />
    </div>
  );
};

export default MarketCarouselItem;
