import { Guid } from "@customTypes/guid";
import { ProductInfo } from "./product-info";

export class ProductStock {
  public constructor(
    private readonly _id: Guid,
    private readonly _productInfo: ProductInfo,
    private readonly _idealQuantity: number,
    private readonly _stocklQuantity: number,
  ) {}

  public get id(): Guid {
    return this._id;
  }

  public get productInfo(): ProductInfo {
    return this._productInfo;
  }

  public get idealQuantity(): number {
    return this._idealQuantity;
  }

  public get stockQuantity(): number {
    return this._stocklQuantity;
  }
}
