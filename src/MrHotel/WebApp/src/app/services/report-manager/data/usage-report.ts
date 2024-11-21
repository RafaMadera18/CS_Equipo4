
import { ProductOffsetData } from "./product-offset-data";

export class UsageReport {
  constructor(
    private readonly _products: ProductOffsetData[] = []
  ) {}

  public get products(): ProductOffsetData[] {
    return this._products;
  }

  public addProduct(productOffset: ProductOffsetData): void {
    this._products.push(productOffset);
  }

  public toJSON(): object {
    return {
      products: this._products,
    };
  }

}
