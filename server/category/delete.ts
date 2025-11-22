import { localhostOnlyProcedure } from '../trpc';
import { z } from 'zod';

export const deleteCategory = localhostOnlyProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    await (ctx.prisma as any).category.delete({
      where: { id: input.id },
    });

    return {
      success: true,
      message: 'دسته‌بندی با موفقیت حذف شد',
    };
  });
