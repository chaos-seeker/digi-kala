'use client';

import { trpc } from '@/lib/trpc';
import { TBrand } from '@/types/brand';
import { TCategory } from '@/types/category';
import { TColor } from '@/types/color';
import { TProduct } from '@/types/product';
import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import { Input } from '@/ui/input';
import { MultipleImageInput } from '@/ui/multiple-image-input';
import MultipleSelector, { Option } from '@/ui/multiple-selector';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  nameFa: z.string().min(1, 'نام فارسی الزامی است'),
  nameEn: z.string().min(1, 'نام انگلیسی الزامی است'),
  price: z.number().min(1, 'وارد کردن قیمت الزامی است'),
  discount: z.number().min(0).max(100, 'تخفیف باید بین 0 تا 100 باشد'),
  images: z.array(z.string()).min(1, 'حداقل یک تصویر الزامی است'),
  colors: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        hex: z.string(),
      }),
    )
    .min(1, 'انتخاب حداقل یک رنگ الزامی است'),
  category: z
    .object({
      id: z.string(),
      title: z.string(),
      image: z.string(),
      slug: z.string(),
    })
    .refine((data) => data.id && data.id.length > 0, {
      message: 'انتخاب دسته‌بندی الزامی است',
    }),
  brand: z
    .object({
      id: z.string(),
      title: z.string(),
      image: z.string(),
      slug: z.string(),
    })
    .refine((data) => data.id && data.id.length > 0, {
      message: 'انتخاب برند الزامی است',
    }),
  description: z.string().min(1, 'توضیحات الزامی است'),
  slug: z.string().min(1, 'اسلاگ الزامی است'),
  attributes: z.array(
    z.object({
      key: z.string().min(1, 'کلید الزامی است'),
      value: z.string().min(1, 'مقدار الزامی است'),
    }),
  ),
});

type FormData = z.infer<typeof formSchema>;

interface ModalProductProps {
  children: React.ReactNode;
  mode: 'add' | 'edit';
  product?: TProduct;
  onSuccess?: () => void;
}

