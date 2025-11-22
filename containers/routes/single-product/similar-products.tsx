'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import { ProductCard } from '@/components/product-card';
import { TProduct } from '@/types/product';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SimilarProductsProps {
  products: TProduct[];
}

export function SimilarProducts({ products }: SimilarProductsProps) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, [products]);

  return (
    <section className="container">
      <div className="border rounded-xl p-4">
        <p className="border-b border-primary pb-1.5 text-smp font-bold text-gray-700 w-fit mb-3">
          کالا های مشابه
        </p>
        <div className="relative group">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView="auto"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            navigation={{
              nextEl: '.similar-products-slider-next',
              prevEl: '.similar-products-slider-prev',
              enabled: true,
            }}
            className="similar-products-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="w-[180px]!">
                <ProductCard
                  id={product.id}
                  title={product.nameFa}
                  price={product.price}
                  discount={product.discount || 0}
                  image={product.images[0]}
                  href={`/products/${product.slug}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {!isEnd && (
            <div className="similar-products-slider-next absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-center size-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300 shadow-sm">
                <ChevronLeft className="size-5" />
              </div>
            </div>
          )}
          {!isBeginning && (
            <div className="similar-products-slider-prev absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-center size-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-300 shadow-sm">
                <ChevronRight className="size-5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
