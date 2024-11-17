import { Guid, Stringify } from "@customTypes/.";

import { ProductStock } from "./product-stock";
import { ProductInfo } from "./product-info";

export class ProductCreationData {

  public constructor(
    private readonly _id : Guid,
    private readonly _productInfo: ProductInfo,
    private readonly _idealQuantity: number,
    private readonly _stockQuantity: number,
  ) {}

  public get productInfo(): ProductInfo {
    return this._productInfo;
  }


  public get idealQuantity(): number {
    return this._idealQuantity;
  }

  public get stockQuantity(): number {
    return this._stockQuantity;
  }

  public toJSON(): Stringify<ProductCreationData> {
    return {
      productInfo: JSON.stringify(this.productInfo),
      idealQuantity: this._idealQuantity.toString(),
      stockQuantity: this._stockQuantity.toString(),
    };
  }


  public toProductStock(id: Guid): ProductStock {
    return new ProductStock(
    id,
    this._productInfo,
    this._idealQuantity,
    this._stockQuantity,
    );
  }

}
