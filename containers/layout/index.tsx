'use client';

import LayoutBase from './base';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  const pathname = usePathname();
  const isAuth = pathname?.includes('/auth');

  if (isAuth) {
    return props.children;
  }

  return <LayoutBase>{props.children}</LayoutBase>;
}
