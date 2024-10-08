import { Guid } from "@customTypes/.";
import { RoomState, Room, roomEmpty } from ".";

export type RoomStatus = {
  room: Room;
  state: RoomState;
};

export function roomStatusEmpty(id: Guid, name: string): RoomStatus {
  return {
    room: roomEmpty(id, name),
    state: RoomState.Available,
  };
}
