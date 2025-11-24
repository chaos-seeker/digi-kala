import { TProduct } from '@/types/product';
import { slice } from 'killua';

export type TCartItem = TProduct;

export const cartSlice = slice({
  key: 'cart',
  defaultClient: [] as TCartItem[],
  defaultServer: [],
  selectors: {
    isEmpty: (value) => !value.length,

    isInCart: (value, payload: TProduct) => {
      const payloadColorId = payload.colors[0]?.id;
      return value.some(
        (product) =>
          product.id === payload.id && product.colors[0]?.id === payloadColorId,
      );
    },
    totalPrice: (value) =>
      value.reduce((acc, product) => {
        const price = product.price ?? 0;
        const discount = product.discount ?? 0;
        return acc + price * (1 - discount / 100);
      }, 0),
    totalDiscount: (value) =>
      value.reduce((acc, product) => {
        const price = product.price ?? 0;
        const discount = product.discount ?? 0;
        return acc + (price * discount) / 100;
      }, 0),
    totalItems: (value) => value.length,
  },
  reducers: {
    add: (value, payload: TProduct) => {
      const payloadColorId = payload.colors[0]?.id;
      const existingProductIndex = value.findIndex(
        (p) => p.id === payload.id && p.colors[0]?.id === payloadColorId,
      );
      if (existingProductIndex !== -1) {
        return value;
      }
      return [...value, payload];
    },
    remove: (value, payload: TProduct) => {
      const payloadColorId = payload.colors[0]?.id;
      return value.filter(
        (product) =>
          !(
            product.id === payload.id &&
            product.colors[0]?.id === payloadColorId
          ),
      );
    },
    reset: () => [],
  },
});
