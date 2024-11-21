import { ProductOffset } from "./product-offset-data";

export class PurchaseReport {
  constructor(
    private readonly _products: ProductOffset[] = [],
    private readonly _price: number
  ) {}

  public get price(): number {
    return this._price;
  }

  public get products(): ProductOffset[] {
    return this._products;
  }

  public addProduct(productOffset: ProductOffset): void {
    this._products.push(productOffset);
  }

  public toJSON(): object {
    return {
      price: this._price,
      products: this._products,
    };
  }
}
