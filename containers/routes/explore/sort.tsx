'use client';

import { useFiltersLoading } from '@/containers/routes/explore/filters-loading-context';
import { cn } from '@/utils/cn';
import { useSearchParams, useRouter } from 'next/navigation';
import { startTransition, useEffect, useState } from 'react';

interface SortProps {
  initialSort?: 'newest' | 'highest' | 'lowest';
}

export function Sort({ initialSort = 'newest' }: SortProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setLoading } = useFiltersLoading();
  const urlSort =
    (searchParams.get('sort') as 'newest' | 'highest' | 'lowest') ||
    initialSort;
  const [activeSort, setActiveSort] = useState<'newest' | 'highest' | 'lowest'>(
    urlSort,
  );

  useEffect(() => {
    if (urlSort) {
      setActiveSort(urlSort);
    }
  }, [urlSort]);

  const handleSort = (value: 'newest' | 'highest' | 'lowest') => {
    setActiveSort(value);
    setLoading(true);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', value);
      router.push(`/explore?${params.toString()}`);
    });
  };

  const sortOptions: Array<{
    title: string;
    value: 'newest' | 'highest' | 'lowest';
  }> = [
    { title: 'جدید ترین', value: 'newest' },
    { title: 'گران ترین', value: 'highest' },
    { title: 'ارزان ترین', value: 'lowest' },
  ];

  return (
    <div>
      <ul className="flex gap-2 text-sm font-medium text-gray-500">
        {sortOptions.map((item) => (
          <li key={item.value} className="hover:text-primary">
            <button
              className={cn({
                'text-primary font-bold': activeSort === item.value,
              })}
              onClick={() => handleSort(item.value)}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
