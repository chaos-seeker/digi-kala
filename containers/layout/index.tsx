'use client';

import LayoutBase from './base';
import LayoutDashboard from './dashboard';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  const pathname = usePathname();
  const isAuth = pathname?.includes('/auth');
  const isDashboard = pathname?.includes('/dashboard');

  if (isAuth) {
    return props.children;
  }

  if (isDashboard) {
    return <LayoutDashboard>{props.children}</LayoutDashboard>;
  }

  return <LayoutBase>{props.children}</LayoutBase>;
}
