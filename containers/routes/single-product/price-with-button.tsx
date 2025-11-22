import { TProduct } from '@/types/product';
import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';

interface PriceWithButtonProps {
  product: TProduct;
}

export function PriceWithButton({ product }: PriceWithButtonProps) {
  const discount = product.discount ?? 0;
  const priceWithoutDiscount = product.price ?? 0;
  const priceWithDiscount = product.price * (1 - discount / 100);
  const hasDiscount = discount !== 0;

  return (
    <div className="lg:w-80 lg:shrink-0">
      <section className="flex flex-col gap-4 bg-white rounded-lg border p-4">
        <div className="flex items-start justify-between flex-row-reverse">
          <div className="flex flex-col gap-2">
            {hasDiscount && (
              <div className="flex items-center gap-2 flex-row-reverse">
                <div className="flex h-[22px] w-fit gap-1 rounded-lg bg-red-600 px-2">
                  <p className="text-xs font-bold text-white pt-1">
                    {discount}
                  </p>
                  <p className="pt-1 text-[10px] font-bold text-white">%</p>
                </div>
                <del className="text-xs font-normal text-gray-400">
                  {priceWithoutDiscount.toLocaleString('fa-IR')}
                </del>
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <p className="font-normal text-black">
                {priceWithDiscount.toLocaleString('fa-IR')}
              </p>
              <p className="text-xsp font-normal">تومان</p>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {hasDiscount && (
              <p className="text-xsp font-bold text-gray-500">
                قیمت قبل تخفیف :
              </p>
            )}
            <p className="font-bold text-smp text-gray-600">
              قیمت {hasDiscount && <span>با تخفیف</span>} :
            </p>
          </div>
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-medium rounded-lg flex items-center justify-center gap-2">
          <Plus className="size-5" />
          <span>افزودن به سبد خرید</span>
        </Button>
      </section>
    </div>
  );
}
