import { CartInfo } from 'src/entities/cart-info';
import { ShippingMethods } from 'src/shipping-methods';

export type State = {
  'cartInfo': CartInfo | undefined;
  'shippingMethods': ShippingMethods | undefined;
  'countries': string[];
  'subscriptions': ((...args: unknown[]) => void)[];
};
