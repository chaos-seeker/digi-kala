import { Button } from '@/ui/button';
import {
  BookOpen,
  Image as ImageIcon,
  LayoutGrid,
  Package,
  Palette,
  Star,
} from 'lucide-react';
import Link from 'next/link';

const dashboardPages = [
  {
    title: 'مدیریت هیرو اسلایدر',
    description: 'مدیریت اسلایدرهای صفحه اصلی',
    href: '/dashboard/hero-slider',
    icon: ImageIcon,
    color: 'bg-blue-500',
  },
  {
    title: 'مدیریت استوری',
    description: 'مدیریت استوری‌های صفحه اصلی',
    href: '/dashboard/story',
    icon: BookOpen,
    color: 'bg-purple-500',
  },
  {
    title: 'مدیریت دسته‌بندی',
    description: 'مدیریت دسته‌بندی‌های محصولات',
    href: '/dashboard/category',
    icon: LayoutGrid,
    color: 'bg-green-500',
  },
  {
    title: 'مدیریت برند',
    description: 'مدیریت برندهای محصولات',
    href: '/dashboard/brand',
    icon: Star,
    color: 'bg-yellow-500',
  },
  {
    title: 'مدیریت رنگ‌ها',
    description: 'مدیریت رنگ‌های محصولات',
    href: '/dashboard/color',
    icon: Palette,
    color: 'bg-pink-500',
  },
  {
    title: 'مدیریت محصولات',
    description: 'مدیریت محصولات فروشگاه',
    href: '/dashboard/product',
    icon: Package,
    color: 'bg-indigo-500',
  },
];

export const QuickAccess = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardPages.map((page) => {
          const Icon = page.icon;
          return (
            <Link key={page.href} href={page.href} className="group block">
              <div className="bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:border-primary">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`${page.color} p-3 rounded-lg text-white`}>
                    <Icon className="size-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {page.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {page.description}
                </p>
                <Button
                  variant="outline"
                  className="w-full hover:bg-red-500 py-4.5 hover:text-white hover:border-red-500 transition-all"
                >
                  مشاهده
                </Button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
