import { Amazing } from "@/containers/routes/home/amazing";
import { HeroSlider } from "@/containers/routes/home/hero-slider";
import { Story } from "@/containers/routes/home/story";
import { Categories } from "@/containers/routes/home/categories";
import { Brands } from "@/containers/routes/home/brands";

export default function Home() {
  return <>
  <Story />
  <HeroSlider />
  <Categories />
  <Amazing />
  <Brands />
  </>
}
