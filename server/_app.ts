import { authenticate } from './auth/authenticate';
import { create } from './hero-slider/create';
import { deleteHeroSlider } from './hero-slider/delete';
import { edit } from './hero-slider/edit';
import { getAll } from './hero-slider/get-all';
import { router } from './trpc';

export const appRouter = router({
  auth: router({
    authenticate,
  }),
  heroSlider: router({
    getAll,
    create,
    edit,
    delete: deleteHeroSlider,
  }),
});

export type AppRouter = typeof appRouter;
