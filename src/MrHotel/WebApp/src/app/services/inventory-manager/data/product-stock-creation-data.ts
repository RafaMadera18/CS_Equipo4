import { Guid } from "@customTypes/guid";
import { ProductInfo } from "./product-info";
import { ProductStock } from "./product-stock";

export class ProductStockCreationData {
  public constructor(
    private readonly _productName: string,
    private readonly _stockQuantity: number,
    private readonly _idealQuantity: number,
  ) {}

  get productName(): string {
    return this._productName;
  }

  get stockQuantity(): number {
    return this._stockQuantity;
  }

  get idealQuantity(): number {
    return this._idealQuantity;
  }

  public toProductStock(stockid: Guid, productId: Guid): ProductStock {
    return new ProductStock(
      stockid,
      new ProductInfo(productId, this._productName),
      this._idealQuantity,
      this._stockQuantity,
    );
  }
}
