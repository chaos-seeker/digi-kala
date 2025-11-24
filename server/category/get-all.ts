import { publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';

export const getAll = publicProcedure.query(async () => {
  const categories = await prisma.category.findMany({
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
