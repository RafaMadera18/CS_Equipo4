import { Component } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseModalFormComponent } from "../modal-base-form.component";
import { ModalInfo } from "@services/modal/modal-info";

import { ProductStockCreationData } from "@services/inventory-manager/data";

@Component({
  selector: "app-add-product-modal-form",
  templateUrl: "./add-product-modal-form.component.html",
  styleUrls: ["./add-product-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddProductModalFormComponent extends BaseModalFormComponent<
  void,
  ProductStockCreationData
> {
  protected _name: string = "";
  protected _idealQuantity: number = 0;
  protected _stockQuantity: number = 0;

  public onSubmit(): void {
    if (this.isAddProductModalDataValid()) {
      const productCreationData = new ProductStockCreationData(
        this._name,
        this._idealQuantity,
        this._stockQuantity,
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
  AddProductModalFormComponent
> = {
  component: AddProductModalFormComponent,
};
