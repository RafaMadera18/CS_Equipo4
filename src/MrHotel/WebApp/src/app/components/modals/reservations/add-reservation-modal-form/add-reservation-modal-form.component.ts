import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { BaseModalFormComponent } from "../../modal-base-form.component";
import { ReservationCreationData } from "@services/reservation-manager/data/reservation-creation-data";
import { ModalInfo } from "@services/modal/modal-info";
import { GuestManagerService } from "@services/guest-manager";
import { GuestInfo } from "@services/guest-manager/data";
import { RoomInfo } from "@services/room-manager/data";
import { Observable } from "rxjs";
import { Guid } from "@customTypes/guid";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-add-reservation-modal-form",
  templateUrl: "./add-reservation-modal-form.component.html",
  styleUrls: ["./add-reservation-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AddReservationModalFormComponent extends BaseModalFormComponent<
  RoomInfo,
  ReservationCreationData
> {
  private readonly _guests: Observable<readonly GuestInfo[]>;
  private _guestId: Guid;
  private readonly _checkInDate: Date;
  private _checkOutDate: string;
  private _price: number;

  constructor(
    private readonly _guestManager: GuestManagerService,
    protected override readonly _modalController: ModalController,
  ) {
    super(_modalController);
    this._guests = this._guestManager.getGuests();
    this._guestId = "" as Guid;
    this._checkInDate = new Date();
    this._checkOutDate = "";
    this._price = 0;
  }

  public override onSubmit(): void {
    if (this.isReservationValidData()) {
      const checkOutDate = new Date(this._checkOutDate);
      const reservationCreationData = new ReservationCreationData(
        this._guestId,
        this.input,
        this._checkInDate,
        checkOutDate,
        this._price,
      );
      this.submitModal(reservationCreationData);
    } else {
      this.dismissModal();
    }
  }

  private isReservationValidData(): boolean {
    return this.isValidPrice() && this.isValidCheckOutDate();
  }

  private isValidPrice(): boolean {
    return this._price >= 0;
  }

  private isValidCheckOutDate(): boolean {
    const checkOutDate = new Date(this._checkOutDate);
    return checkOutDate > this._checkInDate;
  }

  public get guests() {
    return this._guests;
  }

  public get guestId() {
    return this._guestId;
  }

  public set guestId(id: Guid) {
    this._guestId = id;
  }

  public get checkOutDate() {
    return this._checkOutDate;
  }

  public set checkOutDate(checkOutDate: string) {
    this._checkOutDate = checkOutDate;
  }

  public get price() {
    return this._price;
  }

  public set price(price: number) {
    this._price = price;
  }
}

export const addReservationModal: ModalInfo<
  RoomInfo,
  ReservationCreationData,
  AddReservationModalFormComponent
> = {
  component: AddReservationModalFormComponent,
};
