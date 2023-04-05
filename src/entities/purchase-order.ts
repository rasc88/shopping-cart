import { CustomerAddress } from './customer-address';
import { OrderItem } from './order-item';
import { PaymentCard } from './payment-card';

export type PurchaseOrder = {
  'customerEmail': string;
  'shippingAddress': CustomerAddress;
  'shippingMethod': string;
  'billingAddress': CustomerAddress;
  'billingMethod': string;
  'cardInformation': PaymentCard;
  'items': OrderItem[],
  'subtotal': number,
  'total': number
};
