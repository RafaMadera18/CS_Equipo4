import { Component } from "@angular/core";
import { RoomTagsSettingsComponent } from "@components/room-tags-settings";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
  standalone: true,
  imports: [RoomTagsSettingsComponent],
})
export class SettingsPage {
  constructor() {}
}
