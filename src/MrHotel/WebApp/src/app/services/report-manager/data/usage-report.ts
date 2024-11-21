import { Guid } from "@customTypes/guid";
import { StockAdjustment } from "./stock-adjustment";

export class UsageReport {
  constructor(
    private readonly _id: Guid,
    private readonly _registrationDate: Date,
    private readonly _stockAdjustments: StockAdjustment[],
    private readonly _concept: string,
  ) {}
}
