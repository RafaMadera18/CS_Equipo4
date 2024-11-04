import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BaseModalFormComponent } from "../modal-base-form.component";

import { ModalInfo } from "@services/modal/modal-info";
import { GuestCreateRequest } from "@services/guest-manager/data";
import { CalendarDate } from "calendar-date";

@Component({
  selector: "app-add-guest-modal-form",
  templateUrl: "./add-guest-modal-form.component.html",
  styleUrls: ["./add-guest-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddGuestModalFormComponent extends BaseModalFormComponent<
  void,
  GuestCreateRequest
> {
  protected fullName: string = "";
  protected phoneNumber: string = "";
  protected dateOfBirth: string = "";

  protected onSubmit(): void {
    if (this.isAddGuestModalDataValid()) {
      const guestCreateRequest = new GuestCreateRequest(
        this.fullName,
        this.phoneNumber,
        CalendarDate.fromDateUTC(new Date(this.dateOfBirth)),
      );

      this.submitModal(guestCreateRequest);
    } else {
      // TODO
      console.error("Guest data is invalid");
      this.dismissModal();
    }
  }

  private isAddGuestModalDataValid(): boolean {
    return !!(
      this.fullName.trim() &&
      this.phoneNumber.trim() &&
      this.dateOfBirth.trim()
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
  void,
  GuestCreateRequest,
  AddGuestModalFormComponent
> = {
  component: AddGuestModalFormComponent,
};
