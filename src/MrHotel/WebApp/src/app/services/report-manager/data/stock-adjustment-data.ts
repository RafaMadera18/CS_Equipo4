import { Guid } from "@customTypes/.";

export class StockAdjustmentData {
  public constructor(
    private readonly _productId: Guid,
    private readonly _quantity: number,
  ) {}

  public get id(): Guid {
    return this._productId;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public toJSON(): Record<string, string> {
    return {
      productId: this._productId,
      quantity: this._quantity.toString(),
    };
  }
}
