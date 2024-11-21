import { ProductOffsetData } from "./product-offset-data";

export class PurchaseReport {
  constructor(
    private readonly _products: ProductOffsetData[] = [],
    private readonly _price: number
  ) {}

  public get price(): number {
    return this._price;
  }

  public get products(): ProductOffsetData[] {
    return this._products;
  }

  public addProduct(productOffset: ProductOffsetData): void {
    this._products.push(productOffset);
  }

  public toJSON(): object {
    return {
      price: this._price,
      products: this._products,
    };
  }
}
