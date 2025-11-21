'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';

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
  return (
    <section className="container">
      <div className="border rounded-xl p-4 flex flex-col gap-6 items-center justify-center">
        <div className="flex items-center gap-2">
          <LayoutGrid size={24} className="text-yellow-500" />
          <h2 className="font-medium">خرید بر اساس دسته‌بندی</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="flex flex-col items-center group"
            >
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 mb-2 overflow-hidden duration-300">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
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
