import { ProductImage } from './product-image';

export type Product = {
  'id': string;
  'title': string;
  'description': string;
  'images': ProductImage[];
  'price': number;
  'discount': number;
  'stockQty': number;
}
