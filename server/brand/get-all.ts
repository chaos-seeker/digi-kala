import { publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';

export const getAll = publicProcedure.query(async () => {
  const brands = await prisma.brand.findMany({
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
