import { Guid } from "@customTypes/guid";

export class ProductOffset {
  public constructor(
    private readonly _id: Guid,
    private readonly _name: string,
    private readonly _quantity: number
  ) {}

  public get id(): Guid {
    return this._id;
  }

  public get quantity(): number {
    return this._quantity;
  }
}
