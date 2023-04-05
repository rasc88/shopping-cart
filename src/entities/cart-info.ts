import { OrderItem } from './order-item';

export type CartInfo = {
  'items': OrderItem[];
  'shipping': string | number;
  'subtotal': number;
  'total': number;
};
