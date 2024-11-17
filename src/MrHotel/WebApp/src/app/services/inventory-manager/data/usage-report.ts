import { Guid } from "@customTypes/guid";
import { ProductOffset } from "./product-offset";

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


  public validate(): void {
    if (this._products.some((product) => product.quantity <= 0)) {
      throw new Error("Todos los productos deben tener cantidades positivas.");
    }
  }
}
