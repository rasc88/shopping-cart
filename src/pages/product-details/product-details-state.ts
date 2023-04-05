import { Product } from 'src/entities/product';

export type State = {
  'productQtySelected': number;
  'product': Product | undefined;
  'currentImage': string;
  'subscriptions': ((...args: unknown[]) => void)[];
};
