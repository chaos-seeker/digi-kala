import { TProduct } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface TitleProps {
  product: TProduct;
}

export function Title({ product }: TitleProps) {
  const brand = product.brand as any;

  return (
    <section className="flex flex-col gap-2 pt-2">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Image
            src={brand.image}
            alt={brand.title || brand.name}
            width={24}
            height={24}
            className="object-contain"
          />
          <p className="text-sm font-medium text-gray-500">
            <Link
              href={`/explore?brand=${brand.slug}`}
              className="hover:text-primary transition-colors"
            >
              {brand.title || brand.name}
            </Link>
          </p>
        </div>
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
