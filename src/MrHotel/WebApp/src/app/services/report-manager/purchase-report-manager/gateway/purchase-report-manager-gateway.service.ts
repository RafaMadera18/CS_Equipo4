import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Guid } from "@customTypes/guid";

import { Observable } from "rxjs";
import { PurchaseReportData } from "../../data";

@Injectable({
  providedIn: "root",
})
export class PurchaseReportManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addPurchaseReport(
    purchaseReport: PurchaseReportData,
  ): Observable<Guid> {
    const apiPath: string = this.getApiPath();

    return this._httpClient.post<Guid>(apiPath, purchaseReport);
  }

  private getApiPath(path: string = ""): string {
    return `api/reports/purchases${path}`;
  }
}
