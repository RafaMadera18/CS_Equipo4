import { Component } from "@angular/core";
import { RoomPropertyGroupsSettingsComponent } from "@components/room-property-groups-settings";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
  standalone: true,
  imports: [RoomPropertyGroupsSettingsComponent],
})
export class SettingsPage {}
