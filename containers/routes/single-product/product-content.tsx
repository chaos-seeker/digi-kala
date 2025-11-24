'use client';

import { Attributes } from '@/containers/routes/single-product/attributes';
import { Colors } from '@/containers/routes/single-product/colors';
import { Images } from '@/containers/routes/single-product/images';
import { PriceWithButton } from '@/containers/routes/single-product/price-with-button';
import { Title } from '@/containers/routes/single-product/title';
import { TProduct } from '@/types/product';
import { useState } from 'react';

interface ProductContentProps {
  product: TProduct;
}

export function ProductContent({ product }: ProductContentProps) {
  const [selectedColorId, setSelectedColorId] = useState<string | undefined>(
    product.colors.length > 0 ? product.colors[0].id : undefined,
  );

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <Images product={product} />
      <div className="flex-1 min-w-0">
        <Title product={product} />
        <Colors
          product={product}
          selectedColorId={selectedColorId}
          onColorSelect={setSelectedColorId}
        />
        <Attributes product={product} />
      </div>
      <PriceWithButton product={product} selectedColorId={selectedColorId} />
    </div>
  );
}
