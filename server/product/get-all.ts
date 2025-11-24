import { publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';

export const getAll = publicProcedure.query(async () => {
  const products = await prisma.product.findMany({
    include: {
      colors: {
        include: {
          color: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return products.map((product: any) => ({
    ...product,
    colors: product.colors.map((pc: any) => pc.color),
    attributes:
      product.attributes && Array.isArray(product.attributes)
        ? product.attributes.map((attr: any) => ({
            key: attr.key,
            value: attr.value,
          }))
        : [],
  }));
});
