import { Component, computed, input, output } from "@angular/core";
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
  name = input("");
  state = input.required<RoomAvailabilityState>();
  tags = input.required<RoomProperty[]>();

  icon = computed(() => {
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

  public readonly deleteClick = output();

  getRoomColorState(): string {
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
