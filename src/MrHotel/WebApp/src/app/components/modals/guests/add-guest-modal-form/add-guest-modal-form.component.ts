import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BaseModalFormComponent } from "../../modal-base-form.component";

import { ModalInfo } from "@services/modal/modal-info";
import { GuestCreationData } from "@services/guest-manager/data";
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
  GuestCreationData
> {
  private _fullName: string = "";
  private _phoneNumber: string = "";
  private _dateOfBirth: string = "";

  public get fullName(): string {
    return this._fullName;
  }

  public set fullName(value: string) {
    this._fullName = value;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public get dateOfBirth(): string {
    return this._dateOfBirth;
  }

  public set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  set dateOfBirth(value: string) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    if (!dateRegex.test(value)) {
      throw new Error("Date of birth must be in the format YYYY-MM-DD.");
    }
    this._dateOfBirth = value;
  }

  public onSubmit(): void {
    if (this.isAddGuestModalDataValid()) {
      const guestCreationData = new GuestCreationData(
        this._fullName,
        this._phoneNumber,
        CalendarDate.fromDateUTC(new Date(this._dateOfBirth)),
      );

      this.submitModal(guestCreationData);
    } else {
      console.error("Guest data is invalid");
      this.dismissModal();
    }
  }

  private isAddGuestModalDataValid(): boolean {
    return !!(
      this._fullName.trim() &&
      this._phoneNumber.trim() &&
      this._dateOfBirth.trim()
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
  GuestCreationData,
  AddGuestModalFormComponent
> = {
  component: AddGuestModalFormComponent,
};
