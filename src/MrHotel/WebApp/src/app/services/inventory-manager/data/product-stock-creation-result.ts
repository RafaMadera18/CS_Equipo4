import { Guid } from "@customTypes/guid";

export class ProductStockCreationResult {
  constructor(
    private readonly _stockId: Guid,
    private readonly _productId: string,
  ) {}
}
