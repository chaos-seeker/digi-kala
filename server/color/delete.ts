import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const deleteColor = developmentOnlyProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    await prisma.color.delete({
      where: {
        id: input.id,
      },
    });

    return {
      success: true,
      message: 'رنگ با موفقیت حذف شد',
    };
  });
