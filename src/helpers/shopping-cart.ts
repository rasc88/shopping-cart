import { OrderItem } from './entities/order-item';
import { Product } from './entities/product';
import { CartInfo } from './entities/cart-info';
import { getShippingMethods } from './data-configuration-helpers';

export class ShoppingCart {
  private items: OrderItem[] = [];
  private shippingMethod = 'Free';
  private shipping: string | number = '';
  private subtotal = 0;
  private total = 0;

  public getInfo (): CartInfo {
    return {
      'items': this.items,
      'shipping': this.shipping,
      'subtotal': this.subtotal,
      'total': this.total
    };
  }

  public addItem (newItem: Product, quantity: number): void {
    this.removeItem(newItem.id);

    this.items = [
      ...this.items,
      { 'product': newItem, 'quantity': quantity }
    ];

    this.updateCart();
  }

  public removeItem (itemId: string): void {
    this.items = this.items.filter((item) => item.product.id !== itemId);

    this.updateCart();
  }

  public getSubtotalPrice (): number {
    const sum = (acc: number, item: OrderItem) => {
      return acc + item.product.price * item.quantity;
    };

    return this.items.reduce(sum, 0);
  }

  public setShippingMethod (method: string) {
    this.shippingMethod = method;

    this.updateCart();
  }

  private getShippingMethodPrice (): string | number {
    const shipping = getShippingMethods().get(this.shippingMethod);

    if (shipping === undefined) {
      throw new Error('Invalid shipping method.');
    }

    return shipping;
  }

  private updateCart (): void {
    this.subtotal = this.getSubtotalPrice();
    this.shipping = this.getShippingMethodPrice();
    this.total = typeof this.shipping !== 'string' ? this.subtotal + this.shipping : this.subtotal;
    this.items = this.items.map((item) => {
      return {
        'product': item.product,
        'quantity': item.quantity,
        'total': item.product.price * item.quantity
      };
    });
  }
}
