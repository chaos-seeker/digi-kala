import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const deleteHeroSlider = developmentOnlyProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    await prisma.heroSlider.delete({
      where: { id: input.id },
    });

    return {
      success: true,
      message: 'اسلایدر با موفقیت حذف شد',
    };
  });
