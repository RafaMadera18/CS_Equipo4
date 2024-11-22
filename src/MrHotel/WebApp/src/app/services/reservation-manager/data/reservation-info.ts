import { Guid } from "@customTypes/index";
import { RoomInfo } from "@services/room-manager/data";

export class ReservationInfo {
  public constructor(
    private readonly _id: Guid,
    private readonly _room: RoomInfo,
    private readonly _checkInDate: Date,
    private readonly _checkOutDate: Date,
    private readonly _price: number,
  ) {}
}
