import { Guid } from "@customTypes/guid";
import { RoomPropertyGroup } from "./room-property-group";
import { Nullable } from "@customTypes/index";

export type RoomProperty = {
  id: Nullable<Guid>;
  name: string;
  group: RoomPropertyGroup;
};
