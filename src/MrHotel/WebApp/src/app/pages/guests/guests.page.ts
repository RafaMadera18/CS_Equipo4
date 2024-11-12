import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { addIcons } from "ionicons";
import { pencilOutline, trashOutline, personAddOutline } from "ionicons/icons";

import { Observable } from "rxjs";
import { GuestInfo } from "@services/guest-manager/data";

import { addGuestModal } from "@components/modals/guests/add-guest-modal-form";
import { deleteModal } from "@components/modals/delete-modal-form";

import { ModalService } from "@services/modal/modal.service";
import { GuestManagerService } from "@services/guest-manager";
import { editGuestModal } from "@components/modals/guests/edit-guest-modal-form/";

@Component({
  selector: "app-guests",
  templateUrl: "./guests.page.html",
  styleUrls: ["./guests.page.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class GuestsPage {
  private readonly _guests: Observable<readonly GuestInfo[]>;

  constructor(
    private readonly _guestManager: GuestManagerService,
    private readonly _modalService: ModalService,
  ) {
    addIcons({ pencilOutline, trashOutline, personAddOutline });

    this._guests = _guestManager.getGuests();
  }

  public async addGuest(): Promise<void> {
    const guestCreateRequest =
      await this._modalService.openModal(addGuestModal);

    if (guestCreateRequest != null) {
      this._guestManager.addGuest(guestCreateRequest).subscribe();
    }
  }

  public async deleteGuest(guest: GuestInfo): Promise<void> {
    const isDeleteConfirmed = await this._modalService.openModal(deleteModal, {
      message: `Do You want To Delete Guest: ${guest.fullName}? `,
    });

    if (isDeleteConfirmed?.state) {
      this._guestManager.deleteGuest(guest).subscribe();
    }
  }

  public async editGuest(guest: GuestInfo): Promise<void> {
    const updatedGuest = await this._modalService.openModal(
      editGuestModal,
      guest,
    );

    if (updatedGuest != null) {
      console.log(updatedGuest);
    }
  }

  public get guests() {
    return this._guests;
  }
}
