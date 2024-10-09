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
  deleteRoomModal,
  DeleteRoomModalFormComponent,
} from "@components/modals/delete-room-modal-form";

import { RoomManagerService } from "@services/room-manager";
import { RoomStatus, Room } from "@services/room-manager/data";
import { ModalService } from "@services/modal/modal.service";

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
    DeleteRoomModalFormComponent,
  ],
})
export class RoomsPage {
  protected readonly roomStatuses: Observable<RoomStatus[]>;

  constructor(
    private readonly roomManager: RoomManagerService,
    private readonly modalService: ModalService,
  ) {
    addIcons({ addOutline });

    this.roomStatuses = roomManager.getRoomStatuses();
  }

  public async addRoom(): Promise<void> {
    const roomData = await this.modalService.openModal(addRoomModal);

    if (roomData.name) {
      this.roomManager.addRoom(roomData.name).subscribe();
    }
  }

  public async deleteRoom(room: Room): Promise<void> {
    const isDeleteConfirmed =
      await this.modalService.openModal(deleteRoomModal);

    if (isDeleteConfirmed.state) {
      this.roomManager.deleteRoom(room).subscribe();
    }
  }
}
