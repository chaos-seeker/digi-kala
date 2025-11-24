import { publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';

export const getAll = publicProcedure.query(async () => {
  const colors = await prisma.color.findMany({
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
