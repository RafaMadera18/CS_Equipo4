
import { ProductOffset } from "./product-offset-data";

export class UsageReport {
  constructor(
    private readonly _products: ProductOffset[] = []
  ) {}

  public get products(): ProductOffset[] {
    return this._products;
  }

  public addProduct(productOffset: ProductOffset): void {
    this._products.push(productOffset);
  }

  public toJSON(): object {
    return {
      products: this._products,
    };
  }

}
