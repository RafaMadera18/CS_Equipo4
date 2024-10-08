import { Component, Type } from "@angular/core";
import { CommonModule } from "@angular/common";

import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";

import { Observable } from "rxjs";

import { RoomStatusComponent } from "@components/room-status/room-status.component";
import { ModalController } from "@ionic/angular";
import { AddRoomModalFormComponent } from "@components/modals/add-room-modal-form";
import { DeleteRoomModalFormComponent } from "@components/modals/delete-room-modal-form";
import { RoomManagerService } from "@services/room-manager";
import { RoomStatus, Room } from "@services/room-manager/data";
import { IonicModule } from "@ionic/angular";
import { BaseModalFormComponent } from "@components/modals/modal-base-form-component";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.page.html",
  styleUrls: ["./rooms.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RoomStatusComponent,
    AddRoomModalFormComponent,
    IonicModule,
    DeleteRoomModalFormComponent
  ],
})
export class RoomsPage {
  protected readonly roomStatuses: Observable<RoomStatus[]>;

  constructor(
    private readonly roomManager: RoomManagerService,
    private modalController: ModalController,
  ) {
    addIcons({ addOutline });

    this.roomStatuses = roomManager.getRoomStatuses();
  }

  public async addRoom(): Promise<void> {
    const roomData = await this.openModal(AddRoomModalFormComponent, "add-room-modal");

    if (roomData.name) {
      this.roomManager.addRoom(roomData.name).subscribe();
    }
  }

  public async deleteRoom(room: Room): Promise<void> {
    const isDeleteConfirmed = await this.openModal(DeleteRoomModalFormComponent, "delete-room-modal");

    if (isDeleteConfirmed.state){
      this.roomManager.deleteRoom(room).subscribe();
    }
  }

  private async openModal(
    component: Type<BaseModalFormComponent>,
    cssClass: string,
  ): Promise<any> {
    const modal = await this.modalController.create({
      component: component,
      cssClass: cssClass,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    return data;
  }
}
