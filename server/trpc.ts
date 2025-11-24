import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const developmentOnlyProcedure = t.procedure.use(({ next }) => {
  if (process.env.NODE_ENV !== 'development') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'دسترسی محدود شده!',
    });
  }

  return next();
});
