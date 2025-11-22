import { publicProcedure } from '../trpc';

export const getAll = publicProcedure.query(async ({ ctx }) => {
  const colors = await (ctx.prisma as any).color.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return colors.map((color: any) => ({
    id: color.id,
    name: color.name,
    hex: color.hex,
    createdAt: color.createdAt,
    updatedAt: color.updatedAt,
  }));
});
