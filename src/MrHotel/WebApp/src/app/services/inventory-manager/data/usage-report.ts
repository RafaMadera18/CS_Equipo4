import { ProductOffset } from "./product-offset";

export class UsageReport{

    constructor(
        //Hacer el precio decimal
        private _products: ProductOffset[] = [],
        private _price : number,
    ){

    }


}