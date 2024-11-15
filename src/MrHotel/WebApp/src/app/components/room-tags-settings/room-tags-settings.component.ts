import { Component } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";

@Component({
  selector: "app-room-tags-settings",
  templateUrl: "./room-tags-settings.component.html",
  styleUrls: ["./room-tags-settings.component.scss"],
  standalone: true,
  imports: [IonIcon],
})
export class RoomTagsSettingsComponent {
  constructor() {
    addIcons({ addOutline });
  }
}
