'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Slide = {
  id: string;
  image: string;
  link: string;
};

const slides: Slide[] = [
  {
    id: '1',
    image: '/temp/slider-image.gif',
    link: '/products/actident',
  },
  {
    id: '2',
    image: '/temp/slider-image.gif',
    link: '/products/actident',
  },
  {
    id: '3',
    image: '/temp/slider-image.gif',
    link: '/products/actident',
  },
];

export const HeroSlider = () => {
  return (
    <section className="relative w-full aspect-[27/8] container group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.hero-slider-prev',
          prevEl: '.hero-slider-next',
        }}
        pagination={{
          clickable: true,
          el: '.hero-slider-pagination',
          bulletClass: 'hero-slider-bullet',
          bulletActiveClass: 'hero-slider-bullet-active',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full rounded-xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <a href={slide.link} className="block w-full h-full cursor-pointer">
              <Image
                src={slide.image}
                alt="اسلاید"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hero-slider-prev absolute left-9 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300">
          <ChevronLeft size={24} />
        </div>
      </div>
      <div className="hero-slider-next absolute right-9 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300">
          <ChevronRight size={24} />
        </div>
      </div>
      <div className="hero-slider-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2"></div>
      <style jsx global>{`
        .hero-slider-pagination {
          bottom: 16px !important;
        }

        .hero-slider-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hero-slider-bullet-active {
          width: 24px;
          height: 8px;
          background: white;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};
