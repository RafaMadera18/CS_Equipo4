import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseModalFormComponent } from "../modal-base-form.component";
import { ReservationCreationData } from "@services/reservation-manager/data/reservation-creation-data";
import { ModalInfo } from "@services/modal/modal-info";
import { GuestManagerService } from "@services/guest-manager";
import { ModalController } from "@ionic/angular";
import { GuestInfo } from "@services/guest-manager/data";

@Component({
  selector: "app-add-reservation-modal-form",
  templateUrl: "./add-reservation-modal-form.component.html",
  styleUrls: ["./add-reservation-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddReservationModalFormComponent extends BaseModalFormComponent<
  void,
  ReservationCreationData
> implements OnInit {
  private guests: GuestInfo[] = [];

  constructor(
    private readonly _guestManager: GuestManagerService,
    protected override readonly _modalController: ModalController,
  ) {
    super(_modalController);
  }

  public override onSubmit(): void {}

  public ngOnInit(): void {
    const observableGuests = this._guestManager.getGuests();
    observableGuests.subscribe()
  }


}

export const addReservationModal: ModalInfo<
  void,
  ReservationCreationData,
  AddReservationModalFormComponent
> = {
  component: AddReservationModalFormComponent,
};
