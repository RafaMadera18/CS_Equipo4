import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ModalInfo } from "@services/modal/modal-info";
import { BaseModalFormComponent } from "../modal-base-form.component";
import { Nullable } from "@customTypes/nullable";

export type AddGuestModalData = {
  name: Nullable<string>;
  phoneNumber: Nullable<string>;
  dateOfBirth: Nullable<Date>;
};

@Component({
  selector: "app-add-guest-modal-form",
  templateUrl: "./add-guest-modal-form.component.html",
  styleUrls: ["./add-guest-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddGuestModalFormComponent extends BaseModalFormComponent<AddGuestModalData> {
  protected name: string = "";
  protected phoneNumber: string = "";
  protected dateOfBirth: Date = new Date();

  protected onSubmit(): void {
    const guestData: AddGuestModalData = {
      name: this.name,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dateOfBirth,
    };

    if (this.isAddGuestModalDataValid(guestData)) {
      this.submitModal(guestData);
    } else {
      console.error("Guest data is invalid:", guestData);
      this.dismissModal();
    }
  }

  private isAddGuestModalDataValid(guest: AddGuestModalData): boolean {
    return !!(
      guest.name?.trim() &&
      guest.phoneNumber?.trim() &&
      guest.dateOfBirth?.toLocaleDateString != new Date().toLocaleDateString
    );
  }

  protected acceptOnlyNumbers(event: KeyboardEvent) {
    const char = event.key;

    if (!/^\d$/.test(char)) {
      event.preventDefault();
    }
  }
}

export const addGuestModal: ModalInfo<
  AddGuestModalData,
  AddGuestModalFormComponent
> = {
  component: AddGuestModalFormComponent,
};
