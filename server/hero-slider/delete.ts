import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const deleteHeroSlider = publicProcedure
  .input(
    z.object({
      id: z.string().min(1, 'شناسه الزامی است'),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const existingSlider = await ctx.prisma.heroSlider.findUnique({
      where: { id: input.id },
    });

    if (!existingSlider) {
      throw new Error('اسلایدر یافت نشد');
    }

    await ctx.prisma.heroSlider.delete({
      where: { id: input.id },
    });

    return {
      success: true,
      message: 'اسلایدر با موفقیت حذف شد',
    };
  });
