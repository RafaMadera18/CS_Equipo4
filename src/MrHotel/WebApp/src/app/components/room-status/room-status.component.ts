import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { RoomState } from "@customTypes/model/room-state";
import { CommonModule } from "@angular/common";
import { Tag } from "@customTypes/model/tag";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import {
  bedOutline,
  lockClosedOutline,
  hammerOutline,
  alertCircleOutline,
  pencilOutline,
  trashOutline
} from "ionicons/icons";

@Component({
  selector: "app-room-status",
  templateUrl: "./room-status.component.html",
  styleUrls: ["./room-status.component.scss"],
  standalone: true,
  imports: [IonIcon, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomStatusComponent {
  constructor() {
    addIcons({
      bedOutline,
      lockClosedOutline,
      hammerOutline,
      alertCircleOutline,
      pencilOutline,
      trashOutline
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
