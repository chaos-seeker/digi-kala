import { developmentOnlyProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const create = developmentOnlyProcedure
  .input(
    z.object({
      avatar: z.string(),
      cover: z.string(),
      title: z.string(),
      link: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const story = await prisma.story.create({
      data: {
        avatar: input.avatar,
        cover: input.cover,
        title: input.title,
        link: input.link,
      },
    });

    return {
      success: true,
      message: 'استوری با موفقیت ایجاد شد',
      data: {
        id: story.id,
        avatar: story.avatar,
        cover: story.cover,
        title: story.title,
        link: story.link,
      },
    };
  });
