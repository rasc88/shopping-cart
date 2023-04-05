import { OrderItem } from './order-item';

export type OrderReceipt = {
  'id': string;
  'customerName': string;
  'customerEmail': string;
  'shippingAddress': string;
  'shippingMethod': string;
  'billingAddress': string;
  'billingMethod': string;
  'paymentMethod': string;
  'items': OrderItem[],
  'subtotal': number,
  'total': number
};
