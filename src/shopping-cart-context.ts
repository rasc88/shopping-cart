import { PurchaseOrder } from './entities/purchase-order';
import { Product } from './entities/product';
import { ShippingMethods } from './shipping-methods';
import { OrderReceipt } from './entities/order-receipt';
import { ShoppingCart } from './helpers/shopping-cart';
import { CartInfo } from './entities/cart-info';
import {
  createOrder,
  getCountries,
  getOrderReceipt,
  getProduct,
  getShippingMethods
} from './helpers/data-configuration-helpers';

export class ShoppingCartContext {
  private cartInstance = new ShoppingCart();

  public getCartInfo (): CartInfo {
    return this.cartInstance.getInfo();
  }

  public addItem (newItem: Product, quantity: number): void {
    this.cartInstance.addItem(newItem, quantity);
  }

  public removeItem (itemId: string): void {
    this.cartInstance.removeItem(itemId);
  }

  public getProduct (id: string): Product {
    return getProduct(id);
  }

  public getShippingMethods (): ShippingMethods {
    return getShippingMethods();
  }

  public createOrder (order: PurchaseOrder): string {
    return createOrder(order);
  }

  public setShippingMethod (method: string): void {
    this.cartInstance.setShippingMethod(method);
  }

  public getOrderReceipt (orderId: string): OrderReceipt | undefined {
    return getOrderReceipt(orderId);
  }

  public getCountries (): string[] {
    return getCountries();
  }
}
