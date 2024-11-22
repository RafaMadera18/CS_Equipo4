import { Guid } from "@customTypes/index";
import { StockAdjustmentData } from ".";

export class UsageReportData {
  constructor(
    private readonly _stockAdjustmentData: StockAdjustmentData[],
    private readonly _concept: string,
  ) {}

  public toJSON(): {
    stockAdjustmentData: { productId: Guid; quantity: number }[];
    concept: string;
  } {
    return {
      stockAdjustmentData: this._stockAdjustmentData.map((data) =>
        data.toJSON(),
      ),
      concept: this._concept,
    };
  }
}
