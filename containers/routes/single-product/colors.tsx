'use client';

import { TProduct } from '@/types/product';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface ColorsProps {
  product: TProduct;
  selectedColorId?: string;
  onColorSelect?: (colorId: string) => void;
}

export function Colors({
  product,
  selectedColorId: initialSelectedColorId,
  onColorSelect,
}: ColorsProps) {
  const [selectedColorId, setSelectedColorId] = useState<string | undefined>(
    initialSelectedColorId ||
      (product.colors.length > 0 ? product.colors[0].id : undefined),
  );

  if (product.colors.length === 0) return null;

  const handleColorSelect = (colorId: string) => {
    setSelectedColorId(colorId);
    onColorSelect?.(colorId);
  };

  const selectedColor = product.colors.find((c) => c.id === selectedColorId);

  return (
    <div className="mt-6">
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-700">رنگ:</p>
          {selectedColor && (
            <p className="text-sm font-medium text-gray-600">
              {selectedColor.name}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {product.colors.map((color) => (
            <Tooltip key={color.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleColorSelect(color.id)}
                  className={cn(
                    'relative size-9 rounded-full border-2 transition-all',
                    selectedColorId === color.id
                      ? 'ring-2 ring-primary'
                      : 'hover:ring-2 hover:ring-gray-400',
                  )}
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedColorId === color.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center">
                        <Check className="size-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>
    </div>
  );
}
