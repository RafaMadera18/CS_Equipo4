import { Guid } from "@customTypes/guid";
import { ReplaceFieldType } from "@customTypes/replace-field-type";
import { Stringify } from "@customTypes/stringify";



export class ProductInfo {
    public constructor(
        private readonly _id: Guid,
        private readonly _name: string,
      ) {}

      public get id(): Guid {
        return this._id;
      }
    
      public get name(): string {
        return this._name;
      }


      public static createFromDto(dto: string): ProductInfo {
        // Si el DTO es un JSON string, conviértelo a un objeto
        const parsed = JSON.parse(dto);
        return new ProductInfo(parsed.name, parsed.description);
      }
  
}

