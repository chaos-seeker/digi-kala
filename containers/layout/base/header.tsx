'use client';

import { trpc } from '@/lib/trpc';
import { cartSlice } from '@/slices/cart';
import { userSlice } from '@/slices/user';
import { TProduct } from '@/types/product';
import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/ui/hover-card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';
import { useKillua } from 'killua';
import {
  Flame,
  LayoutGrid,
  Loader2,
  SearchIcon,
  ShoppingBag,
  Trash2,
  UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const user = useKillua(userSlice);

  return (
    <header>
      <div className="container">
        <div className="border mt-4 rounded-xl p-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src="/images/layout/logo.svg"
                alt="logo"
                width={130}
                height={130}
              />
            </Link>
            <div className="hidden lg:block">
              <Search />
            </div>
            <div className="flex items-center gap-2">
              {user.isReady &&
                (user.selectors.isLoggedIn() ? <Profile /> : <Login />)}
              <Cart />
              <Dashboard />
            </div>
          </div>
          <div className="lg:hidden">
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
}

const Profile = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/profile">
          <Button
            variant="outline"
            size="icon"
            className="gap-1 hover:bg-primary hover:text-white py-5"
          >
            <UserIcon className="size-5" />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>پروفایل</TooltipContent>
    </Tooltip>
  );
};

const Dashboard = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/dashboard">
          <Button
            variant="outline"
            size="icon"
            className="gap-1 hover:bg-primary hover:text-white py-5"
          >
            <LayoutGrid className="size-5" />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>داشبورد</TooltipContent>
    </Tooltip>
  );
};

const Login = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/auth">
          <Button
            variant="outline"
            size="icon"
            className="gap-1 hover:bg-primary hover:text-white py-5"
          >
            <UserIcon className="size-5" />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>ورود به حساب کاربری</TooltipContent>
    </Tooltip>
  );
};

const Cart = () => {
  const cart = useKillua(cartSlice);
  const totalItems = cart.selectors.totalItems();
  const cartItems = cart.get();

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link href="/cart">
          <Button
            variant="outline"
            size="icon"
            className="relative gap-1 hover:bg-primary hover:text-white py-5"
          >
            <ShoppingBag className="size-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex border-white h-4.5 w-4.5 border items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Button>
        </Link>
      </HoverCardTrigger>
      {totalItems > 0 && (
        <HoverCardContent className="w-[300px] p-4" align="end">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-800">سبد خرید</h3>
            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
              {cartItems.map((product: TProduct) => {
                const discount = product.discount ?? 0;
                const priceWithoutDiscount = product.price ?? 0;
                const priceWithDiscount = product.price * (1 - discount / 100);
                const hasDiscount = discount !== 0;
                const selectedColor = product.colors?.[0];

                return (
                  <div
                    key={product.id}
                    className="flex items-start gap-3 p-3 border rounded-lg"
                  >
                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={product.images[0] || '/temp/product-image.webp'}
                        alt={product.nameFa}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                        {product.nameFa}
                      </h4>
                      {selectedColor && (
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="size-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: selectedColor.hex }}
                          />
                          <span className="text-xs text-gray-600">
                            {selectedColor.name}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        {hasDiscount && (
                          <div className="flex items-center gap-2">
                            <del className="text-xs text-gray-400">
                              {priceWithoutDiscount.toLocaleString('fa-IR')}
                            </del>
                            <span className="text-xs font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                              {discount}%
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-gray-900">
                            {priceWithDiscount.toLocaleString('fa-IR')}
                          </span>
                          <span className="text-xs text-gray-500">تومان</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => cart.reducers.remove(product)}
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full text-xs h-10 hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="size-4" />
                        <span>حذف از سبد خرید</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Button className="w-full hover:bg-primary h-11 mt-2 hover:text-white">
            ثبت سفارش
          </Button>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const { data: searchResults, isLoading } = trpc.product.search.useQuery(
    { query: debouncedQuery },
    {
      enabled: debouncedQuery.length > 0,
    },
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center w-full lg:w-[400px] gap-2 border rounded-lg p-3">
          <SearchIcon className="size-[18px] text-gray-400" />
          <p className="text-sm flex gap-1 text-gray-400">
            جستجو در{' '}
            <Image
              src="/images/layout/typography.svg"
              alt="digikala"
              width={50}
              height={50}
            />
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="[&>button]:mt-2">
        <DialogHeader className="sr-only">
          <DialogTitle>جستجو</DialogTitle>
        </DialogHeader>
        <div className="absolute top-3 right-3 left-3 focus-within:border-primary transition-all mr-8 lg:mr-8 flex items-center gap-2 border rounded-lg p-3 bg-white lg:mx-auto">
          <SearchIcon className="size-[18px] text-gray-400 shrink-0" />
          <input
            placeholder="جستجو ..."
            className="text-sm flex-1 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mt-15 lg:mt-13">
          {searchQuery.length > 0 ? (
            <div className="flex flex-col gap-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="size-6 text-gray-400 animate-spin" />
                </div>
              ) : searchResults && searchResults.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                    {searchResults.map((product: TProduct) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="flex items-center gap-3 w-fit transition-colors"
                      >
                        <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={
                              product.images[0] || '/temp/product-image.webp'
                            }
                            alt={product.nameFa}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium max-w-[200px] text-gray-800 truncate">
                            {product.nameFa}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {product.category.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <p className="text-sm text-gray-500">نتیجه‌ای یافت نشد.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1 text-gray-700">
                <Flame className="text-gray-400 size-[18px]" />
                <h3 className="text-sm font-medium">جستجوهای پرطرفدار</h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {['مانیتور', 'کیبورد', 'ساعت', 'کنسول'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSearchQuery(item)}
                    className="px-3.5 py-1.5 rounded-full border text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
