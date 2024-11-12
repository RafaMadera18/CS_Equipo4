import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";
import { IonicModule } from "@ionic/angular";
import { GuestInfo } from "@services/guest-manager/data";
import { ModalInfo } from "@services/modal/modal-info";
import { CalendarDate } from "calendar-date";

@Component({
  selector: "app-edit-guest-modal-form",
  templateUrl: "./edit-guest-modal-form.component.html",
  styleUrls: ["./edit-guest-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class EditGuestModalFormComponent extends BaseModalFormComponent<
  GuestInfo,
  GuestInfo
> {
  private _fullName: string = "";
  private _phoneNumber: string = "";
  private _dateOfBirth: string = "";

  public onSubmit(): void {
    if (this.isGuestDataValid()) {
      const guest = new GuestInfo(
        this.input.id,
        this._fullName,
        this._phoneNumber,
        CalendarDate.fromDateUTC(new Date(this._dateOfBirth)),
      );

      this.submitModal(guest);
    } else {
      console.error("Guest data is invalid");
      this.dismissModal();
    }
  }

  private isGuestDataValid(): boolean {
    return !!(
      this._fullName.trim() &&
      this._phoneNumber.trim() &&
      this._dateOfBirth.trim()
    );
  }

  public acceptOnlyNumbers(event: KeyboardEvent) {
    const char = event.key;

    if (!/^\d$/.test(char)) {
      event.preventDefault();
    }
  }

  public get fullName() {
    return this._fullName;
  }

  public set fullName(fullName: string) {
    this._fullName = fullName;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  public get dateOfBirth(): string {
    return this._dateOfBirth;
  }

  public set dateOfBirth(value: string) {
    this._dateOfBirth = value;
  }
}

export const addGuestModal: ModalInfo<
  GuestInfo,
  GuestInfo,
  EditGuestModalFormComponent
> = {
  component: EditGuestModalFormComponent,
};
