import { Guid } from "@customTypes/.";
import { Guest, Room } from ".";

export type Reservation = {
  id: Guid;
  guest: Guest;
  room: Room;
  checkInDate: Date;
  checkOutDate: Date;
  price: number;
};
