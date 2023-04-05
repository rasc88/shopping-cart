import { CustomerAddress } from 'src/entities/customer-address';
import { PaymentCard } from 'src/entities/payment-card';

export type State = {
  'customerEmail': string;
  'shippingAddress': CustomerAddress;
  'shippingMethod': string;
  'billingAddress': CustomerAddress;
  'billingMethod': string;
  'cardInformation': PaymentCard;
  'termsOfService': boolean;
};
