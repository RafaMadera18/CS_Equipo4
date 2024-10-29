import { Guid } from "@customTypes/.";
import { RoomProperty } from ".";

export type RoomPropertyGroup = {
  id: Guid;
  name: string;
  properties: RoomProperty[];
};
