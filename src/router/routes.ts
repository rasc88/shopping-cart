import { RouteRecordRaw } from 'vue-router';

import { ShoppingCartContext } from 'src/shopping-cart-context';
import { OrderProductInteractor } from 'src/uses-cases/order-product-interactor';
import { OrderCheckoutInteractor } from 'src/uses-cases/order-checkout-interactor';
import { OrderReceiptInteractor } from 'src/uses-cases/order-receipt-interactor';

const context = new ShoppingCartContext();
const routes: RouteRecordRaw[] = [
  {
    'path': '/',
    'component': () => import('layouts/main-layout.vue'),
    'children': [
      {
        'path': 'product/:id',
        'component': () => import('src/pages/product-details/product-details.vue'),
        'props': route => ({ 'id': route.params.id, 'interactor': new OrderProductInteractor(context) })
      }
    ]
  },
  {
    'path': '/',
    'component': () => import('layouts/main-layout.vue'),
    'children': [
      {
        'path': 'checkout',
        'component': () => import('pages/order-checkout/order-checkout.vue'),
        'props': { 'interactor': new OrderCheckoutInteractor(context) }
      }
    ]
  },
  {
    'path': '/',
    'component': () => import('layouts/main-layout.vue'),
    'children': [
      {
        'path': 'order-receipt/:id',
        'component': () => import('pages/order-receipt/order-receipt.vue'),
        'props': route => ({ 'id': route.params.id, 'interactor': new OrderReceiptInteractor(context) })
      }
    ]
  },
  {
    'path': '/:catchAll(.*)*',
    'component': () => import('pages/error-not-found.vue')
  }
];

export default routes;
