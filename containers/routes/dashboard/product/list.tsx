'use client';

import { ModalProduct } from './modal-product';
import { trpc } from '@/lib/trpc';
import { TProduct } from '@/types/product';
import { Button } from '@/ui/button';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Edit, Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

const columnHelper = createColumnHelper<TProduct>();

export const List = () => {
  const fetchData = trpc.product.getAll.useQuery();
  const utils = trpc.useUtils();
  const deleteMutation = trpc.product.delete.useMutation({
    onSuccess: (data: { success: boolean; message: string }) => {
      toast.success(data.message);
      utils.product.getAll.invalidate();
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این محصول اطمینان دارید؟')) {
      deleteMutation.mutate({ id });
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('images', {
        header: 'تصویر',
        cell: (info) => (
          <div className="relative h-16 w-16 overflow-hidden rounded-md">
            <Image
              src={info.getValue()[0]}
              alt="product"
              fill
              className="object-cover"
            />
          </div>
        ),
      }),
      columnHelper.accessor('nameFa', {
        header: 'نام فارسی',
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor('nameEn', {
        header: 'نام انگلیسی',
        cell: (info) => (
          <span className="text-gray-600 text-sm">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('price', {
        header: 'قیمت',
        cell: (info) => (
          <div className="flex flex-col">
            <span className="font-medium">
              {info.getValue().toLocaleString()} تومان
            </span>
            {info.row.original.discount && info.row.original.discount > 0 && (
              <span className="text-green-600 text-sm">
                {info.row.original.discount}% تخفیف
              </span>
            )}
          </div>
        ),
      }),
      columnHelper.accessor('category', {
        header: 'دسته‌بندی',
        cell: (info) => (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {info.getValue().title}
          </span>
        ),
      }),
      columnHelper.accessor('brand', {
        header: 'برند',
        cell: (info) => (
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
            {info.getValue().title}
          </span>
        ),
      }),
      columnHelper.accessor('colors', {
        header: 'رنگ‌ها',
        cell: (info) => (
          <div className="flex flex-wrap gap-1">
            {info.getValue()?.map((color) => (
              <div
                key={color.id}
                className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1"
              >
                <div
                  className="h-3 w-3 rounded-full border"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs">{color.name}</span>
              </div>
            ))}
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'عملیات',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <ModalProduct mode="edit" product={info.row.original}>
              <Button variant="outline" size="icon">
                <Edit className="size-4 text-blue-500" />
              </Button>
            </ModalProduct>
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
    [deleteMutation.isPending],
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
        <p className="text-red-500">خطا در بارگذاری محصولات</p>
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
