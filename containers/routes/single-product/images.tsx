'use client';

import 'swiper/css';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TProduct } from '@/types/product';

interface ImagesProps {
  product: TProduct;
}

export function Images({ product }: ImagesProps) {
  const swiperImageMainRef = useRef<any>(null);
  const swiperImagesRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="lg:w-[400px] lg:shrink-0">
      <section className="flex flex-col xl:max-w-[382px]">
        <div className="my-3 flex w-full justify-center">
          <Swiper
            ref={swiperImageMainRef}
            onSwiper={(swiper) => (swiperImageMainRef.current = swiper)}
            onSlideChange={(swiper) => {
              const newIndex = swiper.activeIndex;
              swiperImagesRef.current?.slideTo(newIndex);
              setActiveIndex(newIndex);
            }}
            slidesPerView={1}
            spaceBetween={8}
            className="container"
          >
            {product.images.map((item) => (
              <SwiperSlide key={item}>
                <div className="flex w-full justify-center rounded-lg border p-2">
                  <Image
                    src={item || '/temp/product-image.webp'}
                    alt={product.nameFa}
                    width={260}
                    height={260}
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {product.images.length > 1 && (
          <div className="flex justify-center">
            <Swiper
              slidesPerView="auto"
              onSwiper={(swiper) => (swiperImagesRef.current = swiper)}
              spaceBetween={8}
              ref={swiperImagesRef}
              id="product-images-slider"
              className="container w-fit"
            >
              {product.images.map((item, index) => (
                <SwiperSlide key={item} className="!w-[70px] rounded-lg">
                  <button
                    onClick={() => {
                      setActiveIndex(index);
                      swiperImagesRef.current?.slideTo(index);
                      swiperImageMainRef.current?.slideTo(index);
                    }}
                    className={cn('rounded-lg border p-1.5 overflow-hidden', {
                      'border-primary': activeIndex === index,
                      'border-gray-200': activeIndex !== index,
                    })}
                  >
                    <Image
                      src={item || '/temp/product-image.webp'}
                      alt={product.nameFa}
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>
    </div>
  );
}
