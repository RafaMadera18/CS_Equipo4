import { RoomAvailabilityState, RoomInfo } from ".";

export type RoomAvailability = {
  room: RoomInfo;
  state: RoomAvailabilityState;
};
