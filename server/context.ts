import type { Context } from './trpc';
import { prisma } from '@/lib/prisma';

export const createContext = async (): Promise<Context> => {
  console.log('Creating context with prisma:', !!prisma);
  return {
    prisma,
  };
};


