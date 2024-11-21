import { Guid } from "@customTypes/guid";
import { ProductInfo } from "./product-info";

export class ProductStock {
  public constructor(
    private readonly _id: Guid,
    private readonly _product: ProductInfo,
    private readonly _idealQuantity: number,
    private readonly _stocklQuantity: number,
  ) {}
}
