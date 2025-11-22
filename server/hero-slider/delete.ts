import { localhostOnlyProcedure } from '../trpc';
import { z } from 'zod';

export const deleteHeroSlider = localhostOnlyProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.heroSlider.delete({
      where: { id: input.id },
    });

    return {
      success: true,
      message: 'اسلایدر با موفقیت حذف شد',
    };
  });
