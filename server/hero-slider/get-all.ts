import { publicProcedure } from '../trpc';

export const getAll = publicProcedure.query(async ({ ctx }) => {
  const heroSliders = await ctx.prisma.heroSlider.findMany({
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
