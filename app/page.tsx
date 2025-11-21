import { Amazing } from '@/containers/routes/home/amazing';
import { Brands } from '@/containers/routes/home/brands';
import { Categories } from '@/containers/routes/home/categories';
import { FourBanner } from '@/containers/routes/home/four-banner';
import { HeroSlider } from '@/containers/routes/home/hero-slider';
import { History } from '@/containers/routes/home/history';
import { Story } from '@/containers/routes/home/story';
import { TwoBanner } from '@/containers/routes/home/two-banner';
import { appRouter } from '@/server/_app';
import { createContext } from '@/server/context';

export default async function Page() {
  const caller = appRouter.createCaller(await createContext());
  const [heroSlidersData, storiesData] = await Promise.all([
    caller.heroSlider.getAll(),
    caller.story.getAll(),
  ]);

  return (
    <>
      <Story data={storiesData} />
      <HeroSlider data={heroSlidersData} />
      <Amazing />
      <Categories />
      <TwoBanner />
      <Brands />
      <FourBanner />
      <History />
    </>
  );
}
