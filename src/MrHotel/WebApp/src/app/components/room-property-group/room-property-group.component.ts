import { Component, input } from "@angular/core";
import { RoomPropertyGroup } from "@services/room-property-group-manager/data";

@Component({
  selector: "app-room-property-group",
  templateUrl: "./room-property-group.component.html",
  styleUrls: ["./room-property-group.component.scss"],
})
export class RoomPropertyGroupComponent {
  _roomProperty = input<RoomPropertyGroup>();

  constructor() {}
}
