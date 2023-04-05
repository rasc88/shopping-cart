import { OrderReceipt } from 'src/entities/order-receipt';
import { CartInfo } from 'src/entities/cart-info';

export type OrderReceiptContext = {
  'cartInfo': CartInfo;
  'orderReceipt': OrderReceipt | undefined;
}
