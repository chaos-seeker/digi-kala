import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

export const authRouter = router({
  authenticate: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        password: z.string().min(1),
        fullName: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.prisma.user.findUnique({
        where: { username: input.username },
      });
      if (!existingUser) {
        const newUser = await ctx.prisma.user.create({
          data: {
            username: input.username,
            password: input.password,
            fullName: input.fullName,
          },
        });
        return {
          success: true,
          message: 'حساب کاربری با موفقیت ایجاد شد',
          user: {
            id: newUser.id,
            username: newUser.username,
            fullName: newUser.fullName,
          },
        };
      }
      if (
        existingUser.password !== input.password ||
        existingUser.fullName !== input.fullName
      ) {
        throw new Error('رمز عبور یا نام و نام خانوادگی اشتباه است');
      }
      return {
        success: true,
        message: 'ورود با موفقیت انجام شد',
        user: {
          id: existingUser.id,
          username: existingUser.username,
          fullName: existingUser.fullName,
        },
      };
    }),
});
