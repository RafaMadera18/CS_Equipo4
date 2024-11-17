import { Guid } from "@customTypes/guid";
import { RoomProperty } from "./room-property";

export type RoomPropertyGroup = {
  id: Guid;
  name: string;
  properties: RoomProperty[];
};
