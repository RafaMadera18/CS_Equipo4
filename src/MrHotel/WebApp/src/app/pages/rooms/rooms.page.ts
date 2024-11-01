import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";

import { Observable } from "rxjs";

import { RoomStatusComponent } from "@components/room-status/room-status.component";
import {
  addRoomModal,
  AddRoomModalFormComponent,
} from "@components/modals/add-room-modal-form";
import {
  deleteModal,
  DeleteModalFormComponent,
} from "@components/modals/delete-modal-form";

import { ModalService } from "@services/modal/modal.service";
import { RoomManagerService } from "@services/room-manager";

import {
  RoomAvailability,
  RoomInfo,
  RoomCreateRequest,
} from "@services/room-manager/data";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.page.html",
  styleUrls: ["./rooms.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RoomStatusComponent,
    AddRoomModalFormComponent,
    DeleteModalFormComponent,
  ],
})
export class RoomsPage {
  protected readonly roomsAvailability: Observable<RoomAvailability[]>;

  constructor(
    private readonly roomManager: RoomManagerService,
    private readonly modalService: ModalService,
  ) {
    addIcons({ addOutline });

    this.roomsAvailability = roomManager.getRoomsAvailability();
  }

  public async addRoom(): Promise<void> {
    const roomData = await this.modalService.openModal(addRoomModal);

    if (roomData?.name) {
      const request = new RoomCreateRequest(roomData.name);
      this.roomManager.addRoom(request).subscribe();
    }
  }

  public async deleteRoom(room: RoomInfo): Promise<void> {
    const isDeleteConfirmed = await this.modalService.openModal(deleteModal, {
      message: `Do You want To Delete Room: ${room.name}?`,
    });

    if (isDeleteConfirmed?.state) {
      this.roomManager.deleteRoom(room).subscribe();
    }
  }

  public async addReservation(): Promise<void> {
    // TODO: Create Logic to add a Reservation
    console.log("Conectado")
  }
}
