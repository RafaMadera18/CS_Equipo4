import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { addIcons } from "ionicons";
import { trashOutline, addOutline } from "ionicons/icons";

import { Observable } from "rxjs";

import { deleteModal } from "@components/modals/delete-modal-form";
import { addPurchaseModal } from "@components/modals/reports/purchase-reports/add-purchase-report-modal-form";

import { ModalService } from "@services/modal/modal.service";
import { InventoryManagerService } from "@services/inventory-manager/inventory-manager.service";
import { ProductStock } from "@services/inventory-manager/data";
import { PurchaseReportManagerService } from "@services/report-manager/purchase-report-manager/purchase-report-manager.service";
import { addProductModal } from "@components/modals/inventory/add-product-modal-form";
import { addUsageModal } from "@components/modals/reports/usage-reports";
import { UsageReportManagerService } from "@services/report-manager/usage-report-manager/usage-report-manager.service";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.page.html",
  styleUrls: ["./inventory.page.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class InventoryPage {
  private readonly _productStocks: Observable<readonly ProductStock[]>;

  constructor(
    private readonly _inventoryManager: InventoryManagerService,
    private readonly _modalService: ModalService,
    private readonly _purchaseReportManager: PurchaseReportManagerService,
    private readonly _usageReportManager: UsageReportManagerService,
  ) {
    addIcons({ trashOutline, addOutline });
    this._productStocks = _inventoryManager.getProductStocks();
  }

  public async addProductStock(): Promise<void> {
    const productStockCreationData =
      await this._modalService.openModal(addProductModal);

    if (productStockCreationData != null) {
      this._inventoryManager
        .addProductStock(productStockCreationData)
        .subscribe();
    }
  }

  public async deleteProductStock(productStock: ProductStock): Promise<void> {
    const isDeleteConfirmed = await this._modalService.openModal(deleteModal, {
      message: `Do You want To Delete Product: ${productStock.product.name}? `,
    });

    if (isDeleteConfirmed?.state !== null) {
      this._inventoryManager.deleteProductStock(productStock).subscribe();
    }
  }

  public async addPurchaseReport(): Promise<void> {
    const purchaseReportData = await this._modalService.openModal(
      addPurchaseModal,
      this._productStocks,
    );

    if (purchaseReportData !== null) {
      this._purchaseReportManager
        .addPurchaseReport(purchaseReportData)
        .subscribe();
    }
  }

  public async addUsageReport(): Promise<void> {
    const usageReportData = await this._modalService.openModal(
      addUsageModal,
      this._productStocks,
    );

    if (usageReportData !== null) {
      this._usageReportManager.addUsageReport(usageReportData).subscribe();
    }
  }

  public get productStocks() {
    return this._productStocks;
  }
}
