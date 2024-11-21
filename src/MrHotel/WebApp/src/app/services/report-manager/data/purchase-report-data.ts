import { ProductOffset } from "../../report-manager/data/product-offset";

export class PurchaseReportData {

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

  public toJSON(): object {
    return {
      price: this._price,
      products: this._products,
    };
  }
}
