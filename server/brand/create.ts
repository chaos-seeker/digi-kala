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
    const brand = await prisma.brand.create({
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
