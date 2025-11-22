import { TUser } from '@/types/user';
import { PrismaClient } from '@prisma/client';
import { initTRPC, TRPCError } from '@trpc/server';

export interface Context {
  prisma: PrismaClient;
  user?: TUser | null;
  isLocalhost?: boolean;
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'لطفا وارد حساب کاربری خود شوید',
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const localhostOnlyProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.isLocalhost) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'دسترسی محدود شده!',
    });
  }
  return next({ ctx });
});
