'use client';

import { ModalBrand } from '@/containers/routes/dashboard/brand/modal-brand';
import { ModalCategory } from '@/containers/routes/dashboard/category/modal-category';
import { ModalHeroSlider } from '@/containers/routes/dashboard/hero-slider/modal-hero-slider';
import { ModalStory } from '@/containers/routes/dashboard/story/modal-story';
import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';
import { cn } from '@/utils/cn';
import { LayoutGrid, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
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
            <div className="flex items-center gap-2">
              <AddBrandBtn />
              <AddCategoryBtn />
              <AddStoryBtn />
              <AddHeroSliderBtn />
              <QuickAccess />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const QuickAccess = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard/hero-slider', label: 'مدیریت هیرو اسلایدر' },
    { href: '/dashboard/story', label: 'مدیریت استوری' },
    { href: '/dashboard/brand', label: 'مدیریت برند' },
    { href: '/dashboard/category', label: 'مدیریت دسته بندی' },
  ];

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="gap-1 hover:bg-primary hover:text-white py-5"
            >
              <LayoutGrid className="size-5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>دسترسی سریع</TooltipContent>
      </Tooltip>
      <DropdownMenuContent
        align="start"
        className="text-right flex flex-col gap-0.5"
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <DropdownMenuItem
              key={item.href}
              asChild
              className={cn(
                'justify-end',
                isActive && 'bg-primary hover:bg-primary! text-white',
              )}
            >
              <Link href={item.href} className="w-full text-right">
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AddHeroSliderBtn = () => {
  const pathname = usePathname();
  const isShow = pathname === '/dashboard/hero-slider';

  if (!isShow) return null;

  return (
    <ModalHeroSlider mode="add">
      <Button
        variant="outline"
        className="gap-1 hover:bg-primary hover:text-white py-5"
      >
        <Plus className="size-5" />
        <span>افزودن هیرو اسلایدر</span>
      </Button>
    </ModalHeroSlider>
  );
};

const AddStoryBtn = () => {
  const pathname = usePathname();
  const isShow = pathname === '/dashboard/story';

  if (!isShow) return null;

  return (
    <ModalStory mode="add">
      <Button
        variant="outline"
        className="gap-1 hover:bg-primary hover:text-white py-5"
      >
        <Plus className="size-5" />
        <span>افزودن استوری</span>
      </Button>
    </ModalStory>
  );
};

const AddCategoryBtn = () => {
  const pathname = usePathname();
  const isShow = pathname === '/dashboard/category';

  if (!isShow) return null;

  return (
    <ModalCategory mode="add">
      <Button
        variant="outline"
        className="gap-1 hover:bg-primary hover:text-white py-5"
      >
        <Plus className="size-5" />
        <span>افزودن دسته‌بندی</span>
      </Button>
    </ModalCategory>
  );
};

const AddBrandBtn = () => {
  const pathname = usePathname();
  const isShow = pathname === '/dashboard/brand';

  if (!isShow) return null;

  return (
    <ModalBrand mode="add">
      <Button
        variant="outline"
        className="gap-1 hover:bg-primary hover:text-white py-5"
      >
        <Plus className="size-5" />
        <span>افزودن برند</span>
      </Button>
    </ModalBrand>
  );
};
