import { TProduct } from '@/types/product';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbProps {
  product: TProduct;
}

export function Breadcrumb({ product }: BreadcrumbProps) {
  const category = product.category as any;

  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-fit items-center gap-1">
        <Link
          href="/"
          className="text-sm font-medium text-gray-500 transition-all hover:text-primary"
        >
          دیجی کالا
        </Link>
        {category?.title && (
          <>
            <ChevronLeft className="stroke-gray-500 text-sm" />
            <Link
              href={`/explore?category=${category.slug}`}
              className="text-sm font-medium text-gray-500 transition-all hover:text-primary"
            >
              {category.title}
            </Link>
          </>
        )}
        <ChevronLeft className="stroke-gray-500 text-sm" />
        <p className="text-sm font-medium text-gray-500">{product.nameFa}</p>
      </div>
      <span className="h-px grow bg-gray-200" />
    </div>
  );
}
