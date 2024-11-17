import { Guid, Stringify } from "@customTypes/.";

import { ProductStock } from "./product-stock";

export class ProductCreationData {

  public constructor(
    private readonly _name: string,
    private readonly _idealQuantity: number,
    private readonly _stockQuantity: number,
  ) {}

  public get name(): string {
    return this._name;
  }

  public get idealQuantity(): number {
    return this._idealQuantity;
  }

  public get stockQuantity(): number {
    return this._stockQuantity;
  }

  public toJSON(): Stringify<ProductCreationData> {
    return {
      name: this._name,
      idealQuantity: this._idealQuantity.toString(),
      stockQuantity: this._stockQuantity.toString(),
    };
  }


  public toProductStock(id: Guid): ProductStock {
    return new ProductStock(
    id,
    this._name,
    this._idealQuantity,
    this._stockQuantity,
    );
  }

}
