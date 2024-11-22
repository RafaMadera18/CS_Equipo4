import { Component, OnInit } from "@angular/core";
import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";
import { ProductStock } from "@services/inventory-manager/data";
import { ModalInfo } from "@services/modal/modal-info";
import {
  StockAdjustmentData,
  UsageReportData,
} from "@services/report-manager/data";
import { Observable } from "rxjs";

import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-add-usage-report-modal-form",
  templateUrl: "./add-usage-report-modal-form.component.html",
  styleUrls: ["./add-usage-report-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AddUsageReportModalFormComponent
  extends BaseModalFormComponent<Observable<ProductStock[]>, UsageReportData>
  implements OnInit
{
  private _productStocks: ProductStock[] = [];
  private _stockAdjustmentsData: StockAdjustmentData[] = [];
  private _concept: string = "";

  public ngOnInit(): void {
    this.input.subscribe((stocks) => {
      this._productStocks = stocks;

      this._stockAdjustmentsData = this._productStocks.map(
        (productStock) => new StockAdjustmentData(productStock.product.id, 0),
      );
    });
  }

  public get concept() {
    return this._concept;
  }

  public get stockAdjustmentsData() {
    return this._stockAdjustmentsData;
  }

  public set concept(concept: string) {
    this._concept = concept;
  }

  public override onSubmit(): void {
    const purchaseReportData = new UsageReportData(
      this._stockAdjustmentsData,
      this._concept,
    );

    this.submitModal(purchaseReportData);
  }

  public get productStocks() {
    return this._productStocks;
  }
}

export const addUsageModal: ModalInfo<
  Observable<ProductStock[]>,
  UsageReportData,
  AddUsageReportModalFormComponent
> = {
  component: AddUsageReportModalFormComponent,
};
