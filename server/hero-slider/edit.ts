import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const edit = developmentOnlyProcedure
  .input(
    z.object({
      id: z.string(),
      image: z.string(),
      link: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const heroSlider = await prisma.heroSlider.update({
      where: { id: input.id },
      data: {
        image: input.image,
        link: input.link,
      },
    });

    return {
      success: true,
      message: 'اسلایدر با موفقیت ویرایش شد',
      data: {
        id: heroSlider.id,
        image: heroSlider.image,
        link: heroSlider.link,
      },
    };
  });
