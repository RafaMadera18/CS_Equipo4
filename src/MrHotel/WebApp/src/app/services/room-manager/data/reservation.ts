import { Guid } from "@customTypes/.";
import { Room } from ".";
import { Guest } from "@services/guest-manager/data";

export type Reservation = {
  id: Guid;
  guest: Guest;
  room: Room;
  checkInDate: Date;
  checkOutDate: Date;
  price: number;
};
