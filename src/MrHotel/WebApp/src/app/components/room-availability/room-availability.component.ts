import { Component, computed, input, output, Signal } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import {
  bedOutline,
  lockClosedOutline,
  hammerOutline,
  alertCircleOutline,
  pencilOutline,
  trashOutline,
} from "ionicons/icons";

import {
  RoomAvailability,
  RoomAvailabilityState,
} from "@services/room-manager/data";

@Component({
  selector: "app-room-availability",
  templateUrl: "./room-availability.component.html",
  styleUrls: ["./room-availability.component.scss"],
  standalone: true,
  imports: [IonIcon, CommonModule],
})
export class RoomAvailabilityComponent {
  roomAvailability = input<RoomAvailability>();
  icon = this.getIconState();
  public readonly deleteClick = output();
  public readonly addReservation = output();
  public readonly editClick = output();

  constructor() {
    addIcons({
      bedOutline,
      lockClosedOutline,
      hammerOutline,
      alertCircleOutline,
      pencilOutline,
      trashOutline,
    });
  }

  getIconState(): Signal<string> {
    return computed(() => {
      switch (this.roomAvailability()!.state) {
        case RoomAvailabilityState.Available:
          return "bed-outline";
        case RoomAvailabilityState.Maintenance:
          return "hammer-outline";
        case RoomAvailabilityState.Occupied:
          return "lock-closed-outline";
        case RoomAvailabilityState.Unavailable:
          return "alert-circle-outline";
      }
    });
  }

  getColorState(): string {
    switch (this.roomAvailability()!.state) {
      case RoomAvailabilityState.Available:
        return "available";
      case RoomAvailabilityState.Maintenance:
        return "maintenance";
      case RoomAvailabilityState.Occupied:
        return "occupied";
      case RoomAvailabilityState.Unavailable:
        return "unavailable";
    }
  }
}
