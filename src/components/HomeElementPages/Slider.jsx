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
      icon: <Briefcase className="w-8 h-8 text-white drop-shadow-lg" />,
    },
    {
      img: slider2,
      title: 'Find the Right Service',
      desc: 'Browse trusted professionals and book in just a few clicks.',
      icon: <Search className="w-8 h-8 text-white drop-shadow-lg" />,
    },
    {
      img: slider3,
      title: 'Connect & Grow',
      desc: 'Build lasting connections through quality service experiences.',
      icon: <Users className="w-8 h-8 text-white drop-shadow-lg" />,
    },
  ];

  return (
    <div className="w-full py-4">
      <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          loop={true}
          className="w-full h-full"
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

              {/* Main Image - always fully visible */}
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="relative z-10 max-h-full max-w-full mx-auto object-contain h-full"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20"></div>

              {/* Text + Icon Overlay */}
              <div className="absolute bottom-8 left-8 text-white max-w-lg z-30">
                <div className="flex items-center gap-3 mb-3">
                  {slide.icon}
                  <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
                    {slide.title}
                  </h2>
                </div>
                <p className="text-lg md:text-xl opacity-90 drop-shadow-md">
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
