import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const create = developmentOnlyProcedure
  .input(
    z.object({
      name: z.string(),
      hex: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const color = await prisma.color.create({
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
