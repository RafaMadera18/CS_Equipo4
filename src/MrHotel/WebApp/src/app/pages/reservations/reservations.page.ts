import { Component, OnInit } from "@angular/core";
import { RoomStatus } from "@customTypes/model/room-status";
import { Guid } from "@customTypes/model/guid";
import { Room } from "@customTypes/model/room";
import { RoomState } from "@customTypes/model/room-state";
import { RoomStatusComponent } from "@components/room-status/room-status.component";
import { roomsStatus } from "./reservations-data";

@Component({
  selector: "app-reservations",
  templateUrl: "./reservations.page.html",
  styleUrls: ["./reservations.page.scss"],
  standalone: true,
  imports: [RoomStatusComponent],
})
export class ReservationsPage implements OnInit {
  constructor() {}

  ngOnInit() {
    ("");
  }

  roomsStatusDisplay = roomsStatus;
}
