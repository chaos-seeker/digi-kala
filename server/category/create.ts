import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const create = developmentOnlyProcedure
  .input(
    z.object({
      title: z.string(),
      image: z.string(),
      slug: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const category = await prisma.category.create({
      data: {
        title: input.title,
        image: input.image,
        slug: input.slug,
      },
    });

    return {
      success: true,
      message: 'دسته‌بندی با موفقیت ایجاد شد',
      data: {
        id: category.id,
        title: category.title,
        image: category.image,
        slug: category.slug,
      },
    };
  });
