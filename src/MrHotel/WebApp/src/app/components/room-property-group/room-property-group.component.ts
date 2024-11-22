import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { RoomPropertyGroup } from "@services/room-property-group-manager/data";

@Component({
  selector: "app-room-property-group",
  templateUrl: "./room-property-group.component.html",
  styleUrls: ["./room-property-group.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class RoomPropertyGroupComponent {
  public _roomPropertyGroup = input<RoomPropertyGroup>();
  public readonly _updateClick = output();
  public readonly _deleteClick = output();

  constructor() {}
}
