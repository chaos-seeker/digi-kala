'use client';

import { ModalHeroSlider } from './modal-hero-slider';
import { trpc } from '@/lib/trpc';
import { THeroSlider } from '@/types/hero-slider';
import { Button } from '@/ui/button';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Edit, Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

const columnHelper = createColumnHelper<THeroSlider>();

export const List = () => {
  const fetchData = trpc.heroSlider.getAll.useQuery();
  const utils = trpc.useUtils();
  const deleteMutation = trpc.heroSlider.delete.useMutation({
    onSuccess: (data: { success: boolean; message: string }) => {
      toast.success(data.message);
      utils.heroSlider.getAll.invalidate();
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });
  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این اسلایدر اطمینان دارید؟')) {
      deleteMutation.mutate({ id });
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('image', {
        header: 'تصویر',
        cell: (info) => (
          <div className="relative h-16 w-32 overflow-hidden rounded-md">
            <Image
              src={info.getValue()}
              alt="hero-slider"
              fill
              className="object-cover"
            />
          </div>
        ),
      }),
      columnHelper.accessor('link', {
        header: 'لینک',
        cell: (info) => (
          <Link
            href={info.getValue()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'عملیات',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <ModalHeroSlider mode="edit" slider={info.row.original}>
              <Button variant="outline" size="icon">
                <Edit className="size-4 text-blue-500" />
              </Button>
            </ModalHeroSlider>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDelete(info.row.original.id)}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="size-4 text-red-500" />
            </Button>
          </div>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: fetchData.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (fetchData.isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (fetchData.error) {
    console.error(fetchData.error);
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-500">خطا در بارگذاری اسلایدرها</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="whitespace-nowrap px-4 py-3 text-right text-sm font-bold text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-4 py-3 text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-gray-500"
                >
                  آیتمی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
