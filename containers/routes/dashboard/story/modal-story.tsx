'use client';

import { trpc } from '@/lib/trpc';
import { TStory } from '@/types/story';
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
  avatar: z.union([z.instanceof(File), z.string().min(1)], {
    message: 'آواتار الزامی است',
  }),
  cover: z.union([z.instanceof(File), z.string().min(1)], {
    message: 'کاور الزامی است',
  }),
  title: z.string().min(1, 'عنوان الزامی است'),
  link: z
    .string()
    .min(1, 'لینک الزامی است')
    .refine((val) => val.startsWith('/'), {
      message: 'لینک باید با / شروع شود',
    }),
});

type FormData = z.infer<typeof formSchema>;

interface ModalStoryProps {
  children: React.ReactNode;
  mode: 'add' | 'edit';
  story?: TStory;
  onSuccess?: () => void;
}

export function ModalStory({
  children,
  mode,
  story,
  onSuccess,
}: ModalStoryProps) {
  const [open, setOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    mode === 'edit' && story ? story.avatar : null,
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    mode === 'edit' && story ? story.cover : null,
  );
  const utils = trpc.useUtils();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: mode === 'edit' && story ? story.avatar : undefined,
      cover: mode === 'edit' && story ? story.cover : undefined,
      title: mode === 'edit' && story ? story.title : '',
      link: mode === 'edit' && story ? story.link : '',
    },
  });

  const createMutation = trpc.story.create.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      setAvatarPreview(null);
      setCoverPreview(null);
      setOpen(false);
      utils.story.getAll.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const editMutation = trpc.story.edit.useMutation({
    onSuccess: (data: { success: boolean; message: string }) => {
      toast.success(data.message);
      form.reset();
      setOpen(false);
      utils.story.getAll.invalidate();
      onSuccess?.();
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const handleAvatarChange = (file: File | null, preview: string | null) => {
    setAvatarPreview(preview);
    if (file) {
      form.setValue('avatar', file);
      form.clearErrors('avatar');
    } else if (preview) {
      form.setValue('avatar', preview);
    } else {
      form.setValue('avatar', undefined as any);
    }
  };

  const handleCoverChange = (file: File | null, preview: string | null) => {
    setCoverPreview(preview);
    if (file) {
      form.setValue('cover', file);
      form.clearErrors('cover');
    } else if (preview) {
      form.setValue('cover', preview);
    } else {
      form.setValue('cover', undefined as any);
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
    const avatarData = data.avatar instanceof File 
      ? await convertFileToBase64(data.avatar) 
      : data.avatar;
    
    const coverData = data.cover instanceof File 
      ? await convertFileToBase64(data.cover) 
      : data.cover;

    if (mode === 'add') {
      createMutation.mutate({
        avatar: avatarData,
        cover: coverData,
        title: data.title,
        link: data.link,
      });
    } else {
      if (!story) return;
      editMutation.mutate({
        id: story.id,
        avatar: avatarData,
        cover: coverData,
        title: data.title,
        link: data.link,
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      if (mode === 'edit' && story) {
        form.reset({
          avatar: story.avatar,
          cover: story.cover,
          title: story.title,
          link: story.link,
        });
        setAvatarPreview(story.avatar);
        setCoverPreview(story.cover);
      } else {
        form.reset({
          avatar: undefined,
          cover: undefined,
          title: '',
          link: '',
        });
        setAvatarPreview(null);
        setCoverPreview(null);
      }
    }
  };

  useEffect(() => {
    if (mode === 'edit' && story) {
      form.reset({
        avatar: story.avatar,
        cover: story.cover,
        title: story.title,
        link: story.link,
      });
      setAvatarPreview(story.avatar);
      setCoverPreview(story.cover);
    } else {
      form.reset({
        avatar: undefined,
        cover: undefined,
        title: '',
        link: '',
      });
      setAvatarPreview(null);
      setCoverPreview(null);
    }
  }, [story, mode, form]);

  const isLoading = createMutation.isPending || editMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'افزودن استوری جدید' : 'ویرایش استوری'}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <Controller
            control={form.control}
            name="avatar"
            render={({ fieldState }) => (
              <InputImage
                label="آواتار"
                value={avatarPreview}
                onChange={handleAvatarChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="cover"
            render={({ fieldState }) => (
              <InputImage
                label="کاور"
                value={coverPreview}
                onChange={handleCoverChange}
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
