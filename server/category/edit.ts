import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const edit = publicProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string(),
      image: z.string(),
      slug: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const category = await (ctx.prisma as any).category.update({
      where: { id: input.id },
      data: {
        title: input.title,
        image: input.image,
        slug: input.slug,
      },
    });

    return {
      success: true,
      message: 'دسته‌بندی با موفقیت ویرایش شد',
      data: {
        id: category.id,
        title: category.title,
        image: category.image,
        slug: category.slug,
      },
    };
  });
