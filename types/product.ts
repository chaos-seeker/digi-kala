import { TBrand } from './brand';
import { TCategory } from './category';
import { TColor } from './color';

export type TProduct = {
  id: string;
  nameFa: string;
  nameEn: string;
  price: number;
  discount?: number;
  images: string[];
  color: TColor;
  attributes: { key: string; value: string }[];
  description: string;
  category: TCategory;
  brand: TBrand;
  slug: string;
};
