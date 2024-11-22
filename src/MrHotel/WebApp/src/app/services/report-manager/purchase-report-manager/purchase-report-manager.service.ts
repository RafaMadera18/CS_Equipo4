import { Injectable } from "@angular/core";
import { concatMap, map, Observable } from "rxjs";
import { PurchaseReportManagerGatewayService } from "./gateway/purchase-report-manager-gateway.service";
import { PurchaseReportData } from "../data";
import { Guid } from "@customTypes/guid";
import { ObservableCollection } from "@utilities/rxjs";
import { Nullable } from "@customTypes/index";
import { InventoryManagerService } from "@services/inventory-manager/inventory-manager.service";

@Injectable({
  providedIn: "root",
})
export class PurchaseReportManagerService {
  private readonly _purchaseReportsDataCache: Nullable<
    ObservableCollection<PurchaseReportData>
  > = null;

  constructor(
    private readonly _purchaseReportGateway: PurchaseReportManagerGatewayService,
    private readonly _inventoryManager: InventoryManagerService,
  ) {}

  public addPurchaseReport(
    purchaseReportData: PurchaseReportData,
  ): Observable<Guid> {
    const addRequest =
      this._purchaseReportGateway.addPurchaseReport(purchaseReportData);

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
