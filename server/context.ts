import type { Context } from './trpc';
import { prisma } from '@/lib/prisma';

export const createContext = async (opts?: {
  headers?: Headers;
}): Promise<Context> => {
  let isLocalhost = false;

  if (opts?.headers) {
    const hostname =
      opts.headers.get('host') ||
      opts.headers.get('x-forwarded-host') ||
      '';
    isLocalhost =
      hostname.includes('localhost') ||
      hostname.includes('127.0.0.1') ||
      hostname.includes('::1');
  } else {
    isLocalhost = process.env.NODE_ENV === 'development';
  }

  return {
    prisma,
    isLocalhost,
  };
};


