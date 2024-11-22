import { Injectable } from "@angular/core";
import { UsageReportManagerGatewayService } from "./gateway/usage-report-manager-gateway.service";
import { InventoryManagerService } from "@services/inventory-manager/inventory-manager.service";
import { Guid, Nullable } from "@customTypes/index";
import { ObservableCollection } from "@utilities/rxjs";
import { UsageReportData } from "../data";
import { concatMap, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsageReportManagerService {
  private readonly _usageReportsDataCache: Nullable<
    ObservableCollection<UsageReportData>
  > = null;

  constructor(
    private readonly _usageReportGateway: UsageReportManagerGatewayService,
    private readonly _inventoryManager: InventoryManagerService,
  ) {}

  public addUsageReport(usageReportData: UsageReportData): Observable<Guid> {
    const addRequest = this._usageReportGateway.addUsageReport(usageReportData);

    return addRequest.pipe(
      concatMap((newPurchaseReportId: Guid) => {
        this._usageReportsDataCache?.add(usageReportData);

        return this._inventoryManager
          .getProductStocks(true)
          .pipe(map(() => newPurchaseReportId));
      }),
    );
  }
}
