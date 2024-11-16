import { Guid } from "@customTypes/guid";
import { ReplaceFieldType } from "@customTypes/replace-field-type";
import { Stringify } from "@customTypes/stringify";



export class ProductStock {
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
        return this.name;
      }

      public get idealQuantity():  number{
        return this._idealQuantity;
      }

      public get stockQuantity(): number{
        return this._stocklQuantity;
      }

      public static createFromDto(dto: ProductStockDTO): ProductStock {
        return new ProductStock(
            dto.id,
            dto.name, 
            parseInt(dto.idealQuantity), 
            parseInt(dto.stockQuantity),
        );
    
    }
  
}

export type ProductStockDTO = ReplaceFieldType<Stringify<ProductStock>, "id", Guid >;