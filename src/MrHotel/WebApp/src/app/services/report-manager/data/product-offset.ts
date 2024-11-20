import { Stringify } from "@customTypes/.";

export class ProductOffset {
  public constructor(
    private readonly _name: string,
    private readonly _quantity: number
  ) {}

  public get name(): string {
    return this._name;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public toJSON(): Stringify<ProductOffset> {
    return {
      name: this._name,
      quantity: this._quantity.toString(),
    };
  }
}
