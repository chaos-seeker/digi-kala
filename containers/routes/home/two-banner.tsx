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
    image: '/images/routes/home/two-banner-1.webp',
    href: '/explore',
  },
  {
    id: '2',
    image: '/images/routes/home/two-banner-2.gif',
    href: '/explore',
  },
];

export const TwoBanner = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.href}
            className="relative w-full aspect-[12/5] rounded-xl overflow-hidden group"
          >
            <Image
              src={banner.image}
              alt={'بنر'}
              fill
              className="object-cover"
              unoptimized={banner.image.endsWith('.gif')}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
