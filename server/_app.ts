import { authenticate } from './auth/authenticate';
import { create as createBrand } from './brand/create';
import { deleteBrand } from './brand/delete';
import { edit as editBrand } from './brand/edit';
import { getAll as getAllBrands } from './brand/get-all';
import { create as createCategory } from './category/create';
import { deleteCategory } from './category/delete';
import { edit as editCategory } from './category/edit';
import { getAll as getAllCategories } from './category/get-all';
import { create as createColor } from './color/create';
import { deleteColor } from './color/delete';
import { edit as editColor } from './color/edit';
import { getAll as getAllColors } from './color/get-all';
import { create } from './hero-slider/create';
import { deleteHeroSlider } from './hero-slider/delete';
import { edit } from './hero-slider/edit';
import { getAll } from './hero-slider/get-all';
import { create as createOrder } from './order/create';
import { getAll as getAllOrders } from './order/get-all';
import { getByUserId as getOrdersByUserId } from './order/get-by-user-id';
import { create as createProduct } from './product/create';
import { deleteProduct } from './product/delete';
import { edit as editProduct } from './product/edit';
import { getAll as getAllProducts } from './product/get-all';
import { getBySlug as getProductBySlug } from './product/get-by-slug';
import { getFiltered as getFilteredProducts } from './product/get-filtered';
import { search as searchProducts } from './product/search';
import { create as createStory } from './story/create';
import { deleteStory } from './story/delete';
import { edit as editStory } from './story/edit';
import { getAll as getAllStories } from './story/get-all';
import { router } from './trpc';
import { getAll as getAllUsers } from './user/get-all';

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
  brand: router({
    getAll: getAllBrands,
    create: createBrand,
    edit: editBrand,
    delete: deleteBrand,
  }),
  color: router({
    getAll: getAllColors,
    create: createColor,
    edit: editColor,
    delete: deleteColor,
  }),
  product: router({
    getAll: getAllProducts,
    getBySlug: getProductBySlug,
    getFiltered: getFilteredProducts,
    create: createProduct,
    edit: editProduct,
    delete: deleteProduct,
    search: searchProducts,
  }),
  order: router({
    create: createOrder,
    getAll: getAllOrders,
    getByUserId: getOrdersByUserId,
  }),
  user: router({
    getAll: getAllUsers,
  }),
});

export type AppRouter = typeof appRouter;
