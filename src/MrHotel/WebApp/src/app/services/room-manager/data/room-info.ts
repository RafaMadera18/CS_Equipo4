import { Guid } from "@customTypes/.";
import { RoomProperty } from ".";

export type RoomInfo = {
  id: Guid;
  name: string;
  properties: RoomProperty[];
};
