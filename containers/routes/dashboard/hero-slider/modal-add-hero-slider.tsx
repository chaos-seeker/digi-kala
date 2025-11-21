'use client';

import { trpc } from '@/lib/trpc';
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
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  image: z.instanceof(File, { message: 'تصویر الزامی است' }),
  link: z.url('لینک باید معتبر باشد'),
});

type FormData = z.infer<typeof formSchema>;

interface ModalAddHeroSliderProps {
  children: React.ReactNode;
  onSuccess?: () => void;
}

export function ModalAddHeroSlider({
  children,
  onSuccess,
}: ModalAddHeroSliderProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const utils = trpc.useUtils();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      link: '',
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

  const handleImageChange = (file: File | null, preview: string | null) => {
    setImagePreview(preview);
    if (file) {
      form.setValue('image', file);
      form.clearErrors('image');
    } else {
      form.setValue('image', undefined as any);
    }
  };

  const handleSubmit = async (data: FormData) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      createMutation.mutate({
        image: base64Image,
        link: data.link,
      });
    };
    reader.readAsDataURL(data.image);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>افزودن اسلایدر جدید</DialogTitle>
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
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <DialogFooter>
            <Button
              type="submit"
              className="w-full py-6"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  در حال ایجاد...
                </>
              ) : (
                'ایجاد'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
