import { publicProcedure } from '../trpc';

export const getAll = publicProcedure.query(async ({ ctx }) => {
  const stories = await (ctx.prisma as any).story.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return stories.map((story: (typeof stories)[number]) => ({
    id: story.id,
    avatar: story.avatar,
    cover: story.cover,
    title: story.title,
    link: story.link,
  }));
});
