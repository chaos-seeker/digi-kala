import { TProduct } from '@/types/product';

interface DescriptionProps {
  product: TProduct;
}

export function Description({ product }: DescriptionProps) {
  return (
    <div className="container">
      <div className="border rounded-xl p-4">
        <p className="border-b border-primary pb-1.5 text-smp font-bold text-gray-700 w-fit mb-3">
          توضیحات
        </p>
        <p className="text-sm font-medium text-gray-500">
          {product.description}
        </p>
      </div>
    </div>
  );
}

