import { Guid } from "@customTypes/guid";
import { ProductInfo } from "./product-info";

export class ProductStock {
  public constructor(
    private readonly _id: Guid,
    private readonly _product: ProductInfo,
    private readonly _idealQuantity: number,
    private readonly _stocklQuantity: number,
  ) {}

  get id(): Guid {
    return this._id;
  }

  get product(): ProductInfo {
    return this._product;
  }

  get idealQuantity(): number {
    return this._idealQuantity;
  }

  get stockQuantity(): number {
    return this._stocklQuantity;
  }
}
