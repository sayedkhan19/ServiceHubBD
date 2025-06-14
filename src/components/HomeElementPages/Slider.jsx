import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import slider1 from '../../assets/img1.jpg';
import slider2 from '../../assets/img2.jpg';
import slider3 from '../../assets/img3.jpg';

const Slider = () => {
  const slides = [slider1, slider2, slider3];

  return (
    <div className="w-full px-4 py-4">
      <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          loop={true}
          className="w-full h-full"
        >
          {slides &&
          slides?.map((slide, index) => (
            <SwiperSlide key={index}>
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
