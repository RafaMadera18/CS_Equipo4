import { Guid } from "@customTypes/guid";
import { StockAdjustmentData } from ".";

export class PurchaseReportData {
  constructor(
    private readonly _stockAdjustmentData: StockAdjustmentData[],
    private readonly _price: number,
  ) {}

  public get stockAdjustmentData(): StockAdjustmentData[] {
    return this._stockAdjustmentData;
  }

  public get price(): number {
    return this._price;
  }

  public toJSON(): {
    stockAdjustmentData: { productId: Guid; quantity: number }[];
    price: number;
  } {
    return {
      stockAdjustmentData: this._stockAdjustmentData.map((data) =>
        data.toJSON(),
      ),
      price: this._price,
    };
  }
}
