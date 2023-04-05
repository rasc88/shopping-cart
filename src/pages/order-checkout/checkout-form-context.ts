import { CartInfo } from 'src/entities/cart-info';
import { ShippingMethods } from 'src/shipping-methods';

export type CheckoutFormContext = {
  'cartInfo': CartInfo;
  'shippingMethods': ShippingMethods;
  'countries': string[]
}
