import { TProduct } from '@/types/product';
import Link from 'next/link';

interface TitleProps {
  product: TProduct;
}

export function Title({ product }: TitleProps) {
  const category = product.category as any;
  const brand = product.brand as any;

  return (
    <section className="flex flex-col gap-2 pt-2">
      <div className="flex flex-col gap-1">
        {brand && category && (
          <p className="text-sm font-medium text-gray-500">
            {brand.slug ? (
              <Link
                href={`/explore?brand=${brand.slug}`}
                className="hover:text-primary transition-colors"
              >
                {brand.title || brand.name}
              </Link>
            ) : (
              <span>{brand.title || brand.name}</span>
            )}{' '}
            /{' '}
            {category.slug ? (
              <Link
                href={`/explore?category=${category.slug}`}
                className="hover:text-primary transition-colors"
              >
                {category.title} {brand.title || brand.name}
              </Link>
            ) : (
              <span>
                {category.title} {brand.title || brand.name}
              </span>
            )}
          </p>
        )}
        <h1 className="text-base font-bold text-gray-800 leading-relaxed line-clamp-2">
          {product.nameFa}
        </h1>
        <p className="text-sm font-medium text-gray-400 line-clamp-1">
          {product.nameEn}
        </p>
      </div>
    </section>
  );
}
