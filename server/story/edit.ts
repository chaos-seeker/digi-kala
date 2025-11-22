import { localhostOnlyProcedure } from '../trpc';
import { z } from 'zod';

export const edit = localhostOnlyProcedure
  .input(
    z.object({
      id: z.string(),
      avatar: z.string(),
      cover: z.string(),
      title: z.string(),
      link: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const story = await (ctx.prisma as any).story.update({
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
