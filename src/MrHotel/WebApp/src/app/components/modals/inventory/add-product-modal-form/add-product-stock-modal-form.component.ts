import { Component } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseModalFormComponent } from "../../modal-base-form.component";
import { ModalInfo } from "@services/modal/modal-info";

import { ProductStockCreationData } from "@services/inventory-manager/data";

@Component({
  selector: "app-add-product-modal-form",
  templateUrl: "./add-product-stock-modal-form.component.html",
  styleUrls: ["./add-product-stock-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddProductStockModalFormComponent extends BaseModalFormComponent<
  void,
  ProductStockCreationData
> {
  private _name: string = "";
  private _idealQuantity: number = 0;
  private _stockQuantity: number = 0;

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get idealQuantity(): number {
    return this._idealQuantity;
  }

  public set idealQuantity(value: number) {
    this._idealQuantity = value;
  }

  public get stockQuantity(): number {
    return this._stockQuantity;
  }

  public set stockQuantity(value: number) {
    this._stockQuantity = value;
  }

  public onSubmit(): void {
    if (this.isAddProductModalDataValid()) {
      const productCreationData = new ProductStockCreationData(
        this._name,
        this._stockQuantity,
        this._idealQuantity,
      );

      this.submitModal(productCreationData);
    } else {
      console.error("Product data is invalid");
      this.dismissModal();
    }
  }

  private isAddProductModalDataValid(): boolean {
    return !!(
      this._name.trim() &&
      typeof this._idealQuantity === "number" &&
      !isNaN(this._idealQuantity)
    );
  }

  protected acceptOnlyNumbers(event: KeyboardEvent) {
    const char = event.key;

    if (!/^\d$/.test(char)) {
      event.preventDefault();
    }
  }
}

export const addProductModal: ModalInfo<
  void,
  ProductStockCreationData,
  AddProductStockModalFormComponent
> = {
  component: AddProductStockModalFormComponent,
};
