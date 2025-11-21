import { prisma } from '@/lib/prisma';
import { THeroSlider } from '@/types/hero-slider';

export async function getAllHeroSliders(): Promise<THeroSlider[]> {
  try {
    const heroSliders = await prisma.heroSlider.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return heroSliders.map((slider) => ({
      id: slider.id,
      image: slider.image,
      link: slider.link,
    }));
  } catch (error) {
    console.error('Error fetching hero sliders:', error);
    return [];
  }
}
