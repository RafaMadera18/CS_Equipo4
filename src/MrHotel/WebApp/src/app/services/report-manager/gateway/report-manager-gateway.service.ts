import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Guid } from "@customTypes/guid";

import { Observable } from "rxjs";
import { PurchaseReportData } from "../data";

@Injectable({
  providedIn: "root",
})
export class ReportManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addPurchaseReport(
    purchaseReport: PurchaseReportData,
  ): Observable<Guid> {
    const apiUrl: string = this.getApiUrl();

    return this._httpClient.post<Guid>(apiUrl, purchaseReport);
  }

  private getApiUrl(url: string = ""): string {
    return `api/reports/purchases${url}`;
  }
}
