import { publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const getBySlug = publicProcedure
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const product = await prisma.product.findUnique({
      where: {
        slug: input.slug,
      },
      include: {
        colors: {
          include: {
            color: true,
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return {
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
    };
  });
