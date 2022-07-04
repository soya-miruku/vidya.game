import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Pagination, Navigation } from 'swiper';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/virtual';

export interface IVCarouselProps {
  autoplay?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  speed?: number;
  navigation?: boolean;
  slides: JSX.Element[];
}

export const VCarousel: React.FC<IVCarouselProps> = ({ slides, autoplay=true, slidesPerView=4, spaceBetween=2, speed=300, loop=false, navigation=false}) => {
  const modules = [Virtual];
  if (navigation) {
    modules.push(Navigation);
  }
  
  return (
    <div className='w-full h-full'>
      <Swiper loop={loop} speed={speed} autoplay={autoplay} modules={modules} navigation={navigation ? true : false} spaceBetween={spaceBetween} slidesPerView={slidesPerView} virtual>
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={`slide-${index}`} virtualIndex={index} className="">
              {slide}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}