import { OrderReceiptContext } from 'src/pages/order-receipt/order-receipt-context';
import { ShoppingCartContext } from 'src/shopping-cart-context';

export class OrderReceiptInteractor {
  private context: ShoppingCartContext;

  public constructor (context: ShoppingCartContext) {
    this.context = context;
  }

  public getOrderReceiptContext (orderId: string): OrderReceiptContext {
    const order = this.context.getOrderReceipt(orderId);

    if (order === undefined) {
      throw new Error('Order not found.');
    }

    return {
      'cartInfo': {
        'items': order.items,
        'shipping': order.shippingMethod,
        'subtotal': order.subtotal,
        'total': order.total
      },
      'orderReceipt': order
    };
  }
}
