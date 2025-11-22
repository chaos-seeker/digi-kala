import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const search = publicProcedure
  .input(
    z.object({
      query: z.string().min(1),
    }),
  )
  .query(async ({ ctx, input }) => {
    const products = await (ctx.prisma as any).product.findMany({
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
      category: product.category as any,
      brand: product.brand as any,
    }));
  });
