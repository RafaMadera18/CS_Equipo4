import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { addIcons } from "ionicons";
import { trashOutline, addOutline } from "ionicons/icons";

import { Observable } from "rxjs";

import { addProductModal } from "@components/modals/add-product-modal-form";
import { deleteModal } from "@components/modals/delete-modal-form";
import { addPurchaseModal } from "@components/modals/add-purchase-report-modal-form";

import { ModalService } from "@services/modal/modal.service";
import { InventoryManagerService } from "@services/inventory-manager/inventory-manager.service";
import { ProductStock } from "@services/inventory-manager/data";

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
  ) {
    addIcons({ trashOutline, addOutline });
    this._productStocks = _inventoryManager.getProductStock();
  }

  public async addProductStock(): Promise<void> {
    const productCreateRequest =
      await this._modalService.openModal(addProductModal);

    if (productCreateRequest != null) {
      this._inventoryManager
        .addNewProductToStock(productCreateRequest)
        .subscribe();
    }
  }

  public async deleteProductStock(product: ProductStock): Promise<void> {
    const isDeleteConfirmed = await this._modalService.openModal(deleteModal, {
      message: `Do You want To Delete Product: ${product.productInfo.name}? `,
    });

    if (isDeleteConfirmed?.state) {
      this._inventoryManager.deleteProductFromStock(product).subscribe();
    }
  }

  public async openPurchaseReport(): Promise<void> {
    const purchaseReportCreateRequest = await this._modalService.openModal(
      addPurchaseModal,
      this._productStocks,
    );

    if (purchaseReportCreateRequest != null) {
    }
  }

  public get productStocks() {
    return this._productStocks;
  }
}
