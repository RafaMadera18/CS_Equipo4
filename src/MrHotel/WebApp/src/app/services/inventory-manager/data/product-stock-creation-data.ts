import { Guid } from "@customTypes/guid";
import { ProductInfo } from "./product-info";
import { ProductStock } from "./product-stock";
import { Stringify } from "@customTypes/stringify";

export class ProductStockCreationData {
  public constructor(
    private readonly _productName: string,
    private readonly _idealQuantity: number,
    private readonly _stockQuantity: number,

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

  public toJSON(): Stringify<ProductStockCreationData> {
    return {
      productName: this._productName,
      stockQuantity: this._stockQuantity.toString(),
      idealQuantity: this._idealQuantity.toString(),
    };
  }
}
