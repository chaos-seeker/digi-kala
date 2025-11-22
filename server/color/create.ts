import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const create = publicProcedure
  .input(
    z.object({
      name: z.string(),
      hex: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const color = await (ctx.prisma as any).color.create({
      data: {
        name: input.name,
        hex: input.hex,
      },
    });

    return {
      success: true,
      message: 'رنگ با موفقیت ایجاد شد',
      data: {
        id: color.id,
        name: color.name,
        hex: color.hex,
      },
    };
  });
