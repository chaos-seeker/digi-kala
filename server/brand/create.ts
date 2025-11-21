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
    const brand = await (ctx.prisma as any).brand.create({
      data: {
        title: input.title,
        image: input.image,
        slug: input.slug,
      },
    });

    return {
      success: true,
      message: 'برند با موفقیت ایجاد شد',
      data: {
        id: brand.id,
        title: brand.title,
        image: brand.image,
        slug: brand.slug,
      },
    };
  });
