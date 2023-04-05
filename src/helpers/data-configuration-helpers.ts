import { PurchaseOrder } from './entities/purchase-order';
import { Product } from './entities/product';
import { ShippingMethods } from './shipping-methods';
import { OrderReceipt } from './entities/order-receipt';

const productExample = {
  'id': '1',
  'title': 'Nike sneakers',
  'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum lacinia quis vel eros donec ac odio tempor. Facilisis gravida neque convallis a. Risus quis varius quam quisque id diam. Dolor purus non enim praesent elementum facilisis leo. Odio tempor orci dapibus ultrices in iaculis nunc. Nisi porta lorem mollis aliquam. Id interdum velit laoreet id donec ultrices. Viverra adipiscing at in tellus integer feugiat scelerisque varius. Sed id semper risus in hendrerit gravida rutrum quisque non. Vivamus arcu felis bibendum ut tristique et. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Aenean euismod elementum nisi quis eleifend quam adipiscing.

  Tristique magna sit amet purus gravida quis blandit. Lsrc/pages/order-product/order-item.vue arcu dictum varius duis. In massa tempor nec feugiat nisl pretium. Pharetra convallis posuere morbi leo. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Ut morbi tincidunt augue interdum velit euismod in pellentesque.`,
  'images': [
    {
      'id': '1',
      'source': '/products/product-1-right-side.webp'
    }, {
      'id': '2',
      'source': '/products/product-1-back.webp'
    }
  ],
  'price': 200,
  'discount': 80,
  'stockQty': 5
};

export function getProduct (id: string): Product { // TODO get from API
  return { ...productExample, 'id': id };
}

export function getShippingMethods (): ShippingMethods { // TODO get from API
  return new Map<string, string | number>([
    ['Free', 'Free'],
    ['DHL', 20]
  ]);
}

export function createOrder (_order: PurchaseOrder): string { // TODO get from API
  return '10040';
}

export function getOrderReceipt (orderId: string): OrderReceipt | undefined { // TODO get from API
  return {
    'id': orderId,
    'customerName': 'Pedro perez',
    'customerEmail': 'ppe@gmail.com',
    'shippingAddress': '4140 Parker Rd. Allientown New Carbur 31134',
    'shippingMethod': 'Free',
    'billingAddress': '4140 Parker Rd. Allientown New Carbur 31134',
    'billingMethod': 'Same as shipping',
    'paymentMethod': 'Credit card',
    'items': [{
      'product': productExample,
      'quantity': 1,
      'total': 200
    }],
    'subtotal': 200,
    'total': 200
  };
}

export function getCountries (): string[] { // TODO get from API
  return [
    'Afghanistan',
    'Åland Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'AndorrA',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina'
  ];
}
