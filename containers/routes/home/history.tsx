'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { cn } from '@/utils/cn';
import { HistoryIcon } from 'lucide-react';

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
  return (
    <section className="container">
      <div className="border p-4 rounded-xl flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <HistoryIcon size={24} className="text-yellow-500" />
          <h2 className="font-medium">بر اساس سلیقه شما</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={cn(
                'flex flex-col gap-4',
                index % 2 === 0 && 'md:border-l md:border-gray-200 md:pl-4',
                index % 4 !== 3 && 'lg:border-l lg:border-gray-200 lg:pl-4',
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
                  <ChevronLeft size={16} />
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
