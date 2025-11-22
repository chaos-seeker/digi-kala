'use client';

import { trpc } from '@/lib/trpc';
import { Color } from '@/types/color';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'نام رنگ الزامی است'),
  hex: z
    .string()
    .min(1, 'کد هگز الزامی است')
    .regex(/^#[0-9A-Fa-f]{6}$/, 'کد هگز باید به فرمت #RRGGBB باشد'),
});

type FormData = z.infer<typeof formSchema>;

interface ModalColorProps {
  children: React.ReactNode;
  mode: 'add' | 'edit';
  color?: Color;
  onSuccess?: () => void;
}

export function ModalColor({
  children,
  mode,
  color,
  onSuccess,
}: ModalColorProps) {
  const [open, setOpen] = useState(false);
  const [colorPickerValue, setColorPickerValue] = useState('#000000');
  const utils = trpc.useUtils();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: (mode === 'edit' && color?.name) || '',
      hex: (mode === 'edit' && color?.hex) || '#000000',
    },
  });

  const createMutation = trpc.color.create.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      setOpen(false);
      utils.color.getAll.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const editMutation = trpc.color.edit.useMutation({
    onSuccess: (data: { success: boolean; message: string }) => {
      toast.success(data.message);
      form.reset();
      setOpen(false);
      utils.color.getAll.invalidate();
      onSuccess?.();
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (data: FormData) => {
    if (mode === 'add') {
      createMutation.mutate({
        name: data.name,
        hex: data.hex,
      });
    } else {
      if (!color) return;
      editMutation.mutate({
        id: color.id,
        name: data.name,
        hex: data.hex,
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      if (mode === 'edit' && color) {
        const hexValue = color.hex || '#000000';
        form.reset({
          name: color.name || '',
          hex: hexValue,
        });
        setColorPickerValue(hexValue);
      } else {
        form.reset({
          name: '',
          hex: '#000000',
        });
        setColorPickerValue('#000000');
      }
    }
  };

  useEffect(() => {
    if (mode === 'edit' && color) {
      const hexValue = color.hex || '#000000';
      form.reset({
        name: color.name || '',
        hex: hexValue,
      });
      setColorPickerValue(hexValue);
    } else {
      form.reset({
        name: '',
        hex: '#000000',
      });
      setColorPickerValue('#000000');
    }
  }, [color, mode]);

  const isLoading = createMutation.isPending || editMutation.isPending;

  const isUpdatingRef = useRef(false);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'افزودن رنگ' : 'ویرایش رنگ'}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                type="text"
                label="نام رنگ"
                error={fieldState.error?.message}
                {...field}
                value={field.value || ''}
              />
            )}
          />
          <Controller
            control={form.control}
            name="hex"
            render={({ field, fieldState }) => (
              <div className="flex items-end gap-2">
                <Input
                  type="text"
                  label="کد هگز رنگ"
                  placeholder="#FF0000"
                  error={fieldState.error?.message}
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    if (isUpdatingRef.current) return;

                    const hex = e.target.value;
                    field.onChange(e);

                    if (
                      /^#[0-9A-Fa-f]{6}$/.test(hex) &&
                      hex !== colorPickerValue
                    ) {
                      isUpdatingRef.current = true;
                      setColorPickerValue(hex);
                      form.clearErrors('hex');
                      setTimeout(() => {
                        isUpdatingRef.current = false;
                      }, 0);
                    }
                  }}
                />
                <input
                  type="color"
                  value={colorPickerValue}
                  onChange={(e) => {
                    if (isUpdatingRef.current) return;

                    const hex = e.target.value;
                    isUpdatingRef.current = true;
                    setColorPickerValue(hex);
                    form.setValue('hex', hex, { shouldValidate: false });
                    form.clearErrors('hex');
                    setTimeout(() => {
                      isUpdatingRef.current = false;
                    }, 0);
                  }}
                  className="w-12 h-10 rounded border-2 border-gray-200 cursor-pointer"
                />
              </div>
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
