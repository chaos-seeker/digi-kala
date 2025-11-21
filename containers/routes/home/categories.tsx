'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import { TCategory } from '@/types/category';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CategoriesProps {
  data: TCategory[];
}

export const Categories = (props: CategoriesProps) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);

  return (
    <section className="container">
      <div className="border rounded-xl p-4 flex flex-col gap-6 items-center justify-center relative group">
        <div className="flex items-center gap-2">
          <LayoutGrid className="size-6 text-yellow-500" />
          <h2 className="font-medium">خرید بر اساس دسته‌بندی</h2>
        </div>
        <div className="lg:hidden w-full">
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView="auto"
              dir="rtl"
              watchSlidesProgress={true}
              slidesPerGroup={1}
              navigation={{
                nextEl: '.categories-slider-next',
                prevEl: '.categories-slider-prev',
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
              className="categories-swiper"
            >
              {props.data?.map((category) => (
                <SwiperSlide key={category.id} className="!w-auto">
                  <Link
                    href={`/explore`}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-24 h-24 mb-2 overflow-hidden duration-300">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs font-medium text-center text-gray-700 leading-tight">
                      {category.title}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            {!isEnd && (
              <div
                className="categories-slider-next absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300">
                  <ChevronLeft className="size-5" />
                </div>
              </div>
            )}
            {!isBeginning && (
              <div
                className="categories-slider-prev absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300">
                  <ChevronRight className="size-5" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-9 gap-4">
          {props.data?.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex flex-col items-center"
            >
              <div className="relative w-26 h-26 mb-2 overflow-hidden duration-300">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-medium text-center text-gray-700 leading-tight">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
