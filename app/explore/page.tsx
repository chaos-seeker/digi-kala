import { FiltersLoadingProvider } from '@/containers/routes/explore/filters-loading-context';
import { CheckboxAccordions } from '@/containers/routes/explore/checkbox-accordions';
import { Products } from '@/containers/routes/explore/products';
import { Sort } from '@/containers/routes/explore/sort';
import { appRouter } from '@/server/_app';
import { createContext } from '@/server/context';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    text?: string;
    sort?: 'newest' | 'highest' | 'lowest';
    category?: string;
    brand?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const text = params.text || '';
  const sort = params.sort || 'newest';
  const filterCategory = params.category || '';
  const filterBrand = params.brand || '';

  const categorySlugs = filterCategory?.split(',').filter(Boolean) || [];
  const brandSlugs = filterBrand?.split(',').filter(Boolean) || [];

  const caller = appRouter.createCaller(await createContext());

  const [productsResult, categoriesResult, brandsResult] = await Promise.all([
    caller.product.getFiltered({
      text: text || undefined,
      categorySlugs: categorySlugs.length > 0 ? categorySlugs : undefined,
      brandSlugs: brandSlugs.length > 0 ? brandSlugs : undefined,
      sort: sort || 'newest',
    }),
    caller.category.getAll(),
    caller.brand.getAll(),
  ]);

  const initialProducts = productsResult || [];
  const categories = categoriesResult || [];
  const brands = brandsResult || [];

  return (
    <FiltersLoadingProvider>
      <div className="container relative z-10 flex size-full flex-col gap-3 w-full">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 transition-all hover:text-primary"
          >
            فروشگاه
          </Link>
          <span className="h-px grow bg-gray-200" />
          <Sort initialSort={sort} />
        </div>
        <div className="flex lg:gap-3">
          <CheckboxAccordions categories={categories} brands={brands} />
          <div className="grid flex-1 gap-3">
            <Products initialProducts={initialProducts} />
          </div>
        </div>
      </div>
    </FiltersLoadingProvider>
  );
}
