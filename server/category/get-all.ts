import { publicProcedure } from '../trpc';

export const getAll = publicProcedure.query(async ({ ctx }) => {
  const categories = await (ctx.prisma as any).category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return categories.map((category: any) => ({
    id: category.id,
    title: category.title,
    image: category.image,
    slug: category.slug,
  }));
});
