import type { Context } from './trpc';
import { prisma } from '@/lib/prisma';

export const createContext = async (): Promise<Context> => {
  return {
    prisma,
  };
};

