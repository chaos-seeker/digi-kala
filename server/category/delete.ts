import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const deleteCategory = developmentOnlyProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    await prisma.category.delete({
      where: { id: input.id },
    });

    return {
      success: true,
      message: 'دسته‌بندی با موفقیت حذف شد',
    };
  });
