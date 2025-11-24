import { publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const search = publicProcedure
  .input(
    z.object({
      query: z.string().min(1),
    }),
  )
  .query(async ({ input }) => {
    const products = await prisma.product.findMany({
      where: {
        nameFa: {
          contains: input.query,
          mode: 'insensitive',
        },
      },
      include: {
        colors: {
          include: {
            color: true,
          },
        },
      },
      take: 10,
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
      category: product.category as any,
      brand: product.brand as any,
    }));
  });
