import { authenticate } from './auth/authenticate';
import { router } from './trpc';

export const appRouter = router({
  auth: router({
    authenticate,
  }),
});

export type AppRouter = typeof appRouter;
