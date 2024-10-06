import { Guest } from "./guest"
import { Guid } from "./guid"
import { Room } from "./room"
import { Tag } from "./tag"

export type Reservation = {
  id: Guid,
  guest: Guest,
  room: Room,
  checkInDate: Date,
  checkOutDate: Date,
  price: number
}


