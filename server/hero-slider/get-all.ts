import { publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';

export const getAll = publicProcedure.query(async () => {
  const heroSliders = await prisma.heroSlider.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return heroSliders.map((slider: (typeof heroSliders)[number]) => ({
    id: slider.id,
    image: slider.image,
    link: slider.link,
  }));
});
