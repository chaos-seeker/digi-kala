import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const create = developmentOnlyProcedure
  .input(
    z.object({
      image: z.string(),
      link: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const heroSlider = await prisma.heroSlider.create({
      data: {
        image: input.image,
        link: input.link,
      },
    });

    return {
      success: true,
      message: 'اسلایدر با موفقیت ایجاد شد',
      data: {
        id: heroSlider.id,
        image: heroSlider.image,
        link: heroSlider.link,
      },
    };
  });
