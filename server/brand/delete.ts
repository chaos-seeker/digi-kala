import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const deleteBrand = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    await (ctx.prisma as any).brand.delete({
      where: { id: input.id },
    });

    return {
      success: true,
      message: 'برند با موفقیت حذف شد',
    };
  });
