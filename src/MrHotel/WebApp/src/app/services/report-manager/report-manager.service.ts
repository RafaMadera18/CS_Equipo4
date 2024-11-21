import { Injectable } from "@angular/core";
import { ProductOffset } from "./data/product-offset-data";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: "root",
  })

export class ReportManagerService{

  constructor(private readonly _reportGateway: ReportManagerService) {}

  public AddPurchaseReport(){
    const addRequest = this._reportGateway
  }

}
