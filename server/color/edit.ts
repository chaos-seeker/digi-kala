import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const edit = developmentOnlyProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
      hex: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const color = await prisma.color.update({
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
