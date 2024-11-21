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
  private readonly _products: Observable<readonly ProductStock[]>;

  constructor(
    private readonly _inventoryManager: InventoryManagerService,
    private readonly _modalService: ModalService,
  ) {
    addIcons({ trashOutline, addOutline });
    this._products = _inventoryManager.getProductStock();
  }

  public async addProduct(): Promise<void> {
    const productCreateRequest =
      await this._modalService.openModal(addProductModal);

    if (productCreateRequest != null) {
      this._inventoryManager
        .addNewProductToStock(productCreateRequest)
        .subscribe();
    }
  }

  public async deleteProduct(product: ProductStock): Promise<void> {
    const isDeleteConfirmed = await this._modalService.openModal(deleteModal, {
      message: `Do You want To Delete Product: ${product.name}? `,
    });

    if (isDeleteConfirmed?.state) {
      this._inventoryManager.deleteProductFromStock(product).subscribe();
    }
  }

  public async openPurchaseReport(): Promise<void> {
    console.log(this._products);
    const purchaseReportCreateRequest = await this._modalService.openModal(
      addPurchaseModal,
      this._products,
    );

    if (purchaseReportCreateRequest != null) {
    }
  }

  public get products() {
    return this._products;
  }
}
