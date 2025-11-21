import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const create = publicProcedure
  .input(
    z.object({
      title: z.string(),
      image: z.string(),
      slug: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const category = await (ctx.prisma as any).category.create({
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
