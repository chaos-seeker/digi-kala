'use client';

import { regex } from '@/constants/regex';
import { trpc } from '@/lib/trpc';
import { TCategory } from '@/types/category';
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
import { InputImage } from '@/ui/input-image';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  image: z.union([z.instanceof(File), z.string().min(1)], {
    message: 'تصویر الزامی است',
  }),
  title: z
    .string()
    .min(1, 'عنوان الزامی است')
    .regex(regex.persian, 'عنوان باید فارسی باشد'),
  slug: z
    .string()
    .min(1, 'اسلاگ الزامی است')
    .regex(regex.slug, 'اسلاگ باید انگلیسی و بدون اسپیس باشد'),
});

type FormData = z.infer<typeof formSchema>;

interface ModalCategoryProps {
  children: React.ReactNode;
  mode: 'add' | 'edit';
  category?: TCategory;
  onSuccess?: () => void;
}

export function ModalCategory({
  children,
  mode,
  category,
  onSuccess,
}: ModalCategoryProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    mode === 'edit' && category ? category.image : null,
  );
  const utils = trpc.useUtils();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: mode === 'edit' && category ? category.image : undefined,
      title: mode === 'edit' && category ? category.title : '',
      slug: mode === 'edit' && category ? category.slug : '',
    },
  });

  const createMutation = trpc.category.create.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      setImagePreview(null);
      setOpen(false);
      utils.category.getAll.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const editMutation = trpc.category.edit.useMutation({
    onSuccess: (data: { success: boolean; message: string }) => {
      toast.success(data.message);
      form.reset();
      setOpen(false);
      utils.category.getAll.invalidate();
      onSuccess?.();
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const handleImageChange = (file: File | null, preview: string | null) => {
    setImagePreview(preview);
    if (file) {
      form.setValue('image', file);
      form.clearErrors('image');
    } else if (preview) {
      form.setValue('image', preview);
    } else {
      form.setValue('image', undefined as any);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (data: FormData) => {
    const imageData =
      data.image instanceof File
        ? await convertFileToBase64(data.image)
        : data.image;

    if (mode === 'add') {
      createMutation.mutate({
        image: imageData,
        title: data.title,
        slug: data.slug,
      });
    } else {
      if (!category) return;
      editMutation.mutate({
        id: category.id,
        image: imageData,
        title: data.title,
        slug: data.slug,
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      if (mode === 'edit' && category) {
        form.reset({
          image: category.image,
          title: category.title,
          slug: category.slug,
        });
        setImagePreview(category.image);
      } else {
        form.reset({
          image: undefined,
          title: '',
          slug: '',
        });
        setImagePreview(null);
      }
    }
  };

  useEffect(() => {
    if (mode === 'edit' && category) {
      form.reset({
        image: category.image,
        title: category.title,
        slug: category.slug,
      });
      setImagePreview(category.image);
    } else {
      form.reset({
        image: undefined,
        title: '',
        slug: '',
      });
      setImagePreview(null);
    }
  }, [category, mode, form]);

  const isLoading = createMutation.isPending || editMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'افزودن دسته‌بندی' : 'ویرایش دسته‌بندی'}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <Controller
            control={form.control}
            name="image"
            render={({ fieldState }) => (
              <InputImage
                label="تصویر"
                value={imagePreview}
                onChange={handleImageChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Input
                type="text"
                label="عنوان"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={form.control}
            name="slug"
            render={({ field, fieldState }) => (
              <Input
                type="text"
                label="اسلاگ"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <DialogFooter>
            <Button type="submit" className="w-full py-6" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {mode === 'add' ? 'در حال ایجاد...' : 'در حال ویرایش...'}
                </>
              ) : mode === 'add' ? (
                'ایجاد'
              ) : (
                'ویرایش'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
