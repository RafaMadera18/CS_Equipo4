import { Guid } from "@customTypes/.";
import { ProductInfo } from "@services/inventory-manager/data";

export class StockAdjustment {
  public constructor(
    private readonly _id: Guid,
    private readonly _product: ProductInfo,
    private readonly _quantity: number,
  ) {}
}
