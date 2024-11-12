import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";

import { Observable } from "rxjs";

import { RoomStatusComponent } from "@components/room-status/room-status.component";
import { addRoomModal } from "@components/modals/rooms/add-room-modal-form";
import { deleteModal } from "@components/modals/delete-modal-form";

import { ModalService } from "@services/modal/modal.service";
import { RoomManagerService } from "@services/room-manager";

import {
  RoomAvailability,
  RoomInfo,
  RoomCreationData,
} from "@services/room-manager/data";
import { RoomAvailabilityManagerService } from "@services/room-availability-manager/room-availability-manager.service";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.page.html",
  styleUrls: ["./rooms.page.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule, RoomStatusComponent],
})
export class RoomsPage {
  private readonly _roomsAvailability: Observable<readonly RoomAvailability[]>;

  constructor(
    private readonly _roomManager: RoomManagerService,
    roomAvailabilityManager: RoomAvailabilityManagerService,
    private readonly _modalService: ModalService,
  ) {
    addIcons({ addOutline });

    this._roomsAvailability = roomAvailabilityManager.getRoomsAvailability();
  }

  public get roomsAvailability() {
    return this._roomsAvailability;
  }

  public async addRoom(): Promise<void> {
    const roomData = await this._modalService.openModal(addRoomModal);

    if (roomData?.name) {
      const request = new RoomCreationData(roomData.name);
      this._roomManager.addRoom(request).subscribe();
    }
  }

  public async deleteRoom(room: RoomInfo): Promise<void> {
    const isDeleteConfirmed = await this._modalService.openModal(deleteModal, {
      message: `Do You want To Delete Room: ${room.name}?`,
    });

    if (isDeleteConfirmed?.state) {
      this._roomManager.deleteRoom(room).subscribe();
    }
  }

  public async addReservation(): Promise<void> {
    // TODO: Create Logic to add a Reservation
    console.log("Conectado");
  }
}
