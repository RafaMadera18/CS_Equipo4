import { Guid } from "@customTypes/guid";
import { ProductOffset } from "../../report-manager/data/product-offset";

export class PurchaseReport {
  constructor(
    private readonly _id: Guid,
    private _products: ProductOffset[] = [],
    private _price: number
  ) {}

  public get products(): ProductOffset[] {
    return this._products;
  }

  public addProduct(productOffset: ProductOffset): void {
    this._products.push(productOffset);
  }
}
