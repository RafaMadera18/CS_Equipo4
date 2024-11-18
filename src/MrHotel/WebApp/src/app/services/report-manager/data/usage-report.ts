import { Guid } from "@customTypes/guid";
import { ProductOffset } from "../../report-manager/data/product-offset";

export class UsageReport {
  constructor(
    private readonly _id: Guid, 
    private _products: ProductOffset[] = [] 
  ) {}


  public get products(): ProductOffset[] {
    return this._products;
  }


  public addProduct(productOffset: ProductOffset): void {
    this._products.push(productOffset);
  }

}
