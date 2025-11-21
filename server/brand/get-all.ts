import { publicProcedure } from '../trpc';

export const getAll = publicProcedure.query(async ({ ctx }) => {
  const brands = await (ctx.prisma as any).brand.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return brands.map((brand: any) => ({
    id: brand.id,
    title: brand.title,
    image: brand.image,
    slug: brand.slug,
  }));
});
