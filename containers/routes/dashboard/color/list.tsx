'use client';

import { ModalColor } from './modal-color';
import { trpc } from '@/lib/trpc';
import { Color } from '@/types/color';
import { Button } from '@/ui/button';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Edit, Loader2, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

const columnHelper = createColumnHelper<Color>();

export const List = () => {
  const fetchData = trpc.color.getAll.useQuery();
  const utils = trpc.useUtils();
  const deleteMutation = trpc.color.delete.useMutation({
    onSuccess: (data: { success: boolean; message: string }) => {
      toast.success(data.message);
      utils.color.getAll.invalidate();
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این رنگ اطمینان دارید؟')) {
      deleteMutation.mutate({ id });
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('hex', {
        header: 'رنگ',
        cell: (info) => (
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-lg border-2 border-gray-200 shadow-sm"
                style={{ backgroundColor: info.getValue() }}
              />
              <div className="absolute inset-0 rounded-lg bg-linear-to-br from-white/20 to-transparent" />
            </div>
            <code className="bg-gray-100 px-3 py-1.5 rounded-md text-sm font-mono">
              {info.getValue()}
            </code>
          </div>
        ),
      }),
      columnHelper.accessor('name', {
        header: 'نام رنگ',
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'عملیات',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <ModalColor mode="edit" color={info.row.original}>
              <Button variant="outline" size="icon">
                <Edit className="size-4 text-blue-500" />
              </Button>
            </ModalColor>
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
        <p className="text-red-500">خطا در بارگذاری رنگ‌ها</p>
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
