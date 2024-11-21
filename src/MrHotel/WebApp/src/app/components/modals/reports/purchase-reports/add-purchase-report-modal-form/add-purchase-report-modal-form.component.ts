import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseModalFormComponent } from "../../../modal-base-form.component";
import { ModalInfo } from "@services/modal/modal-info";
import { ProductOffsetData } from "@services/report-manager/data/stock-adjustment-data";
import { PurchaseReportData } from "@services/report-manager/data/purchase-report-data";
import { ProductStock } from "@services/inventory-manager/data";

@Component({
  selector: "app-add-purchase-report-modal-form",
  templateUrl: "./add-purchase-report-modal-form.component.html",
  styleUrls: ["./add-purchase-report-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AddPurchaseReportModalFormComponent
  extends BaseModalFormComponent<Observable<ProductStock[]>, PurchaseReportData>
  implements OnInit
{
  private _productStocks: ProductStock[] = [];
  private _productsOffset: ProductOffsetData[] = [];
  private _quantities: number[] = [];
  private _price: number = 0;

  public ngOnInit(): void {
    this.input.subscribe((stocks) => {
      this._productStocks = stocks;
    });
  }

  public get productStocks() {
    return this._productStocks;
  }

  public get quantities() {
    return this._quantities;
  }

  public get price() {
    return this._price;
  }

  public set price(price: number) {
    this._price = price;
  }

  public onSubmit(): void {
    this._productsOffset = this.quantities.map(
      (quantity, i) =>
        new ProductOffsetData(this._productStocks[i].id, quantity),
    );

    if (true) {
      const purchaseReportData = new PurchaseReportData(
        this._productsOffset,
        this._price,
      );

      this.submitModal(purchaseReportData);
    } else {
      console.error("Product data is invalid");
      this.dismissModal();
    }
  }

  protected acceptOnlyNumbers(event: KeyboardEvent) {
    const char = event.key;

    if (!/^\d$/.test(char)) {
      event.preventDefault();
    }
  }
}

export const addPurchaseModal: ModalInfo<
  Observable<ProductStock[]>,
  PurchaseReportData,
  AddPurchaseReportModalFormComponent
> = {
  component: AddPurchaseReportModalFormComponent,
};
