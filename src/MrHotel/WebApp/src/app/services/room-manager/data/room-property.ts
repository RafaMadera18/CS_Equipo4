import { Guid } from "@customTypes/.";
import { RoomPropertyGroup } from ".";

export type RoomProperty = {
  id: Guid;
  name: string;
  group: RoomPropertyGroup;
};
