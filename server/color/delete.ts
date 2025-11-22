import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const deleteColor = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    await (ctx.prisma as any).color.delete({
      where: {
        id: input.id,
      },
    });

    return {
      success: true,
      message: 'رنگ با موفقیت حذف شد',
    };
  });
