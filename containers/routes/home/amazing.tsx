'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/product-card';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type AmazingProduct = {
  id: string;
  title: string;
  price: number;
  discount: number;
  image: string;
  href: string;
  rating?: number;
  reviewCount?: number;
};

const amazingProducts: AmazingProduct[] = [
  {
    id: '1',
    title: 'ساعت هوشمند نکسون سنس مدل QX11',
    price: 2950000,
    discount: 21,
    image: '/temp/product-image.webp',
    href: '/products/smartwatch-qx11',
    rating: 4.2,
    reviewCount: 156,
  },
  {
    id: '2',
    title: 'ساعت مچی غواصی کوارتز مردانه هامر مدل HM1442',
    price: 2714000,
    discount: 8,
    image: '/temp/product-image.webp',
    href: '/products/watch-hm1442',
    rating: 4.5,
    reviewCount: 89,
  },
  {
    id: '3',
    title: 'لپ تاپ 15.6 اینچی ام اس آی مدل Cyborg 15',
    price: 76740000,
    discount: 13,
    image: '/temp/product-image.webp',
    href: '/products/laptop-cyborg15',
    rating: 4.1,
    reviewCount: 234,
  },
  {
    id: '4',
    title: 'لپ تاپ 15.6 اینچی اچ پی مدل 15-fc0171nia-15-Athlon',
    price: 30785000,
    discount: 26,
    image: '/temp/product-image.webp',
    href: '/products/laptop-hp-athlon',
    rating: 3.9,
    reviewCount: 67,
  },
  {
    id: '5',
    title: 'هندفری ایکس او مدل EP38',
    price: 152900,
    discount: 44,
    image: '/temp/product-image.webp',
    href: '/products/headphone-ep38',
    rating: 4.3,
    reviewCount: 445,
  },
  {
    id: '6',
    title: 'هندفری ایکس او مدل S6',
    price: 317000,
    discount: 48,
    image: '/temp/product-image.webp',
    href: '/products/headphone-s6',
    rating: 4.0,
    reviewCount: 123,
  },
  {
    id: '7',
    title: 'هدفون بلوتوثی مدل JR04',
    price: 389000,
    discount: 54,
    image: '/temp/product-image.webp',
    href: '/products/headphone-jr04',
    rating: 4.4,
    reviewCount: 789,
  },
  {
    id: '8',
    title: 'هدفون بلوتوثی مدل JR04',
    price: 389000,
    discount: 54,
    image: '/temp/product-image.webp',
    href: '/products/headphone-jr04',
    rating: 4.4,
    reviewCount: 789,
  },
  {
    id: '9',
    title: 'هدفون بلوتوثی مدل JR04',
    price: 389000,
    discount: 54,
    image: '/temp/product-image.webp',
    href: '/products/headphone-jr04',
    rating: 4.4,
    reviewCount: 789,
  },
  {
    id: '10',
    title: 'هدفون بلوتوثی مدل JR04',
    price: 389000,
    discount: 54,
    image: '/temp/product-image.webp',
    href: '/products/headphone-jr04',
    rating: 4.4,
    reviewCount: 789,
  },
];

export const Amazing = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 23,
    seconds: 45,
  });
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container">
      <div className="bg-primary rounded-xl group">
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView="auto"
            allowSlidePrev={true}
            allowSlideNext={true}
            navigation={{
              nextEl: '.amazing-slider-next',
              prevEl: '.amazing-slider-prev',
              enabled: true,
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSwiper={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            className="amazing-swiper"
          >
            <SwiperSlide className="!w-[160px]">
              <div className="flex flex-col items-center justify-between h-full p-4 pl-0 text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    <Image
                      src="/images/routes/home/amazing-image.svg"
                      alt="شگفت انگیز"
                      width={60}
                      height={60}
                      className="w-15 h-15"
                    />
                  </div>
                  <div className="mb-4">
                    <Image
                      src="/images/routes/home/amazing-text.svg"
                      alt="پیشنهاد شگفت انگیز"
                      width={100}
                      height={100}
                      className="w-25 h-25"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-1 text-white text-xs">
                    <div className="bg-white text-black rounded-sm px-1.5 py-1 font-bold min-w-[24px]">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <span>:</span>
                    <div className="bg-white text-black rounded-sm px-1.5 py-1 font-bold min-w-[24px]">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <span>:</span>
                    <div className="bg-white text-black rounded-sm px-1.5 py-1 font-bold min-w-[24px]">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                  </div>

                  <button className="rounded-full flex items-center gap-1 px-3 py-1.5 transition-colors">
                    <span className="text-white text-xs font-medium">
                      مشاهده همه
                    </span>
                    <ChevronLeft size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
            {amazingProducts.map((product) => (
              <SwiperSlide key={product.id} className="!w-[160px] mt-4">
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  discount={product.discount}
                  image={product.image}
                  href={product.href}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className={`amazing-slider-next absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer transition-opacity duration-300 ${isEnd ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300">
              <ChevronLeft size={20} />
            </div>
          </div>
          <div
            className={`amazing-slider-prev absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer transition-opacity duration-300 ${isBeginning ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300">
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
