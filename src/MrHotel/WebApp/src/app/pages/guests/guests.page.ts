import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { addIcons } from "ionicons";
import { pencilOutline, trashOutline, personAddOutline } from "ionicons/icons";

import { Observable } from "rxjs";
import { Guest } from "@services/guest-manager/data";

import { addGuestModal } from "@components/modals/add-guest-modal-form";
import { deleteModal } from "@components/modals/delete-modal-form";

import { ModalService } from "@services/modal/modal.service";
import { GuestManagerService } from "@services/guest-manager";

@Component({
  selector: "app-guests",
  templateUrl: "./guests.page.html",
  styleUrls: ["./guests.page.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class GuestsPage {
  protected readonly guests: Observable<Guest[]>;

  constructor(
    private readonly guestManager: GuestManagerService,
    private readonly modalService: ModalService,
  ) {
    addIcons({ pencilOutline, trashOutline, personAddOutline });

    this.guests = guestManager.getGuests();
  }

  public async addGuest(): Promise<void> {
    const guestCreateRequest = await this.modalService.openModal(addGuestModal);

    if (guestCreateRequest != null) {
      this.guestManager.addGuest(guestCreateRequest).subscribe();
    }
  }

  public async deleteGuest(guest: Guest): Promise<void> {
    const isDeleteConfirmed = await this.modalService.openModal(deleteModal, {
      message: `Do You want To Delete Guest: ${guest.fullName}? `,
    });

    if (isDeleteConfirmed?.state) {
      this.guestManager.deleteGuest(guest).subscribe();
    }
  }
}
