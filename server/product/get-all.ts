import { publicProcedure } from '../trpc';

export const getAll = publicProcedure.query(async ({ ctx }) => {
  const products = await (ctx.prisma as any).product.findMany({
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
  }));
});
