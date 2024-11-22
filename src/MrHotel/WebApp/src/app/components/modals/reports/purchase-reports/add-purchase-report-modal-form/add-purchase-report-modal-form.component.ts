import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseModalFormComponent } from "../../../modal-base-form.component";
import { ModalInfo } from "@services/modal/modal-info";
import { StockAdjustmentData } from "@services/report-manager/data/stock-adjustment-data";
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
  private _stockAdjustmentsData: StockAdjustmentData[] = [];
  private _price: number = 0;

  public ngOnInit(): void {
    this.input.subscribe((stocks) => {
      this._productStocks = stocks;

      this._stockAdjustmentsData = this._productStocks.map(
        (productStock) => new StockAdjustmentData(productStock.product.id, 0),
      );
    });
  }

  public get productStocks() {
    return this._productStocks;
  }

  public get stockAdjustmentsData() {
    return this._stockAdjustmentsData;
  }

  public get price() {
    return this._price;
  }

  public set price(price: number) {
    this._price = price;
  }

  public onSubmit(): void {
    const purchaseReportData = new PurchaseReportData(
      this._stockAdjustmentsData,
      this._price,
    );

    this.submitModal(purchaseReportData);
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
