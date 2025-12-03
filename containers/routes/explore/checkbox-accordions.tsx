'use client';

import { useFiltersLoading } from '@/containers/routes/explore/filters-loading-context';
import { cn } from '@/utils/cn';
import { Check, ChevronDown, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useState } from 'react';

interface CheckboxAccordionsProps {
  categories: Array<{ id: string; title: string; slug: string }>;
  brands: Array<{ id: string; title: string; slug: string }>;
}

export function CheckboxAccordions({
  categories,
  brands,
}: CheckboxAccordionsProps) {
  return (
    <div className="lg:relative">
      <div className="sticky top-3 flex flex-col gap-3 overflow-y-auto">
        <div className="min-w-64">
          <div className="flex flex-col gap-3">
            <SearchTextBadge />
            <CategoriesAccordion categories={categories} />
            <BrandsAccordion brands={brands} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoriesAccordionProps {
  categories: Array<{ id: string; title: string; slug: string }>;
}

const CategoriesAccordion = ({ categories }: CategoriesAccordionProps) => {
  const [isShow, setIsShow] = useState(true);

  return (
    <section className="rounded-lg border lg:rounded-xl">
      <button
        onClick={() => setIsShow((prev) => !prev)}
        className="flex w-full items-center justify-between p-2.5 text-smp font-medium"
      >
        <p className="text-sm text-gray-600 lg:text-smp">دسته‌بندی</p>
        <ChevronDown
          size={18}
          className={cn('transition-all', {
            'rotate-180': isShow,
          })}
        />
      </button>
      <div
        className={cn('h-0 opacity-0 transition-all overflow-hidden', {
          'h-auto opacity-100': isShow,
        })}
      >
        <div className="flex flex-col gap-1.5 border-t p-2.5">
          {categories.length > 0 ? (
            categories.map((category) => (
              <CheckboxItem
                key={category.id}
                slug={category.slug}
                text={category.title}
                query="category"
              />
            ))
          ) : (
            <p className="py-2 text-center text-xs text-gray-400">
              دسته‌بندی یافت نشد
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

interface BrandsAccordionProps {
  brands: Array<{ id: string; title: string; slug: string }>;
}

const BrandsAccordion = ({ brands }: BrandsAccordionProps) => {
  const [isShow, setIsShow] = useState(true);

  return (
    <section className="rounded-lg border lg:rounded-xl">
      <button
        onClick={() => setIsShow((prev) => !prev)}
        className="flex w-full items-center justify-between p-2.5 text-smp font-medium"
      >
        <p className="text-sm text-gray-600 lg:text-smp">برند</p>
        <ChevronDown
          size={18}
          className={cn('transition-all', {
            'rotate-180': isShow,
          })}
        />
      </button>
      <div
        className={cn('h-0 opacity-0 transition-all overflow-hidden', {
          'h-auto opacity-100': isShow,
        })}
      >
        <div className="flex flex-col gap-1.5 border-t p-2.5">
          {brands.length > 0 ? (
            brands.map((brand) => (
              <CheckboxItem
                key={brand.id}
                slug={brand.slug}
                text={brand.title}
                query="brand"
              />
            ))
          ) : (
            <p className="py-2 text-center text-xs text-gray-400">
              برند یافت نشد
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

interface ICheckboxItemProps {
  slug: string;
  text: string;
  query: 'category' | 'brand';
}

const CheckboxItem = ({ slug, text, query }: ICheckboxItemProps) => {
  const { setLoading } = useFiltersLoading();
  const searchParams = useSearchParams();
  const router = useRouter();

  const filterValue = searchParams.get(query) || '';
  const selectedSlugs = filterValue?.split(',').filter(Boolean) || [];
  const isChecked = selectedSlugs.includes(slug);

  const handleCheck = () => {
    setLoading(true);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (isChecked) {
        const updated = selectedSlugs.filter(
          (selectedSlug) => selectedSlug !== slug,
        );
        if (updated.length > 0) {
          params.set(query, updated.join(','));
        } else {
          params.delete(query);
        }
      } else {
        const updated = [...selectedSlugs, slug];
        params.set(query, updated.join(','));
      }
      router.push(`/explore?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCheck}
        className={cn(
          'size-[22px] rounded-md border transition-all border-gray-200 bg-gray flex items-center justify-center',
          { 'bg-primary': isChecked },
        )}
      >
        {isChecked ? <Check className="stroke-white p-0.5" size={14} /> : null}
      </button>
      <p className="text-xsp text-gray-600 lg:text-smp">{text}</p>
    </div>
  );
};

const SearchTextBadge = () => {
  const { setLoading } = useFiltersLoading();
  const searchParams = useSearchParams();
  const router = useRouter();
  const text = searchParams.get('text') || '';

  if (!text) {
    return null;
  }

  const handleRemove = () => {
    setLoading(true);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('text');
      router.push(`/explore?${params.toString()}`);
    });
  };

  return (
    <section className="rounded-lg border lg:rounded-xl">
      <div className="flex items-center justify-between p-2.5">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span
            className="text-sm text-gray-900 lg:text-smp truncate flex-1"
            title={text}
          >
            {text}
          </span>
        </div>
        <button
          onClick={handleRemove}
          className="flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors p-1 shrink-0"
          aria-label="حذف جستجو"
          type="button"
        >
          <X size={16} className="text-gray-600" />
        </button>
      </div>
    </section>
  );
};
