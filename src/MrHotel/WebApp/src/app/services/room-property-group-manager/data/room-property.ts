import { Guid } from "@customTypes/guid";
import { RoomPropertyGroup } from "./room-property-group";

export type RoomProperty = {
  id: Guid;
  name: string;
  group: RoomPropertyGroup;
};
