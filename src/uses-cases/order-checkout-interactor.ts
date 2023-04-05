import { PurchaseOrder } from 'src/entities/purchase-order';
import { EventEmitter } from 'src/helpers/event-emitter';
import { ShoppingCartContext } from 'src/shopping-cart-context';
import { CheckoutFormContext } from 'src/pages/order-checkout/checkout-form-context';
import { CartInfo } from 'src/entities/cart-info';

type Events = {
  'order-created': [ string ];
  'failed-order': [ string ];
  'cart-updated': [ CartInfo ];
};

export class OrderCheckoutInteractor extends EventEmitter<Events> {
  private context: ShoppingCartContext;

  public constructor (context: ShoppingCartContext) {
    super();
    this.context = context;
  }

  public getCheckoutFormContext (): CheckoutFormContext {
    return {
      'cartInfo': this.context.getCartInfo(),
      'shippingMethods': this.context.getShippingMethods(),
      'countries': this.context.getCountries()
    };
  }

  public createOrder (order: PurchaseOrder) { // TODO: handle fail order creation
    const orderId = this.context.createOrder(order);

    this.emit('order-created', orderId);
  }

  public setShippingMethod (method: string) {
    this.context.setShippingMethod(method);

    this.emit('cart-updated', this.context.getCartInfo());
  }
}
