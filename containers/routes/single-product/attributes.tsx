import { TProduct } from '@/types/product';

interface AttributesProps {
  product: TProduct;
}

export function Attributes({ product }: AttributesProps) {
  return (
    <div className="mt-6">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <p className="text-sm font-bold text-gray-700">ویژگی ها</p>
          <span className="h-px grow bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {product.attributes.map((item) => {
            return (
              <div
                key={item.key}
                className="flex flex-col gap-1 bg-gray-100 rounded-lg p-3"
              >
                <p className="text-sm font-medium text-gray-600">{item.key}</p>
                <p className="text-sm font-medium text-gray-500">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
