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
    const brand = await (ctx.prisma as any).brand.update({
      where: { id: input.id },
      data: {
        title: input.title,
        image: input.image,
        slug: input.slug,
      },
    });

    return {
      success: true,
      message: 'برند با موفقیت ویرایش شد',
      data: {
        id: brand.id,
        title: brand.title,
        image: brand.image,
        slug: brand.slug,
      },
    };
  });
