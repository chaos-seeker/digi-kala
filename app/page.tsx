import { Amazing } from '@/containers/routes/home/amazing';
import { HeroSlider } from '@/containers/routes/home/hero-slider';
import { Story } from '@/containers/routes/home/story';
import { Categories } from '@/containers/routes/home/categories';
import { Brands } from '@/containers/routes/home/brands';
import { History } from '@/containers/routes/home/history';
import { TwoBanner } from '@/containers/routes/home/two-banner';
import { FourBanner } from '@/containers/routes/home/four-banner';

export default function Home() {
  return (
    <>
      <Story />
      <HeroSlider />
      <Amazing />
      <Categories />
      <TwoBanner />
      <Brands />
      <FourBanner />
      <History />
    </>
  );
}
