import { localhostOnlyProcedure } from '../trpc';
import { z } from 'zod';

export const create = localhostOnlyProcedure
  .input(
    z.object({
      avatar: z.string(),
      cover: z.string(),
      title: z.string(),
      link: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const story = await (ctx.prisma as any).story.create({
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