export function ModalProduct({
  children,
  mode,
  product,
  onSuccess,
}: ModalProductProps) {
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      nameFa: (mode === 'edit' && product?.nameFa) || '',
      nameEn: (mode === 'edit' && product?.nameEn) || '',
      price: (mode === 'edit' && product?.price) || 0,
      discount: (mode === 'edit' && product?.discount) || 0,
      images: (mode === 'edit' && product?.images) || [],
      colors: (mode === 'edit' && product?.colors) || [],
      category: (mode === 'edit' && product?.category) || {
        id: '',
        title: '',
        image: '',
        slug: '',
      },
      brand: (mode === 'edit' && product?.brand) || {
        id: '',
        title: '',
        image: '',
        slug: '',
      },
      description: (mode === 'edit' && product?.description) || '',
      slug: (mode === 'edit' && product?.slug) || '',
      attributes: (mode === 'edit' && product?.attributes) || [
        { key: '', value: '' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'attributes',
  });

  const categoriesQuery = trpc.category.getAll.useQuery();
  const brandsQuery = trpc.brand.getAll.useQuery();
  const colorsQuery = trpc.color.getAll.useQuery();

  const createMutation = trpc.product.create.useMutation({
    onSuccess: (data: any) => {
      toast.success(data.message);
      form.reset();
      setOpen(false);
      utils.product.getAll.invalidate();
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const editMutation = trpc.product.edit.useMutation({
    onSuccess: (data: any) => {
      toast.success(data.message);
      form.reset();
      setOpen(false);
      utils.product.getAll.invalidate();
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (data: FormData) => {
    if (mode === 'add') {
      createMutation.mutate(data);
    } else {
      if (!product) return;
      editMutation.mutate({
        id: product.id,
        ...data,
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset();
    }
  };

  useEffect(() => {
    if (mode === 'edit' && product) {
      form.reset({
        nameFa: product.nameFa || '',
        nameEn: product.nameEn || '',
        price: product.price || 0,
        discount: product.discount || 0,
        images: product.images || [],
        colors: product.colors || [],
        category: product.category || {
          id: '',
          title: '',
          image: '',
          slug: '',
        },
        brand: product.brand || {
          id: '',
          title: '',
          image: '',
          slug: '',
        },
        description: product.description || '',
        slug: product.slug || '',
        attributes: product.attributes || [{ key: '', value: '' }],
      });
    }
  }, [product, mode, form]);

  const isLoading = createMutation.isPending || editMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'افزودن محصول' : 'ویرایش محصول'}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <div>
            <label
              htmlFor="product-images"
              className="block text-sm font-medium mb-2 text-right"
            >
              تصاویر محصول
            </label>
            <Controller
              control={form.control}
              name="images"
              render={({ field, fieldState }) => (
                <MultipleImageInput
                  label=""
                  value={field.value || []}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="nameFa"
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  label="نام فارسی"
                  error={fieldState.error?.message}
                  {...field}
                  value={field.value || ''}
                />
              )}
            />
            <Controller
              control={form.control}
              name="nameEn"
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  label="نام انگلیسی"
                  error={fieldState.error?.message}
                  {...field}
                  value={field.value || ''}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <Input
                  type="number"
                  label="قیمت (تومان)"
                  error={fieldState.error?.message}
                  {...field}
                  value={field.value || 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <Controller
              control={form.control}
              name="discount"
              render={({ field, fieldState }) => (
                <Input
                  type="number"
                  label="تخفیف (%)"
                  error={fieldState.error?.message}
                  {...field}
                  value={field.value || 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="slug"
            render={({ field, fieldState }) => (
              <Input
                type="text"
                label="اسلاگ"
                error={fieldState.error?.message}
                {...field}
                value={field.value || ''}
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Controller
                control={form.control}
                name="category"
                render={({ field, fieldState }) => (
                  <div>
                    <Select
                      value={field.value?.id || ''}
                      onValueChange={(value) => {
                        const selectedCategory = categoriesQuery.data?.find(
                          (cat: TCategory) => cat.id === value,
                        );
                        if (selectedCategory) {
                          field.onChange({
                            id: selectedCategory.id,
                            title: selectedCategory.title,
                            image: selectedCategory.image,
                            slug: selectedCategory.slug,
                          });
                        } else {
                          field.onChange({
                            id: '',
                            title: '',
                            image: '',
                            slug: '',
                          });
                        }
                        form.trigger('category');
                      }}
                    >
                      <SelectTrigger
                        className="w-full text-right"
                        label="دسته‌بندی"
                        error={
                          fieldState.error?.message ||
                          form.formState.errors.category?.message
                        }
                      >
                        <SelectValue placeholder="انتخاب دسته‌بندی" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesQuery.data?.map((category: TCategory) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>

            <div>
              <Controller
                control={form.control}
                name="brand"
                render={({ field, fieldState }) => (
                  <div>
                    <Select
                      value={field.value?.id || ''}
                      onValueChange={(value) => {
                        const selectedBrand = brandsQuery.data?.find(
                          (brand: TBrand) => brand.id === value,
                        );
                        if (selectedBrand) {
                          field.onChange({
                            id: selectedBrand.id,
                            title: selectedBrand.title,
                            image: selectedBrand.image,
                            slug: selectedBrand.slug,
                          });
                        } else {
                          field.onChange({
                            id: '',
                            title: '',
                            image: '',
                            slug: '',
                          });
                        }
                        form.trigger('brand');
                      }}
                    >
                      <SelectTrigger
                        className="w-full text-right"
                        label="برند"
                        error={
                          fieldState.error?.message ||
                          form.formState.errors.brand?.message
                        }
                      >
                        <SelectValue placeholder="انتخاب برند" />
                      </SelectTrigger>
                      <SelectContent>
                        {brandsQuery.data?.map((brand: TBrand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
          </div>

          <div>
            <div className="block text-sm font-medium mb-2 text-right">
              رنگ‌ها
            </div>
            <Controller
              control={form.control}
              name="colors"
              render={({ field, fieldState }) => (
                <div>
                  <MultipleSelector
                    value={
                      field.value?.map((color: TColor) => ({
                        value: color.id,
                        label: color.name,
                        hex: color.hex,
                      })) || []
                    }
                    onChange={(options: Option[]) => {
                      const selectedColors = options.map((option) => {
                        const originalColor = colorsQuery.data?.find(
                          (color: TColor) => color.id === option.value,
                        );
                        return (
                          originalColor || {
                            id: option.value,
                            name: option.label,
                            hex: (option as any).hex || '#000000',
                          }
                        );
                      });
                      field.onChange(selectedColors);
                    }}
                    defaultOptions={
                      colorsQuery.data?.map((color: TColor) => ({
                        value: color.id,
                        label: color.name,
                        hex: color.hex,
                      })) || []
                    }
                    placeholder="انتخاب رنگ‌ها..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        رنگی یافت نشد.
                      </p>
                    }
                    badgeClassName="text-right"
                    className="text-right"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1 text-right">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-2 text-right"
                >
                  توضیحات
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full p-2 border rounded-md text-sm"
                  {...field}
                  value={field.value || ''}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <div>
            <label
              htmlFor="product-attributes"
              className="block text-sm font-medium mb-2 text-right"
            >
              ویژگی‌های محصول
            </label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center mb-2">
                <Controller
                  control={form.control}
                  name={`attributes.${index}.key`}
                  render={({ field, fieldState }) => (
                    <Input
                      type="text"
                      label=""
                      error={fieldState.error?.message}
                      {...field}
                      value={field.value || ''}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name={`attributes.${index}.value`}
                  render={({ field, fieldState }) => (
                    <Input
                      type="text"
                      label=""
                      error={fieldState.error?.message}
                      {...field}
                      value={field.value || ''}
                    />
                  )}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ key: '', value: '' })}
            >
              افزودن ویژگی
            </Button>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full py-6" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {mode === 'add' ? 'در حال ایجاد...' : 'در حال ویرایش...'}
                </>
              ) : mode === 'add' ? (
                'ایجاد محصول'
              ) : (
                'ویرایش محصول'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
