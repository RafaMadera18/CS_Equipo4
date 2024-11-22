import { ReservationInfo } from "@services/reservation-manager/data";
import { RoomAvailabilityState, RoomInfo } from ".";
import { Nullable } from "@customTypes/nullable";

export type RoomAvailability = {
  room: RoomInfo;
  state: RoomAvailabilityState;
  activeReservation: Nullable<ReservationInfo>;
};
