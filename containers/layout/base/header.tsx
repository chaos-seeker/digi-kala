'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LogIn, SearchIcon, Flame } from 'lucide-react';
import { Button } from '@/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from '@/ui/dialog';

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="border mt-4 rounded-xl p-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src="images/layout/logo.svg"
                alt="logo"
                width={150}
                height={150}
              />
            </Link>
            <div className="hidden lg:block">
              <Search />
            </div>
            <Login />
          </div>
          <div className="lg:hidden">
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
}

const Login = () => {
  return (
    <Button
      variant="outline"
      className="gap-1 hover:bg-primary hover:text-white py-5"
    >
      <LogIn size={18} />
      <p>ورود | ثبت نام</p>
    </Button>
  );
};

const Search = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center w-full lg:w-[400px] gap-2 border rounded-lg p-3">
          <SearchIcon size={18} className="text-gray-400" />
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
          <SearchIcon size={18} className="text-gray-400 shrink-0" />
          <input
            placeholder="جستجو ..."
            className="text-sm flex-1 outline-none"
          />
        </div>
        <div className="mt-15 lg:mt-13">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1 text-gray-700">
              <Flame size={18} className="text-gray-400 size-5.5" />
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
