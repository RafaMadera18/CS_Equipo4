import { Guid } from "@customTypes/.";

export class StockAdjustmentData {
  public constructor(
    private readonly _productId: Guid,
    private _quantity: number,
  ) {}

  public get productId(): Guid {
    return this._productId;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(quantity: number) {
    this._quantity = quantity;
  }

  public toJSON(): { productId: Guid; quantity: number } {
    return {
      productId: this._productId,
      quantity: this._quantity,
    };
  }
}
