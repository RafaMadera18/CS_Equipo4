import { Guid } from "@customTypes/guid";
import { ReplaceFieldType } from "@customTypes/replace-field-type";
import { Stringify } from "@customTypes/stringify";
import { ProductInfo } from "./product-info";



export class ProductStock {
    public constructor(
        private readonly _id: Guid,
        private readonly _productInfo : ProductInfo,
        private readonly _idealQuantity: number,
        private readonly _stocklQuantity: number,
      ) {}

      public get id(): Guid {
        return this._id;
      }

      public get productInfo(): ProductInfo{
        return this._productInfo;
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
            ProductInfo.createFromDto(dto.productInfo),
            parseInt(dto.idealQuantity), 
            parseInt(dto.stockQuantity),
        );
    
    }
  
}

export type ProductStockDTO = ReplaceFieldType<Stringify<ProductStock>, "id", Guid >;