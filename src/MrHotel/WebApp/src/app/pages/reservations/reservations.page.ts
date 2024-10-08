import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";

import { Observable } from "rxjs";

import { RoomStatusComponent } from "@components/room-status/room-status.component";
import { ReservationManagerService } from "@services/reservation-manager";
import { RoomStatus, Room } from "@services/reservation-manager/data";
import * as Random from "@utilities/random";

@Component({
  selector: "app-reservations",
  templateUrl: "./reservations.page.html",
  styleUrls: ["./reservations.page.scss"],
  standalone: true,
  imports: [CommonModule, RoomStatusComponent, IonIcon],
})
export class ReservationsPage {
  protected readonly roomStatuses: Observable<RoomStatus[]>;

  constructor(private readonly reservationManager: ReservationManagerService) {
    addIcons({ addOutline });

    this.roomStatuses = reservationManager.getRoomStatuses();
  }

  public addRoom(): void {
    const name: string = `Room ${Random.range(1, 1000)}`; // TODO
    this.reservationManager.addRoom(name).subscribe();
  }

  public deleteRoom(room: Room): void {
    this.reservationManager.deleteRoom(room).subscribe();
  }
}
