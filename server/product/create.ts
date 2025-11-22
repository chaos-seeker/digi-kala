import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const create = publicProcedure
  .input(
    z.object({
      nameFa: z.string(),
      nameEn: z.string(),
      price: z.number(),
      discount: z.number().default(0),
      images: z.array(z.string()),
      colors: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          hex: z.string(),
        }),
      ),
      attributes: z.array(
        z.object({
          key: z.string(),
          value: z.string(),
        }),
      ),
      description: z.string(),
      category: z.object({
        id: z.string(),
        title: z.string(),
        image: z.string(),
        slug: z.string(),
      }),
      brand: z.object({
        id: z.string(),
        title: z.string(),
        image: z.string(),
        slug: z.string(),
      }),
      slug: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const product = await (ctx.prisma as any).product.create({
      data: {
        nameFa: input.nameFa,
        nameEn: input.nameEn,
        price: input.price,
        discount: input.discount,
        images: input.images,
        attributes: input.attributes,
        description: input.description,
        category: input.category,
        brand: input.brand,
        slug: input.slug,
        colors: {
          create: input.colors.map((color) => ({
            colorId: color.id,
          })),
        },
      },
      include: {
        colors: {
          include: {
            color: true,
          },
        },
      },
    });

    return {
      success: true,
      message: 'محصول با موفقیت ایجاد شد',
      data: product,
    };
  });
