'use client';

import { userSlice } from '@/slices/user';
import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';
import { useKillua } from 'killua';
import {
  Flame,
  LayoutGrid,
  SearchIcon,
  ShoppingBag,
  UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const user = useKillua(userSlice);

  return (
    <header>
      <div className="container">
        <div className="border mt-4 rounded-xl p-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src="images/layout/logo.svg"
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
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="gap-1 hover:bg-primary hover:text-white py-5"
        >
          <ShoppingBag className="size-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>سبد خرید</TooltipContent>
    </Tooltip>
  );
};

const Search = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center w-full lg:w-[400px] gap-2 border rounded-lg p-3">
          <SearchIcon className="size-[18px] text-gray-400" />
          <p className="text-sm flex gap-1 text-gray-400">
            جستجو در{' '}
            <Image
              src="images/layout/typography.svg"
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
          />
        </div>
        <div className="mt-15 lg:mt-13">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1 text-gray-700">
              <Flame className="text-gray-400 size-[18px]" />
              <h3 className="text-sm font-medium">جستجوهای پرطرفدار</h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {['شارژر', 'موس', 'ساعت', 'هندزفری'].map((item) => (
                <Link
                  key={item}
                  href={`/explore?q=${encodeURIComponent(item)}`}
                  className="px-3.5 py-1.5 rounded-full border text-sm text-gray-700 hover:bg-primary hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
