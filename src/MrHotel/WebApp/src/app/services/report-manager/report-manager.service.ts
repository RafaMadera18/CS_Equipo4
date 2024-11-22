import { Injectable } from "@angular/core";
import { concatMap, map, Observable } from "rxjs";
import { ReportManagerGatewayService } from "./gateway/report-manager-gateway.service";
import { PurchaseReportData } from "./data";
import { Guid } from "@customTypes/guid";
import { ObservableCollection } from "@utilities/rxjs";
import { Nullable } from "@customTypes/index";
import { InventoryManagerService } from "@services/inventory-manager/inventory-manager.service";

@Injectable({
  providedIn: "root",
})
export class ReportManagerService {
  private readonly _purchaseReportsDataCache: Nullable<
    ObservableCollection<PurchaseReportData>
  > = null;

  constructor(
    private readonly _reportGateway: ReportManagerGatewayService,
    private readonly _inventoryManager: InventoryManagerService,
  ) {}

  public addPurchaseReport(
    purchaseReportData: PurchaseReportData,
  ): Observable<Guid> {
    const addRequest =
      this._reportGateway.addPurchaseReport(purchaseReportData);

    return addRequest.pipe(
      concatMap((newPurchaseReportId: Guid) => {
        this._purchaseReportsDataCache?.add(purchaseReportData);

        return this._inventoryManager
          .getProductStock(true)
          .pipe(map(() => newPurchaseReportId));
      }),
    );
  }
}
