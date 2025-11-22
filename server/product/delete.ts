import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const deleteProduct = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    await (ctx.prisma as any).product.delete({
      where: {
        id: input.id,
      },
    });

    return {
      success: true,
      message: 'محصول با موفقیت حذف شد',
    };
  });
