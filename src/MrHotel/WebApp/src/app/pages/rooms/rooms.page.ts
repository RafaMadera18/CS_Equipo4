import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";

import { Observable } from "rxjs";

import { RoomAvailabilityComponent } from "@components/room-availability/room-availability.component";
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
import { editRoomModal } from "@components/modals/rooms/edit-room-modal-form/edit-room-modal-form.component";
import { addReservationModal } from "@components/modals/reservations/add-reservation-modal-form";
import { ReservationManagerService } from "@services/reservation-manager/reservation-manager.service";
import { ReservationInfo } from "@services/reservation-manager/data";
import { checkOutModal } from "@components/modals/reservations/check-out-modal-form";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.page.html",
  styleUrls: ["./rooms.page.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule, RoomAvailabilityComponent],
})
export class RoomsPage {
  private readonly _roomsAvailability: Observable<readonly RoomAvailability[]>;

  constructor(
    private readonly _roomManager: RoomManagerService,
    private readonly _roomAvailabilityManager: RoomAvailabilityManagerService,
    private readonly _modalService: ModalService,
    private readonly _reservationManager: ReservationManagerService,
  ) {
    addIcons({ addOutline });

    this._roomsAvailability =
      this._roomAvailabilityManager.getRoomsAvailability();
  }

  public async addRoom(): Promise<void> {
    const roomData = await this._modalService.openModal(addRoomModal);

    if (roomData !== null) {
      const request = new RoomCreationData(roomData.name);
      this._roomManager.addRoom(request).subscribe();
    }
  }

  public async deleteRoom(room: RoomInfo): Promise<void> {
    const isDeleteConfirmed = await this._modalService.openModal(deleteModal, {
      message: `Do You want To Delete Room: ${room.name}?`,
    });

    if (isDeleteConfirmed !== null) {
      this._roomManager.deleteRoom(room).subscribe();
    }
  }

  public async updateRoom(room: RoomInfo): Promise<void> {
    const editedRoom = await this._modalService.openModal(editRoomModal, room);

    if (editedRoom !== null) {
      this._roomManager.updateRoom(editedRoom).subscribe();
    }
  }

  public async addReservation(room: RoomInfo): Promise<void> {
    const reservationCreationData = await this._modalService.openModal(
      addReservationModal,
      room,
    );

    if (reservationCreationData !== null) {
      this._reservationManager
        .addReservation(reservationCreationData)
        .subscribe();
    }
  }

  public async makeCheckout(reservation: ReservationInfo): Promise<void> {
    const checkOutConfirmed = await this._modalService.openModal(
      checkOutModal,
      reservation,
    );

    if (checkOutConfirmed) {
      this._reservationManager.makeCheckout(reservation).subscribe();
    }
  }

  public get roomsAvailability() {
    return this._roomsAvailability;
  }
}
