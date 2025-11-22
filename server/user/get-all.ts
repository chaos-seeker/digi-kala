import { publicProcedure } from '../trpc';

export const getAll = publicProcedure.query(async ({ ctx }) => {
  const prisma = ctx.prisma as any;

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      username: true,
      fullName: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users.map((user: any) => ({
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  }));
});


