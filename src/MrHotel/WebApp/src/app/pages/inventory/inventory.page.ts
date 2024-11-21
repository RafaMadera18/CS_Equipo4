import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { addIcons } from "ionicons";
import { trashOutline, addOutline } from "ionicons/icons";

import { Observable } from "rxjs";


import { deleteModal } from "@components/modals/delete-modal-form";
import { addPurchaseModal } from "@components/modals/add-purchase-report-modal-form";

import { ModalService } from "@services/modal/modal.service";
import { InventoryManagerService } from "@services/inventory-manager/inventory-manager.service";
import { ProductStock } from "@services/inventory-manager/data";
import { ReportManagerService } from "@services/report-manager/report-manager.service";
import { addProductModal } from "@components/modals/inventory/add-product-modal-form";

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
    private readonly _reportManager: ReportManagerService,
  ) {
    addIcons({ trashOutline, addOutline });
    this._productStocks = _inventoryManager.getProductStock();
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

    if (isDeleteConfirmed?.state) {
      this._inventoryManager.deleteProductStock(productStock).subscribe();
    }
  }

  public async openPurchaseReport(): Promise<void> {
    const purchaseReportCreateRequest = await this._modalService.openModal(
      addPurchaseModal,
      this._productStocks,
    );

    if (purchaseReportCreateRequest) {
      this._reportManager
        .addPurchaseReport(purchaseReportCreateRequest)
        .subscribe();
    }
  }

  public get productStocks() {
    return this._productStocks;
  }
}
