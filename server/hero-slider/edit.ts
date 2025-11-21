import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const edit = publicProcedure
  .input(
    z.object({
      id: z.string().min(1, 'شناسه الزامی است'),
      image: z.string().min(1, 'تصویر الزامی است'),
      link: z.string().min(1, 'لینک الزامی است'),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const existingSlider = await ctx.prisma.heroSlider.findUnique({
      where: { id: input.id },
    });

    if (!existingSlider) {
      throw new Error('اسلایدر یافت نشد');
    }

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
