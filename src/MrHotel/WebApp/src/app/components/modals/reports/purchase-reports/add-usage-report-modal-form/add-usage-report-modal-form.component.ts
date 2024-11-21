import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseModalFormComponent } from "../../../modal-base-form.component";
import { ModalInfo } from "@services/modal/modal-info";
import { StockAdjustmentData } from "@services/report-manager/data/stock-adjustment-data";
import { UsageReportData } from "@services/report-manager/data/usage-report-data";
import { ProductStock } from "@services/inventory-manager/data";

@Component({
  selector: "app-add-usage-report-modal-form",
  templateUrl: "./add-Usage-report-modal-form.component.html",
  styleUrls: ["./add-usage-report-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AddUsageReportModalFormComponent
  extends BaseModalFormComponent<Observable<ProductStock[]>, UsageReportData>
  implements OnInit
{
  private _productStocks: ProductStock[] = [];
  public _stockAdjustmentsData: StockAdjustmentData[] = [];


  public ngOnInit(): void {
    this.input.subscribe((stocks) => {
      this._productStocks = stocks;

      this._stockAdjustmentsData = this._productStocks.map(
        (productStock) => new StockAdjustmentData(productStock.id, 0),
      );
    });
  }

  public get productStocks() {
    return this._productStocks;
  }
  public onSubmit(): void {
    if (true) {
      const usageReportData = new UsageReportData(
        this._stockAdjustmentsData,
        "null"
      );
      console.log(this._stockAdjustmentsData);

      this.submitModal(usageReportData);
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

export const addUsageModal: ModalInfo<
  Observable<ProductStock[]>,
  UsageReportData,
  AddUsageReportModalFormComponent
> = {
  component: AddUsageReportModalFormComponent,
};
