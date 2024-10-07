import { Component, OnInit } from "@angular/core";
import { RoomStatus } from "@customTypes/model/room-status";
import { Guid } from "@customTypes/model/guid";
import { Room } from "@customTypes/model/room";
import { RoomState } from "@customTypes/model/room-state";
import { RoomStatusComponent } from "@components/room-status/room-status.component";
import { Tag, TagGroup } from "@customTypes/model/tag";

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
    ""
  }

  tag : Tag = {
    id: "1" as unknown as Guid,
    name: "4",
    group: {
      id: "1" as unknown as Guid,
      name: "Piso",
      tags: [],
      favorite: true
    },
  }

  tag2 : Tag = {
    id: "2" as unknown as Guid,
    name: "2",
    group: {
      id: "2" as unknown as Guid,
      name: "Personas",
      tags: [],
      favorite: true
    },
  }

  tag3 : Tag = {
    id: "3" as unknown as Guid,
    name: "Sencilla",
    group: {
      id: "3" as unknown as Guid,
      name: "Cama",
      tags: [],
      favorite: true
    },
  }

  roomsStatus = [
    {
      room: {
        id: "room1" as unknown as Guid, // Usa as unknown para evitar errores de tipo
        name: "Room 1",
        tags: [this.tag, this.tag2, this.tag3]
      },
      state: RoomState.Available
    },
    {
      room: {
        id: "room2" as unknown as Guid,
        name: "Room 2",
        tags: [this.tag, this.tag2, this.tag3]
      },
      state: RoomState.Occupied
    },
    {
      room: {
        id: "room3" as unknown as Guid,
        name: "Room 3",
        tags: [this.tag, this.tag2, this.tag3]
      },
      state: RoomState.Maintenance
    }
    // Puedes agregar más habitaciones aquí
  ];






}
