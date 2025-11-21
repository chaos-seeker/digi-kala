'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Category = {
  id: string;
  title: string;
  image: string;
  href: string;
};

const categories: Category[] = [
  {
    id: '1',
    title: 'ابزارآلات و تجهیزات',
    image: '/temp/category.jpg',
    href: '/categories/tools',
  },
  {
    id: '2',
    title: 'خودرو و موتورسیکلت',
    image: '/temp/category.jpg',
    href: '/categories/automotive',
  },
  {
    id: '3',
    title: 'مد و پوشاک',
    image: '/temp/category.jpg',
    href: '/categories/fashion',
  },
  {
    id: '4',
    title: 'آرایشی بهداشتی',
    image: '/temp/category.jpg',
    href: '/categories/beauty',
  },
  {
    id: '5',
    title: 'لوازم خانگی برقی',
    image: '/temp/category.jpg',
    href: '/categories/home-appliances',
  },
  {
    id: '6',
    title: 'خانه و آشپزخانه',
    image: '/temp/category.jpg',
    href: '/categories/home-kitchen',
  },
  {
    id: '7',
    title: 'کالای دیجیتال',
    image: '/temp/category.jpg',
    href: '/categories/digital',
  },
  {
    id: '8',
    title: 'لپ تاپ',
    image: '/temp/category.jpg',
    href: '/categories/laptop',
  },
  {
    id: '9',
    title: 'موبایل',
    image: '/temp/category.jpg',
    href: '/categories/mobile',
  },
  {
    id: '10',
    title: 'پت شاپ',
    image: '/temp/category.jpg',
    href: '/categories/pet-shop',
  },
  {
    id: '11',
    title: 'محصولات بومی و محلی',
    image: '/temp/category.jpg',
    href: '/categories/local-products',
  },
  {
    id: '12',
    title: 'اسباب بازی، کودک و نوزاد',
    image: '/temp/category.jpg',
    href: '/categories/toys-kids',
  },
  {
    id: '13',
    title: 'سوپر مارکت آنلاین',
    image: '/temp/category.jpg',
    href: '/categories/supermarket',
  },
  {
    id: '14',
    title: 'کارت هدیه و گیفت کارت',
    image: '/temp/category.jpg',
    href: '/categories/gift-cards',
  },
  {
    id: '15',
    title: 'ورزش و سفر',
    image: '/temp/category.jpg',
    href: '/categories/sports-travel',
  },
  {
    id: '16',
    title: 'کتاب و هنر',
    image: '/temp/category.jpg',
    href: '/categories/books-art',
  },
  {
    id: '17',
    title: 'تجهیزات پزشکی و سلامت',
    image: '/temp/category.jpg',
    href: '/categories/health-medical',
  },
  {
    id: '18',
    title: 'طلا و نقره',
    image: '/temp/category.jpg',
    href: '/categories/jewelry',
  },
];

export const Categories = () => {
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
              slidesPerView={1.5}
              dir="rtl"
              watchSlidesProgress={true}
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
              {categories.map((category) => (
                <SwiperSlide key={category.id} className="w-auto!">
                  <Link
                    href={category.href}
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
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
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
