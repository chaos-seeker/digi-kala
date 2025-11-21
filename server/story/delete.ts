import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const deleteStory = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    await (ctx.prisma as any).story.delete({
      where: { id: input.id },
    });

    return {
      success: true,
      message: 'استوری با موفقیت حذف شد',
    };
  });
