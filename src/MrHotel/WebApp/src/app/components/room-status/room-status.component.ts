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
  RoomAvailabilityState,
  RoomProperty,
} from "@services/room-manager/data";

@Component({
  selector: "app-room-status",
  templateUrl: "./room-status.component.html",
  styleUrls: ["./room-status.component.scss"],
  standalone: true,
  imports: [IonIcon, CommonModule],
})
export class RoomStatusComponent {
  // TODO: Change Component Name
  name = input("");
  icon = this.getIconState();
  state = input.required<RoomAvailabilityState>();
  tags = input.required<RoomProperty[]>();
  public readonly deleteClick = output();
  public readonly addReservation = output();

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
      switch (this.state()) {
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
    switch (this.state()) {
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
