import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryProps {
  category: {
    text: string;
    image: string;
    path: string;
  };
}

export function Category({ category }: CategoryProps) {
  return (
    <section>
      <Link
        href={category.path}
        className="flex items-center justify-between rounded-lg border p-3 hover:border-primary transition-colors"
      >
        <Image
          src={category.image}
          alt={category.text}
          width={75}
          height={75}
          className="object-cover rounded-lg"
        />
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <p className="text-sm font-bold text-gray-500">
              مشاهده تمام محصولات
            </p>
            <p className="font-bold text-gray-600">{category.text}</p>
          </div>
          <ChevronLeft className="text-gray-400" />
        </div>
      </Link>
    </section>
  );
}

