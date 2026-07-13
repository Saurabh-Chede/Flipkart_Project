import React, { useRef } from "react"; // 1. Added useRef
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Banner() {
  const banners = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/780/image/7a9b980634c3b27f.jpg",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/780/image/0620618a58770110.png?q=80",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/780/image/b29d08613217764e.jpg?q=80",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/780/image/e86320e8fc5534bb.jpg?q=80",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/780/image/360309e20ece7645.png?q=80",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/780/image/796b4df85e03aaae.png?q=80",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/780/image/360309e20ece7645.png?q=80",
  ];

  // 2. Wrap the plugin in a ref so it persists across renders
  const plugin = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
    }),
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4">
      <Carousel
        plugins={[plugin.current]} // 3. Pass the ref current value here
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-2">
          {/* {banners.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-full sm:basis-1/2 md:basis-1/3"
            >
              <div className="rounded-xl overflow-hidden bg-white shadow-sm">
                <img
                  src={image}
                  alt={`Banner ${index}`}
                  className="w-full object-cover aspect-[41/20]"
                />
              </div>
            </CarouselItem>
          ))} */}
          {banners.map((image, index) => (
            <CarouselItem key={index} className="pl-2 basis-full">
              <img
                src={image}
                alt="Offer banner"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                width="1600"
                height="780"
                className="w-full aspect-[41/20] object-cover rounded-xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 z-10 bg-white shadow-md" />
        <CarouselNext className="right-2 z-10 bg-white shadow-md" />
      </Carousel>
    </div>
  );
}

export default Banner;
