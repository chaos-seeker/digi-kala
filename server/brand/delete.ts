import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const deleteBrand = developmentOnlyProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    await prisma.brand.delete({
      where: { id: input.id },
    });

    return {
      success: true,
      message: 'برند با موفقیت حذف شد',
    };
  });
