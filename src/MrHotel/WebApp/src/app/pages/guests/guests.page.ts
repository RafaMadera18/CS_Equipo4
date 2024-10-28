import { Component } from "@angular/core";
import { Observable, of } from "rxjs";
import { Guest } from "@services/guest-manager/data";
import { Guid } from "@customTypes/guid";
import { CommonModule } from "@angular/common";
import { addIcons } from "ionicons";
import { pencilOutline, trashOutline, personAddOutline } from "ionicons/icons";
import { IonicModule } from "@ionic/angular";
import { ModalService } from "@services/modal/modal.service";
import {
  addGuestModal,
  AddGuestModalData,
} from "@components/modals/add-guest-modal-form";
import { Nullable } from "@customTypes/index";

@Component({
  selector: "app-guests",
  templateUrl: "./guests.page.html",
  styleUrls: ["./guests.page.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class GuestsPage {
  protected readonly guests: Observable<Guest[]>;

  constructor(private readonly modalService: ModalService) {
    addIcons({ pencilOutline, trashOutline, personAddOutline });
    // TODO: Change for Guest Service
    this.guests = of([
      {
        id: "1" as Guid,
        name: "John Doe",
        phoneNumber: "123-456-7890",
        dateOfBirth: new Date(1990, 1, 15),
      },
      {
        id: "2" as Guid,
        name: "Jane Smith",
        phoneNumber: "234-567-8901",
        dateOfBirth: new Date(1985, 5, 24),
      },
      {
        id: "3" as Guid,
        name: "Alice Johnson",
        phoneNumber: "345-678-9012",
        dateOfBirth: new Date(2000, 10, 2),
      },
    ]);
  }

  public async addGuest(): Promise<void> {
    const guestData = await this.modalService.openModal(addGuestModal);
    //TODO: Add GuestManager
    console.log(guestData);
  }

  public async deleteGuest(guest: Guest): Promise<void> {}
}
