import { StockAdjustmentData } from ".";

export class UsageReportData {
  constructor(
    private readonly _stockAdjustmentData: StockAdjustmentData[],
    private readonly _concept: string,
  ) {}
}
