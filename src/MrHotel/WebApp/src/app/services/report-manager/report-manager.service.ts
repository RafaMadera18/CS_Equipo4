import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ReportManagerGatewayService } from "./gateway/report-manager-gateway.service";
import { PurchaseReportData } from "./data";
import { Guid } from "@customTypes/guid";
import { ObservableCollection } from "@utilities/rxjs";
import { Nullable } from "@customTypes/index";

@Injectable({
  providedIn: "root",
})
export class ReportManagerService {
  private _purchaseReportsCache: Nullable<
    ObservableCollection<PurchaseReportData>
  > = null;

  constructor(private readonly _reportGateway: ReportManagerGatewayService) {}

  public addPurchaseReport(
    purchaseReport: PurchaseReportData,
  ): Observable<Guid> {
    const addRequest = this._reportGateway.addPurchaseReport(purchaseReport);

    return addRequest.pipe(
      tap((newPurchaseReportId: Guid) => {
        this._purchaseReportsCache?.add(purchaseReport);
      }),
    );
  }
}
