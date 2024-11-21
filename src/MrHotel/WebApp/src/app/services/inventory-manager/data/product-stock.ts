import { Guid } from "@customTypes/guid";

export class ProductStock {
  private _selected?: boolean = false;

  public constructor(
    private readonly _id: Guid,
    private readonly _name: string,
    private readonly _idealQuantity: number,
    private readonly _stocklQuantity: number,
  ) {}

  public get id(): Guid {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get idealQuantity(): number {
    return this._idealQuantity;
  }

  public get stockQuantity(): number {
    return this._stocklQuantity;
  }

  public get selected(): boolean {
    return this._selected ?? false;
  }
}
