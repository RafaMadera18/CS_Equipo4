// TODO: Remove

import { Tag } from "@services/reservation-manager/data/tag";
import { Guid } from "@customTypes/guid";
import { RoomStatus } from "@services/reservation-manager/data/room-status";
import { RoomState } from "@services/reservation-manager/data/room-state";

const tag: Tag = {
  id: "1" as unknown as Guid,
  name: "4",
  group: {
    id: "1" as unknown as Guid,
    name: "Piso",
    tags: [],
    favorite: true,
  },
};

const tag2: Tag = {
  id: "2" as unknown as Guid,
  name: "2",
  group: {
    id: "2" as unknown as Guid,
    name: "Personas",
    tags: [],
    favorite: true,
  },
};

const tag3: Tag = {
  id: "3" as unknown as Guid,
  name: "Sencilla",
  group: {
    id: "3" as unknown as Guid,
    name: "Cama",
    tags: [],
    favorite: true,
  },
};

export const roomsStatus: RoomStatus[] = [
  {
    room: {
      id: "room1" as unknown as Guid,
      name: "Room 1",
      tags: [tag, tag2, tag3],
    },
    state: RoomState.Available,
  },
  {
    room: {
      id: "room2" as unknown as Guid,
      name: "Room 2",
      tags: [tag, tag2, tag3],
    },
    state: RoomState.Occupied,
  },
  {
    room: {
      id: "room3" as unknown as Guid,
      name: "Room 3",
      tags: [tag, tag2, tag3],
    },
    state: RoomState.Maintenance,
  },
  {
    room: {
      id: "room4" as unknown as Guid,
      name: "Room 4",
      tags: [tag, tag2, tag3],
    },
    state: RoomState.Occupied,
  },
  {
    room: {
      id: "room5" as unknown as Guid,
      name: "Room 5",
      tags: [tag, tag2, tag3],
    },
    state: RoomState.Available,
  },
  {
    room: {
      id: "room6" as unknown as Guid,
      name: "Room 6",
      tags: [tag, tag2, tag3],
    },
    state: RoomState.Unavailable,
  },
];
