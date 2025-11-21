'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { cn } from '@/utils/cn';
import { HistoryIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState, useRef } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

type Category = {
  id: string;
  title: string;
  href: string;
  products: {
    id: string;
    title: string;
    price: number;
    discount?: number;
    image: string;
    href: string;
  }[];
};

const categories: Category[] = [
  {
    id: '1',
    title: 'جوراب مردانه',
    href: '/categories/mens-socks',
    products: [
      {
        id: '1',
        title: 'جوراب مردانه',
        price: 50000,
        discount: 20,
        image: '/temp/product-image.webp',
        href: '/products/sock-1',
      },
      {
        id: '2',
        title: 'جوراب مردانه',
        price: 45000,
        discount: 15,
        image: '/temp/product-image.webp',
        href: '/products/sock-2',
      },
      {
        id: '3',
        title: 'جوراب مردانه',
        price: 55000,
        image: '/temp/product-image.webp',
        href: '/products/sock-3',
      },
      {
        id: '4',
        title: 'جوراب مردانه',
        price: 48000,
        discount: 10,
        image: '/temp/product-image.webp',
        href: '/products/sock-4',
      },
    ],
  },
  {
    id: '2',
    title: 'کیف و کاور گوشی',
    href: '/categories/phone-cases',
    products: [
      {
        id: '5',
        title: 'کیف و کاور گوشی',
        price: 150000,
        discount: 25,
        image: '/temp/product-image.webp',
        href: '/products/case-1',
      },
      {
        id: '6',
        title: 'کیف و کاور گوشی',
        price: 120000,
        discount: 30,
        image: '/temp/product-image.webp',
        href: '/products/case-2',
      },
      {
        id: '7',
        title: 'کیف و کاور گوشی',
        price: 180000,
        image: '/temp/product-image.webp',
        href: '/products/case-3',
      },
      {
        id: '8',
        title: 'کیف و کاور گوشی',
        price: 200000,
        discount: 15,
        image: '/temp/product-image.webp',
        href: '/products/case-4',
      },
    ],
  },
  {
    id: '3',
    title: 'گوشی موبایل',
    href: '/categories/mobile-phones',
    products: [
      {
        id: '9',
        title: 'گوشی موبایل',
        price: 15000000,
        discount: 10,
        image: '/temp/product-image.webp',
        href: '/products/phone-1',
      },
      {
        id: '10',
        title: 'گوشی موبایل',
        price: 18000000,
        discount: 12,
        image: '/temp/product-image.webp',
        href: '/products/phone-2',
      },
      {
        id: '11',
        title: 'گوشی موبایل',
        price: 12000000,
        image: '/temp/product-image.webp',
        href: '/products/phone-3',
      },
      {
        id: '12',
        title: 'گوشی موبایل',
        price: 20000000,
        discount: 8,
        image: '/temp/product-image.webp',
        href: '/products/phone-4',
      },
    ],
  },
  {
    id: '4',
    title: 'مکمل انرژی زا',
    href: '/categories/energy-supplements',
    products: [
      {
        id: '13',
        title: 'مکمل انرژی زا',
        price: 500000,
        discount: 20,
        image: '/temp/product-image.webp',
        href: '/products/supplement-1',
      },
      {
        id: '14',
        title: 'مکمل انرژی زا',
        price: 450000,
        discount: 15,
        image: '/temp/product-image.webp',
        href: '/products/supplement-2',
      },
      {
        id: '15',
        title: 'مکمل انرژی زا',
        price: 600000,
        image: '/temp/product-image.webp',
        href: '/products/supplement-3',
      },
      {
        id: '16',
        title: 'مکمل انرژی زا',
        price: 550000,
        discount: 10,
        image: '/temp/product-image.webp',
        href: '/products/supplement-4',
      },
    ],
  },
];

export const History = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);

  return (
    <section className="container">
      <div className="border p-4 rounded-xl flex flex-col items-center justify-center gap-6 relative group">
        <div className="flex items-center gap-2">
          <HistoryIcon className="size-6 text-yellow-500" />
          <h2 className="font-medium">بر اساس سلیقه شما</h2>
        </div>
        <div className="xl:hidden w-full">
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
              }}
              dir="rtl"
              watchSlidesProgress={true}
              navigation={{
                nextEl: '.history-slider-next',
                prevEl: '.history-slider-prev',
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
              className="history-swiper"
            >
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-medium text-gray-800">
                          {category.title}
                        </h3>
                      </div>
                      <Link
                        href={category.href}
                        className="flex items-center gap-1 text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                      >
                        <span>مشاهده</span>
                        <ChevronLeft className="size-4" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2">
                      {category.products.map((product, productIndex) => (
                        <div
                          key={product.id}
                          className={cn(
                            'pt-1',
                            productIndex % 2 === 0 &&
                              'border-l border-gray-200 pl-3',
                            productIndex < 2 && 'border-b border-gray-200 pb-3',
                          )}
                        >
                          <ProductCard
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            discount={product.discount}
                            image={product.image}
                            href={product.href}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {!isEnd && (
              <div
                className="history-slider-next absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300">
                  <ChevronLeft className="size-5" />
                </div>
              </div>
            )}
            {!isBeginning && (
              <div
                className="history-slider-prev absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300">
                  <ChevronRight className="size-5" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="hidden xl:grid grid-cols-4 gap-2">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={cn(
                'flex flex-col gap-4',
                index % 4 !== 3 && 'xl:border-l xl:border-gray-200 xl:pl-2',
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-gray-800">
                    {category.title}
                  </h3>
                </div>
                <Link
                  href={category.href}
                  className="flex items-center gap-1 text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                >
                  <span>مشاهده</span>
                  <ChevronLeft className="size-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2">
                {category.products.map((product, productIndex) => (
                  <div
                    key={product.id}
                    className={cn(
                      'pt-1',
                      productIndex % 2 === 0 && 'border-l border-gray-200 pl-3',
                      productIndex < 2 && 'border-b border-gray-200 pb-3',
                    )}
                  >
                    <ProductCard
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      discount={product.discount}
                      image={product.image}
                      href={product.href}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
