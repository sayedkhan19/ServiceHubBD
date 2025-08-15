import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Briefcase, Search, Users } from 'lucide-react';

import slider1 from '../../assets/img1.jpg';
import slider2 from '../../assets/img2.jpg';
import slider3 from '../../assets/img3.jpg';

const Slider = () => {
  const slides = [
    {
      img: slider1,
      title: 'Offer Your Expertise',
      desc: 'Share your skills and services with people who need them.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white drop-shadow-lg" />,
    },
    {
      img: slider2,
      title: 'Find the Right Service',
      desc: 'Browse trusted professionals and book in just a few clicks.',
      icon: <Search className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white drop-shadow-lg" />,
    },
    {
      img: slider3,
      title: 'Connect & Grow',
      desc: 'Build lasting connections through quality service experiences.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white drop-shadow-lg" />,
    },
  ];

  return (
    <div className="w-full py-4">
      <div className="w-full rounded-2xl overflow-hidden shadow-lg relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          modules={[Autoplay]}
          loop={true}
          className="rounded-2xl"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              
              {/* Blurred Background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${slide.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(20px)',
                  transform: 'scale(1.1)',
                }}
              ></div>

              {/* Main Image - object-contain to keep full image visible */}
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="relative z-10 w-full max-h-[220px] sm:max-h-[300px] lg:max-h-[500px] object-contain mx-auto rounded-2xl"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20"></div>

              {/* Text + Icon Overlay */}
              <div className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-4 sm:left-6 lg:left-8 text-white max-w-[90%] sm:max-w-lg z-30">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  {slide.icon}
                  <h2 className="text-base sm:text-2xl lg:text-4xl font-bold drop-shadow-lg leading-snug">
                    {slide.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-lg lg:text-xl opacity-90 drop-shadow-md leading-snug">
                  {slide.desc}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
