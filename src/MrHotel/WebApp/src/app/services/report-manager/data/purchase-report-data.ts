import { StockAdjustmentData } from ".";

export class PurchaseReportData {
  constructor(
    private readonly _stockAdjustmentData: StockAdjustmentData[],
    private readonly _price: number,
  ) {}
}
