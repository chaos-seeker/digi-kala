'use client';

import Image from 'next/image';
import Link from 'next/link';

type Banner = {
  id: string;
  image: string;
  href: string;
};

const banners: Banner[] = [
  {
    id: '1',
    image: '/images/routes/home/four-banner-1.webp',
    href: '/campaigns/banner-1',
  },
  {
    id: '2',
    image: '/images/routes/home/four-banner-2.webp',
    href: '/campaigns/banner-2',
  },
  {
    id: '3',
    image: '/images/routes/home/four-banner-3.webp',
    href: '/campaigns/banner-3',
  },
  {
    id: '4',
    image: '/images/routes/home/four-banner-4.webp',
    href: '/campaigns/banner-4',
  },
];

export const FourBanner = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.href}
            className="relative w-full aspect-[12/10] rounded-xl overflow-hidden group"
          >
            <Image
              src={banner.image}
              alt={'بنر'}
              fill
              className="object-cover"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
