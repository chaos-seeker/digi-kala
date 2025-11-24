import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const deleteProduct = developmentOnlyProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    await prisma.product.delete({
      where: {
        id: input.id,
      },
    });

    return {
      success: true,
      message: 'محصول با موفقیت حذف شد',
    };
  });
