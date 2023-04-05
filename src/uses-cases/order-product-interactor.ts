import { Product } from 'src/entities/product';
import { EventEmitter } from 'src/helpers/event-emitter';
import { ShoppingCartContext } from 'src/shopping-cart-context';

type Events = {
  'update-product-qty': [ number ];
};

export class OrderProductInteractor extends EventEmitter<Events> {
  private context: ShoppingCartContext;
  private product: Product | undefined;
  private productQtySelected = 1;

  public constructor (context: ShoppingCartContext) {
    super();

    this.context = context;
  }

  public getProduct (id: string): Product {
    this.product = this.context.getProduct(id);

    return this.product;
  }

  public incrementProductQty () {
    const qty = this.productQtySelected + 1;

    if (this.product && qty <= this.product.stockQty) {
      this.productQtySelected = qty;
    }

    this.updateCart();
    this.emit('update-product-qty', this.productQtySelected);
  }

  public decrementProductQty () {
    const minimunQty = 1;
    const qty = this.productQtySelected - 1;

    if (qty >= minimunQty) {
      this.productQtySelected = qty;
    }

    this.updateCart();
    this.emit('update-product-qty', this.productQtySelected);
  }

  public updateCart () {
    if (this.product) {
      this.context.addItem(this.product, this.productQtySelected);
    }
  }
}
