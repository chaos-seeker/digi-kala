import { publicProcedure } from '../trpc';

export const getAll = publicProcedure.query(async ({ ctx }) => {
  const prisma = ctx.prisma as any;

  const orders = await prisma.$queryRaw`
    SELECT 
      o.*,
      json_build_object(
        'id', u.id,
        'username', u.username,
        'fullName', u.full_name
      ) as user
    FROM orders o
    INNER JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `;

  return orders.map((order: any) => ({
    id: order.id,
    userId: order.user_id,
    originalAmount: parseFloat(order.original_amount),
    discount: parseFloat(order.discount),
    amount: parseFloat(order.amount),
    createdAt: new Date(order.created_at),
    updatedAt: new Date(order.updated_at),
    user: order.user,
  }));
});
