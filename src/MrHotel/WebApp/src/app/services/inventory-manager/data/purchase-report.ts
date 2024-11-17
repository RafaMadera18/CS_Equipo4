import { Guid } from "@customTypes/guid";
import { ProductOffset } from "./product-offset";

export class PurchaseReport{

    constructor(
        //Hacer el precio decimal
        private readonly _id : Guid,
        private _products: ProductOffset[] = [],
        private _price : number,
    ){

    }


}