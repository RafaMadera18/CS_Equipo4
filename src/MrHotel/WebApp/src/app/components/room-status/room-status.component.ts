import { Component, computed, input, output } from "@angular/core";

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

import { RoomState } from "@services/reservation-manager/data/room-state";
import { CommonModule } from "@angular/common";
import { Tag } from "@services/reservation-manager/data/tag";

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
  state = input.required<RoomState>();
  tags = input.required<Tag[]>();

  icon = computed(() => {
    switch (this.state()) {
      case RoomState.Available:
        return "bed-outline";
      case RoomState.Maintenance:
        return "hammer-outline";
      case RoomState.Occupied:
        return "lock-closed-outline";
      case RoomState.Unavailable:
        return "alert-circle-outline";
    }
  });

  public readonly deleteClick = output();

  getRoomColorState(): string {
    switch (this.state()) {
      case RoomState.Available:
        return "available";
      case RoomState.Maintenance:
        return "maintenance";
      case RoomState.Occupied:
        return "occupied";
      case RoomState.Unavailable:
        return "unavailable";
    }
  }
}
