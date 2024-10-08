import { Component, Type } from "@angular/core";
import { CommonModule } from "@angular/common";

import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";

import { Observable } from "rxjs";

import { RoomStatusComponent } from "@components/room-status/room-status.component";
import { ModalController } from "@ionic/angular";
import { AddRoomModalFormComponent } from "@components/modals/add-room-modal-form";
import { ReservationManagerService } from "@services/reservation-manager";
import { RoomStatus, Room } from "@services/reservation-manager/data";
import { IonicModule } from "@ionic/angular";
import * as Random from "@utilities/random";
import { BaseModalFormComponent } from "@components/modals/modal-base-form-component";

@Component({
  selector: "app-reservations",
  templateUrl: "./reservations.page.html",
  styleUrls: ["./reservations.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RoomStatusComponent,
    AddRoomModalFormComponent,
    IonicModule,
  ],
})
export class ReservationsPage {
  protected readonly roomStatuses: Observable<RoomStatus[]>;

  constructor(
    private readonly reservationManager: ReservationManagerService,
    private modalController: ModalController,
  ) {
    addIcons({ addOutline });

    this.roomStatuses = reservationManager.getRoomStatuses();
  }

  public async addRoom(): Promise<void> {
    const roomData = await this.openModal(AddRoomModalFormComponent);

    if(roomData) {
      this.reservationManager.addRoom(roomData.name).subscribe();
    }
  }

  public deleteRoom(room: Room): void {
    this.reservationManager.deleteRoom(room).subscribe();
  }

  private async openModal(
    component: Type<BaseModalFormComponent>,
  ): Promise<any> {
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'add-room-modal'
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    return data;
  }
}
