import { Component, OnInit } from "@angular/core";
import { RoomStatusComponent } from "@components/room-status/room-status.component";
import { roomsStatus } from "./reservations-data";
import { IonIcon } from "@ionic/angular/standalone";
import { addOutline } from "ionicons/icons";
import { addIcons } from "ionicons";

@Component({
  selector: "app-reservations",
  templateUrl: "./reservations.page.html",
  styleUrls: ["./reservations.page.scss"],
  standalone: true,
  imports: [RoomStatusComponent, IonIcon],
})
export class ReservationsPage implements OnInit {
  constructor() {
    addIcons({ addOutline });
  }

  ngOnInit() {
    ("");
  }

  roomsStatusDisplay = roomsStatus;
}
