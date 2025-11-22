'use client';

import { trpc } from '@/lib/trpc';
import { TOrder } from '@/types/order';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<TOrder>();

interface UserOrdersProps {
  userId: string;
}

export function UserOrders({ userId }: UserOrdersProps) {
  const { data, isLoading, error } = trpc.order.getByUserId.useQuery({
    userId,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor('originalAmount', {
        header: 'مبلغ',
        cell: (info) => {
          const originalAmount = info.getValue();
          return `${originalAmount.toLocaleString('fa-IR')} تومان`;
        },
      }),
      columnHelper.accessor('discount', {
        header: 'مقدار تخفیف',
        cell: (info) => {
          const discountValue = info.getValue();
          return discountValue > 0
            ? `${discountValue.toLocaleString('fa-IR')} تومان`
            : '-';
        },
      }),
      columnHelper.accessor('amount', {
        header: 'مبلغ نهایی',
        cell: (info) => `${info.getValue().toLocaleString('fa-IR')} تومان`,
      }),
      columnHelper.accessor('createdAt', {
        header: 'تاریخ ثبت',
        cell: (info) => {
          const date = new Date(info.getValue());
          return date.toLocaleDateString('fa-IR');
        },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-500">خطا در بارگذاری سفارش‌ها</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full rounded-lg border">
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
                سفارشی یافت نشد
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

