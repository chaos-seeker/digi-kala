'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import { TBrand } from '@/types/brand';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface BrandsProps {
  data: TBrand[];
}

export const Brands = (props: BrandsProps) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);

  return (
    <section className="container">
      <div className="border rounded-xl p-4 flex flex-col gap-6 items-center justify-center relative group">
        <div className="flex items-center gap-2">
          <Star className="size-6 text-yellow-500" />
          <h2 className="font-medium">محبوب‌ترین برندها</h2>
        </div>
        <div className="w-full relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={5}
            slidesPerView="auto"
            dir="rtl"
            watchSlidesProgress={true}
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
            {props.data?.map((brand, index) => (
              <SwiperSlide key={brand.id} className="!w-auto">
                <Link
                  href={`/explore`}
                  className={cn(
                    'flex items-center justify-center p-4 duration-300',
                    index === props.data.length - 1 && 'border-l-0 pl-0',
                  )}
                >
                  <Image
                    src={brand.image}
                    alt={brand.title}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {!isEnd && (
            <div
              className="brands-slider-next absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300">
                <ChevronLeft className="size-5" />
              </div>
            </div>
          )}
          {!isBeginning && (
            <div
              className="brands-slider-prev absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300">
                <ChevronRight className="size-5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
