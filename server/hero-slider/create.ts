import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const create = publicProcedure
  .input(
    z.object({
      image: z.string().min(1, 'تصویر الزامی است'),
      link: z.string().min(1, 'لینک الزامی است'),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const heroSlider = await ctx.prisma.heroSlider.create({
      data: {
        image: input.image,
        link: input.link,
      },
    });

    return {
      success: true,
      message: 'اسلایدر با موفقیت ایجاد شد',
      data: {
        id: heroSlider.id,
        image: heroSlider.image,
        link: heroSlider.link,
      },
    };
  });

