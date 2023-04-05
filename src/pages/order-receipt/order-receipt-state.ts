import { OrderReceipt } from 'src/entities/order-receipt';
import { CartInfo } from 'src/entities/cart-info';

export type State = {
  'cartInfo': CartInfo | undefined;
  'orderReceipt': OrderReceipt | undefined;
};
