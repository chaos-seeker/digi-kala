import { localhostOnlyProcedure } from '../trpc';
import { z } from 'zod';

export const edit = localhostOnlyProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
      hex: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const color = await (ctx.prisma as any).color.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        hex: input.hex,
      },
    });

    return {
      success: true,
      message: 'رنگ با موفقیت ویرایش شد',
      data: {
        id: color.id,
        name: color.name,
        hex: color.hex,
      },
    };
  });
