'use client';

import { trpc } from '@/lib/trpc';
import { THeroSlider } from '@/types/hero-slider';
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
  link: z
    .string()
    .min(1, 'لینک الزامی است')
    .refine((val) => val.startsWith('/'), {
      message: 'لینک باید با / شروع شود',
    }),
});

type FormData = z.infer<typeof formSchema>;

interface ModalHeroSliderProps {
  children: React.ReactNode;
  mode: 'add' | 'edit';
  slider?: THeroSlider;
  onSuccess?: () => void;
}

export function ModalHeroSlider({
  children,
  mode,
  slider,
  onSuccess,
}: ModalHeroSliderProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    mode === 'edit' && slider ? slider.image : null,
  );
  const utils = trpc.useUtils();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: mode === 'edit' && slider ? slider.image : undefined,
      link: mode === 'edit' && slider ? slider.link : '',
    },
  });

  const createMutation = trpc.heroSlider.create.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      setImagePreview(null);
      setOpen(false);
      utils.heroSlider.getAll.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const editMutation = trpc.heroSlider.edit.useMutation({
    onSuccess: (data: { success: boolean; message: string }) => {
      toast.success(data.message);
      form.reset();
      setOpen(false);
      utils.heroSlider.getAll.invalidate();
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

  const handleSubmit = async (data: FormData) => {
    if (mode === 'add') {
      if (data.image instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          createMutation.mutate({
            image: base64Image,
            link: data.link,
          });
        };
        reader.readAsDataURL(data.image);
      }
    } else {
      if (!slider) return;

      if (data.image instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          editMutation.mutate({
            id: slider.id,
            image: base64Image,
            link: data.link,
          });
        };
        reader.readAsDataURL(data.image);
      } else {
        editMutation.mutate({
          id: slider.id,
          image: data.image,
          link: data.link,
        });
      }
    }
  };

  useEffect(() => {
    if (mode === 'edit' && slider) {
      form.reset({
        image: slider.image,
        link: slider.link,
      });
      setImagePreview(slider.image);
    } else {
      form.reset({
        image: undefined,
        link: '',
      });
      setImagePreview(null);
    }
  }, [slider, mode, form]);

  const isLoading = createMutation.isPending || editMutation.isPending;

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      if (mode === 'edit' && slider) {
        form.reset({
          image: slider.image,
          link: slider.link,
        });
        setImagePreview(slider.image);
      } else {
        form.reset({
          image: undefined,
          link: '',
        });
        setImagePreview(null);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'افزودن اسلایدر جدید' : 'ویرایش اسلایدر'}
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
            name="link"
            render={({ field, fieldState }) => (
              <Input
                type="text"
                label="لینک"
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
