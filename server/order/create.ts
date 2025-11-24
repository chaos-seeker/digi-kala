import { publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const create = publicProcedure
  .input(
    z.object({
      userId: z.string(),
      originalAmount: z.number(),
      discount: z.number().default(0),
      amount: z.number(),
    }),
  )
  .mutation(async ({ input }) => {
    const orderResult = await prisma.$queryRaw`
      INSERT INTO orders (id, user_id, original_amount, discount, amount, created_at, updated_at)
      VALUES (gen_random_uuid()::text, ${input.userId}, ${input.originalAmount}, ${input.discount}, ${input.amount}, NOW(), NOW())
      RETURNING *
    `;

    const order = Array.isArray(orderResult) ? orderResult[0] : orderResult;

    const user = await prisma.user.findUnique({
      where: { id: input.userId },
    });

    return {
      success: true,
      message: 'سفارش با موفقیت ثبت شد',
      data: {
        ...order,
        user,
      },
    };
  });
