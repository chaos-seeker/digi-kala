import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const edit = developmentOnlyProcedure
  .input(
    z.object({
      id: z.string(),
      avatar: z.string(),
      cover: z.string(),
      title: z.string(),
      link: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const story = await prisma.story.update({
      where: { id: input.id },
      data: {
        avatar: input.avatar,
        cover: input.cover,
        title: input.title,
        link: input.link,
      },
    });

    return {
      success: true,
      message: 'استوری با موفقیت ویرایش شد',
      data: {
        id: story.id,
        avatar: story.avatar,
        cover: story.cover,
        title: story.title,
        link: story.link,
      },
    };
  });
