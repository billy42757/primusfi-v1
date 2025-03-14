import { marketCarouselItems } from "@/data/data";
import MarketCarouselItem from "./MarketCarouselItem";
import Carousel from "react-multi-carousel";

const MarketCarousel = () => {
  return (
    <div className="w-full">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        partialVisible
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          break: {
            breakpoint: {
              max: 3000,
              min: 1700,
            },
            items: 1,
            partialVisibilityGutter:500,
          },
          xl: {
            breakpoint: {
              max: 1700,
              min: 1024,
            },
            items: 1,
            partialVisibilityGutter:200,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {marketCarouselItems.map((item, index) => (
          <MarketCarouselItem key={index} {...item} />
        ))}
      </Carousel>
    </div>
  );
};

export default MarketCarousel;
