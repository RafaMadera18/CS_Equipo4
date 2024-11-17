import { Component } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseModalFormComponent } from "../modal-base-form.component";
import { ModalInfo } from "@services/modal/modal-info";

import { ProductCreationData } from "@services/inventory-manager/data";

@Component({
  selector: 'app-add-product-modal-form',
  templateUrl: './add-product-modal-form.component.html',
  styleUrls: ['./add-product-modal-form.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddProductModalFormComponent extends BaseModalFormComponent<
void,
ProductCreationData
> {
  protected _name: string = "";
  protected _idealQuantity: number = 0;
  protected _stockQuantity: number = 0;


protected onSubmit(): void {
  if (this.isAddProductModalDataValid()) {
    const productCreationData = new ProductCreationData(
      this._name,
      this._idealQuantity,
      this._stockQuantity,
    );

    this.submitModal(productCreationData);
  } else {
    // TODO
    console.error("Product data is invalid");
    this.dismissModal();
  }
}

private isAddProductModalDataValid(): boolean {
  return !!(
    this._name.trim() &&
    this._idealQuantity>0 &&
    this._stockQuantity>0
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
  ProductCreationData,
  AddProductModalFormComponent
> = {
  component: AddProductModalFormComponent,
};
