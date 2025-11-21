'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/utils/format-price';

type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  discount?: number;
  image: string;
  href: string;
  rating?: number;
  reviewCount?: number;
};

export const ProductCard = (props: ProductCardProps) => {
  const discountedPrice = props.discount
    ? props.price - (props.price * props.discount) / 100
    : props.price;

  return (
    <Link href={props.href} className="block group">
      <div className="bg-white hover:border-gray-300 transition-colors duration-200 overflow-hidden h-full">
        <div className="relative aspect-square p-2">
          <Image
            src={props.image}
            alt={props.title}
            fill
            className="object-contain transition-transform duration-300"
          />
        </div>

        <div className="p-2 pt-2">
          <h3 className="text-xsp font-medium text-gray-800 mb-2 line-clamp-2 leading-4 min-h-[2rem]">
            {props.title}
          </h3>

          <div className="flex items-center justify-between">
            {props.discount && (
              <div className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                {props.discount.toLocaleString('fa-IR')}%
              </div>
            )}

            <div className="flex flex-col items-end">
              {props.discount && (
                <span className="text-xs text-gray-400 line-through mb-0.5">
                  {formatPrice(props.price)}
                </span>
              )}
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-900">
                  {formatPrice(Math.round(discountedPrice))}
                </span>
                <span className="text-xsp font-bold text-gray-900">تومان</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
