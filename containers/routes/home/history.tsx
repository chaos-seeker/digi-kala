'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import { ProductCard } from '@/components/product-card';
import { TProduct } from '@/types/product';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight, HistoryIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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

interface HistoryProps {
  products: TProduct[];
}

export const History = ({ products }: HistoryProps) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);

  const categories = useMemo(() => {
    // Fixed titles for the 4 boxes
    const fixedTitles = [
      'لوازم دیجیتال',
      'لوازم خانگی',
      'لوازم کوه نوردی',
      'لوازم تحریر',
    ];

    // Always create 4 boxes with 4 products each
    const groups: Category[] = [];

    for (let i = 0; i < 4; i++) {
      const startIndex = i * 4;
      const endIndex = startIndex + 4;
      // Slice 4 products for each box
      let groupProducts = products.slice(startIndex, endIndex);

      // If not enough products, cycle through the products array
      if (groupProducts.length < 4 && products.length > 0) {
        const remaining = 4 - groupProducts.length;
        const additionalProducts = products.slice(0, remaining);
        groupProducts = [...groupProducts, ...additionalProducts].slice(0, 4);
      }

      groups.push({
        id: `category-${i + 1}`,
        title: fixedTitles[i],
        href: '/explore',
        products: groupProducts.map((product) => ({
          id: product.id,
          title: product.nameFa,
          price: product.price,
          discount: product.discount,
          image: product.images[0] || '/temp/product-image.webp',
          href: `/products/${product.slug}`,
        })),
      });
    }

    return groups;
  }, [products]);

  if (categories.length === 0) {
    return null;
  }

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
                            discount={product.discount || 0}
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
