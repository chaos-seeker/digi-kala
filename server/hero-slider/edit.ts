import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const edit = publicProcedure
  .input(
    z.object({
      id: z.string(),
      image: z.string(),
      link: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const heroSlider = await ctx.prisma.heroSlider.update({
      where: { id: input.id },
      data: {
        image: input.image,
        link: input.link,
      },
    });

    return {
      success: true,
      message: 'اسلایدر با موفقیت ویرایش شد',
      data: {
        id: heroSlider.id,
        image: heroSlider.image,
        link: heroSlider.link,
      },
    };
  });
