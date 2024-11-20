import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseModalFormComponent } from "../modal-base-form.component";
import { ModalInfo } from "@services/modal/modal-info";
import { ProductOffset } from '@services/report-manager/data/product-offset';
import { PurchaseReportData } from '@services/report-manager/data/purchase-report-data';
import { ProductStock } from '@services/inventory-manager/data';

@Component({
  selector: 'app-add-purchase-report-modal-form',
  templateUrl: './add-purchase-report-modal-form.component.html',
  styleUrls: ['./add-purchase-report-modal-form.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AddPurchaseReportModalFormComponent extends BaseModalFormComponent<
  ProductStock[],
  PurchaseReportData
> implements OnInit {

  public products: ProductStock[] = []
  private readonly productsPurchaseReport: ProductOffset[] = []
  protected _quantity: number = 0;
  protected _price: number = 0;

  ngOnInit() {
    if (this.input && Array.isArray(this.input)) {
      this.products = this.input;
    }
  }

  protected onSubmit(): void {
    if (this.isAddProductModalDataValid()) {
      const selectedProducts = this.products.filter(product => product.selected);

      selectedProducts.forEach(product => {
        const productOffset = new ProductOffset(
          product.name,
          this._quantity,
        );
        this.productsPurchaseReport.push(productOffset);
      });

      const purchaseReportData = new PurchaseReportData(
        this.productsPurchaseReport,
        this._price
      );

      this.submitModal(purchaseReportData);
    } else {
      console.error("Product data is invalid");
      this.dismissModal();
    }
  }

  private isAddProductModalDataValid(): boolean {
    return !!(
      typeof this._quantity === "number" &&
      !isNaN(this._quantity) &&
      typeof this._price === "number" &&
      !isNaN(this._price)
    );
  }

  protected acceptOnlyNumbers(event: KeyboardEvent) {
    const char = event.key;

    if (!/^\d$/.test(char)) {
      event.preventDefault();
    }
  }
}

export const addPurchaseModal: ModalInfo<
  ProductStock[],
  PurchaseReportData,
  AddPurchaseReportModalFormComponent
> = {
  component: AddPurchaseReportModalFormComponent,
}
