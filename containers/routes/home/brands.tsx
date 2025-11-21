'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState, useRef } from 'react';
import { cn } from '@/utils/cn';
import 'swiper/css';
import 'swiper/css/navigation';

type Brand = {
  id: string;
  image: string;
  href: string;
};

const brands: Brand[] = [
  {
    id: '1',
    image: '/temp/brand.png',
    href: '/brands/my-baby',
  },
  {
    id: '2',
    image: '/temp/brand.png',
    href: '/brands/pino',
  },
  {
    id: '3',
    image: '/temp/brand.png',
    href: '/brands/huawei',
  },
  {
    id: '4',
    image: '/temp/brand.png',
    href: '/brands/pampers',
  },
  {
    id: '5',
    image: '/temp/brand.png',
    href: '/brands/x-vision',
  },
  {
    id: '6',
    image: '/temp/brand.png',
    href: '/brands/jafari-saffron',
  },
  {
    id: '7',
    image: '/temp/brand.png',
    href: '/brands/charm-dorsa',
  },
  {
    id: '8',
    image: '/temp/brand.png',
    href: '/brands/persil',
  },
  {
    id: '9',
    image: '/temp/brand.png',
    href: '/brands/pakshoma',
  },
  {
    id: '10',
    image: '/temp/brand.png',
    href: '/brands/pakshoma',
  },
  {
    id: '11',
    image: '/temp/brand.png',
    href: '/brands/pakshoma',
  },
  {
    id: '12',
    image: '/temp/brand.png',
    href: '/brands/pakshoma',
  },
  {
    id: '13',
    image: '/temp/brand.png',
    href: '/brands/pakshoma',
  },
  {
    id: '14',
    image: '/temp/brand.png',
    href: '/brands/pakshoma',
  },
  {
    id: '15',
    image: '/temp/brand.png',
    href: '/brands/pakshoma',
  },
];

export const Brands = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);

  return (
    <section className="container">
      <div className="border rounded-xl pr-5 border-gray-200 py-6 relative group">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Star size={24} className="text-yellow-500" />
          <h2 className="font-medium">محبوب‌ترین برندها</h2>
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView="auto"
            watchSlidesProgress={true}
            allowSlidePrev={true}
            allowSlideNext={true}
            navigation={{
              nextEl: '.brands-slider-next',
              prevEl: '.brands-slider-prev',
              enabled: true,
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onReachEnd={() => {
              setIsEnd(true);
            }}
            onReachBeginning={() => {
              setIsBeginning(true);
            }}
            className="brands-swiper"
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={brand.id} className="!w-auto">
                <Link
                  href={brand.href}
                  className="flex flex-col items-center group"
                >
                  <div
                    className={cn(
                      'relative size-26 overflow-hidden bg-white p-2 duration-300',
                      index !== brands.length - 1 && 'border-l',
                    )}
                  >
                    <Image
                      src={brand.image}
                      alt="برند"
                      fill
                      className={
                        'object-contain hover:scale-105 transition-transform duration-300 pl-5'
                      }
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {!isEnd && (
            <div
              className="brands-slider-next absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300">
                <ChevronLeft size={20} />
              </div>
            </div>
          )}
          {!isBeginning && (
            <div
              className="brands-slider-prev absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300">
                <ChevronRight size={20} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
