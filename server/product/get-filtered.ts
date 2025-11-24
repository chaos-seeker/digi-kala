import { publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const getFiltered = publicProcedure
  .input(
    z.object({
      text: z.string().optional(),
      categorySlugs: z.array(z.string()).optional(),
      brandSlugs: z.array(z.string()).optional(),
      sort: z.enum(['newest', 'highest', 'lowest']).default('newest'),
    }),
  )
  .query(async ({ input }) => {
    const where: Record<string, unknown> = {};

    if (input.text) {
      where.nameFa = {
        contains: input.text,
        mode: 'insensitive',
      };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        colors: {
          include: {
            color: true,
          },
        },
      },
    });

    let filteredProducts = products.map((product: any) => ({
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

    if (input.categorySlugs && input.categorySlugs.length > 0) {
      filteredProducts = filteredProducts.filter((product: any) => {
        const category = product.category as any;
        return category && input.categorySlugs?.includes(category.slug);
      });
    }

    if (input.brandSlugs && input.brandSlugs.length > 0) {
      filteredProducts = filteredProducts.filter((product: any) => {
        const brand = product.brand as any;
        return brand && input.brandSlugs?.includes(brand.slug);
      });
    }

    if (input.sort === 'newest') {
      filteredProducts.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (input.sort === 'highest') {
      filteredProducts.sort(
        (a: any, b: any) => (b.price || 0) - (a.price || 0),
      );
    } else if (input.sort === 'lowest') {
      filteredProducts.sort(
        (a: any, b: any) => (a.price || 0) - (b.price || 0),
      );
    }

    return filteredProducts;
  });
