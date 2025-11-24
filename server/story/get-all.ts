import { publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';

export const getAll = publicProcedure.query(async () => {
  const stories = await prisma.story.findMany({
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
