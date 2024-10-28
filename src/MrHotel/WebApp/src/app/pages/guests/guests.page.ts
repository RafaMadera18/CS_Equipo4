import { Component } from "@angular/core";
import { Observable} from "rxjs";
import { Guest } from "@services/guest-manager/data";
import { CommonModule } from "@angular/common";
import { addIcons } from "ionicons";
import { pencilOutline, trashOutline, personAddOutline } from "ionicons/icons";
import { IonicModule } from "@ionic/angular";
import { ModalService } from "@services/modal/modal.service";
import { addGuestModal } from "@components/modals/add-guest-modal-form";
import { deleteModal } from "@components/modals/delete-modal-form";
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
    const guestData = await this.modalService.openModal(addGuestModal);

    if (guestData) {
      this.guestManager
        .addGuest(
          guestData.name!,
          guestData.phoneNumber!,
          guestData.dateOfBirth!,
        )
        .subscribe();
    }
  }

  public async deleteGuest(guest: Guest): Promise<void> {
    const isDeleteConfirmed = await this.modalService.openModal(deleteModal, {
      message: `Do You want To Delete Guest: ${guest.name}? `,
    });

    if (isDeleteConfirmed?.state) {
      this.guestManager.deleteGuest(guest).subscribe();
    }
  }
}
