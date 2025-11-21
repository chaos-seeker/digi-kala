'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LogIn, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header>
      <div className="container border-b py-3 flex flex-col gap-3">
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
    </header>
  );
}

const Login = () => {
  return (
    <Button
      variant="outline"
      className="gap-1 hover:bg-primary hover:text-white"
    >
      <LogIn size={18} />
      <p>ورود | ثبت نام</p>
    </Button>
  );
};

const Search = () => {
  return (
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
  );
};
