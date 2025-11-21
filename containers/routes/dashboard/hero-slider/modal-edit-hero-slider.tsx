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
  link: z.url('لینک باید معتبر باشد'),
});

type FormData = z.infer<typeof formSchema>;

interface ModalEditHeroSliderProps {
  children: React.ReactNode;
  slider: THeroSlider;
  onSuccess?: () => void;
}

export function ModalEditHeroSlider({
  children,
  slider,
  onSuccess,
}: ModalEditHeroSliderProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(slider.image);
  const utils = trpc.useUtils();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: slider.image,
      link: slider.link,
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
    }
  };

  const handleSubmit = async (data: FormData) => {
    let imageData: string;

    if (data.image instanceof File) {
      // Convert File to base64
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
      // Use existing image URL
      editMutation.mutate({
        id: slider.id,
        image: data.image,
        link: data.link,
      });
    }
  };

  // Reset form when slider changes
  useEffect(() => {
    form.reset({
      image: slider.image,
      link: slider.link,
    });
    setImagePreview(slider.image);
  }, [slider, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>ویرایش اسلایدر</DialogTitle>
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
                type="url"
                label="لینک"
                placeholder="https://example.com"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <DialogFooter>
            <Button
              type="submit"
              className="w-full py-6"
              disabled={editMutation.isPending}
            >
              {editMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  در حال ویرایش...
                </>
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
