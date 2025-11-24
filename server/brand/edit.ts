import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const edit = developmentOnlyProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string(),
      image: z.string(),
      slug: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const brand = await prisma.brand.update({
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
