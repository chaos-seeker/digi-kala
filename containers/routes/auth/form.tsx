'use client';

import { regex } from '@/constants/regex';
import { trpc } from '@/lib/trpc';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  full_name: z
    .string()
    .min(1, 'نام و نام خانوادگی الزامی است')
    .regex(regex.persian, 'نام کامل باید فقط فارسی باشد'),
  username: z
    .string()
    .min(1, 'نام کاربری الزامی است')
    .regex(regex.english, 'نام کاربری باید فقط انگلیسی باشد'),
  password: z
    .string()
    .min(1, 'رمز عبور الزامی است')
    .max(16, 'رمز عبور نمی تواند بیشتر از 16 کاراکتر باشد'),
});

export function Form() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      username: '',
      password: '',
    },
  });

  const authMutation = trpc.auth.authenticate.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmitForm = async (data: z.infer<typeof formSchema>) => {
    authMutation.mutate({
      username: data.username,
      password: data.password,
      fullName: data.full_name,
    });
  };

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="flex w-[350px] flex-col gap-5 rounded-xl border bg-white p-4 sm:w-[350px]">
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-500">ورود / ثبت نام</p>
          <Image
            src="/images/layout/logo.svg"
            alt="لوگو"
            width={120}
            height={120}
          />
        </div>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col gap-2.5">
            <Controller
              control={form.control}
              name="full_name"
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  label="نام و نام خانوادگی"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  label="نام کاربری"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Input
                  type="password"
                  label="رمز عبور"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={authMutation.isPending}
            className="mt-1 flex h-12 w-full items-center justify-center rounded-lg bg-primary font-medium text-white disabled:opacity-50"
          >
            {authMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              'ورود'
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
