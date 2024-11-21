import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from "rxjs";
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
  Observable<ProductStock[]>,
  PurchaseReportData
> implements OnInit {

  public _productsStock: Observable<readonly ProductStock[]> = of([]);
  private readonly productsPurchaseReport: ProductOffset[] = [];
  protected _quantity: number = 0;
  protected _price: number = 0;

  public ngOnInit(): void{
    this._productsStock = this.input;
  }

  protected onSubmit(): void {
    if (this.isAddProductModalDataValid()) {

      //

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

  public get productsStock(){
    return this._productsStock;
  }
}

export const addPurchaseModal: ModalInfo<
  Observable<ProductStock[]>,
  PurchaseReportData,
  AddPurchaseReportModalFormComponent
> = {
  component: AddPurchaseReportModalFormComponent,
}
