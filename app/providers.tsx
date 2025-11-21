'use client';

import { trpc } from '@/lib/trpc';
import { TooltipProvider } from '@/ui/tooltip';
import { ProgressProvider } from '@bprogress/next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { PropsWithChildren, Suspense, useState } from 'react';
import { Toaster } from 'react-hot-toast';

const Bprogress = (props: PropsWithChildren) => {
  return (
    <ProgressProvider
      height="4px"
      color="#ed1944"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {props.children}
    </ProgressProvider>
  );
};

const ReactQuery = (props: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};

const Nuqs = (props: PropsWithChildren) => {
  return <NuqsAdapter>{props.children}</NuqsAdapter>;
};

const Tooltip = (props: PropsWithChildren) => {
  return <TooltipProvider>{props.children}</TooltipProvider>;
};

const HotToast = () => {
  return <Toaster position="top-center" containerClassName="toaster-wrapper" />;
};

export const Providers = (props: PropsWithChildren) => {
  return (
    <>
      <Bprogress>
        <ReactQuery>
          <Nuqs>
            <Tooltip>
              <Suspense>
                <HotToast />
                {props.children}
              </Suspense>
            </Tooltip>
          </Nuqs>
        </ReactQuery>
      </Bprogress>
    </>
  );
};
