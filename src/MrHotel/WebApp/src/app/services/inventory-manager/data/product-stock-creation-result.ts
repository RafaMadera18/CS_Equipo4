import { Guid } from "@customTypes/guid";

export class ProductStockCreationResult {
  constructor(
    private readonly _stockId: Guid,
    private readonly _productId: Guid,
  ) {}

  get stockId(): Guid {
    return this._stockId;
  }

  get productId(): Guid {
    return this._productId;
  }
}
