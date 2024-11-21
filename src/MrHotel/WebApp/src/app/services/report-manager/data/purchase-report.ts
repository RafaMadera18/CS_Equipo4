import { Guid } from "@customTypes/guid";
import { StockAdjustment } from ".";

export class PurchaseReport {
  constructor(
    private readonly _id: Guid,
    private readonly _registrationDate: Date,
    private readonly _stockAdjustments: StockAdjustment[],
    private readonly _price: number
  ) {}
}
