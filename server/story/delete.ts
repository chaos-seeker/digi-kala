import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const deleteStory = developmentOnlyProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    await prisma.story.delete({
      where: { id: input.id },
    });

    return {
      success: true,
      message: 'استوری با موفقیت حذف شد',
    };
  });
