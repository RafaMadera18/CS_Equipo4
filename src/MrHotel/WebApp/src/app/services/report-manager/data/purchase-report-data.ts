import { ProductOffsetData } from "./product-offset-data";

export class PurchaseReportData {

  constructor(
    private readonly _purchasedProducts: ProductOffsetData[] = [],
    private readonly _price: number
  ) {}

  public get price(): number {
    return this._price;
  }

  public get purchasedProducts(): ProductOffsetData[] {
    return this._purchasedProducts;
  }

  public toJSON(): object {
    return {
      price: this._price,
      purchasedProducts: this._purchasedProducts,
    };
  }
}
