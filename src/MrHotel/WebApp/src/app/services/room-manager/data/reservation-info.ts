import { Guid } from "@customTypes/.";
import { RoomInfo } from ".";
import { GuestInfo } from "@services/guest-manager/data";

export type ReservationInfo = {
  id: Guid;
  guest: GuestInfo;
  room: RoomInfo;
  checkInDate: Date;
  checkOutDate: Date;
  price: number;
};
