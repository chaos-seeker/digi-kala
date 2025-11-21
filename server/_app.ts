import { authenticate } from './auth/authenticate';
import { create as createCategory } from './category/create';
import { deleteCategory } from './category/delete';
import { edit as editCategory } from './category/edit';
import { getAll as getAllCategories } from './category/get-all';
import { create } from './hero-slider/create';
import { deleteHeroSlider } from './hero-slider/delete';
import { edit } from './hero-slider/edit';
import { getAll } from './hero-slider/get-all';
import { create as createStory } from './story/create';
import { deleteStory } from './story/delete';
import { edit as editStory } from './story/edit';
import { getAll as getAllStories } from './story/get-all';
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
  story: router({
    getAll: getAllStories,
    create: createStory,
    edit: editStory,
    delete: deleteStory,
  }),
  category: router({
    getAll: getAllCategories,
    create: createCategory,
    edit: editCategory,
    delete: deleteCategory,
  }),
});

export type AppRouter = typeof appRouter;
