'use client';

import LayoutBase from './base';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  const pathname = usePathname();
  const isBase = !pathname?.includes('/dashboard');

  return (
    <div>
      {isBase && <LayoutBase>{props.children}</LayoutBase>}
    </div>
  );
}
