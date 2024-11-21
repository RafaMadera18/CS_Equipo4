import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ReportManagerGatewayService } from "./gateway/report-manager-gateway.service";
import { PurchaseReport, PurchaseReportData } from "./data";
import { Guid } from "@customTypes/guid";
import { ObservableCollection } from "@utilities/rxjs";
import { Nullable } from "@customTypes/index";

@Injectable({
  providedIn: "root",
})
export class ReportManagerService {
  private readonly _purchaseReportsDataCache: Nullable<
    ObservableCollection<PurchaseReportData>
  > = null;

  constructor(private readonly _reportGateway: ReportManagerGatewayService) {}

  public addPurchaseReport(
    purchaseReportData: PurchaseReportData,
  ): Observable<Guid> {
    const addRequest =
      this._reportGateway.addPurchaseReport(purchaseReportData);

    return addRequest.pipe(
      tap((newPurchaseReportId: Guid) => {
        this._purchaseReportsDataCache?.add(purchaseReportData);
      }),
    );
  }
}
