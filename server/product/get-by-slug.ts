import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const getBySlug = publicProcedure
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const product = await (ctx.prisma as any).product.findUnique({
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
      category: product.category as any,
      brand: product.brand as any,
    };
  });
