import { Guid } from "@customTypes/guid";

export class ProductInfo {
  constructor(
    private readonly _id: Guid,
    private readonly _name: string,
  ) {}

  get id(): Guid {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
