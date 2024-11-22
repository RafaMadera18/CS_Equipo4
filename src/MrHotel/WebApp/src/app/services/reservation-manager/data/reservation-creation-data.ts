import { Guid } from "@customTypes/guid";
import { Stringify } from "@customTypes/stringify";
import { RoomInfo } from "@services/room-manager/data";

export class ReservationCreationData {
  public constructor(
    private readonly _guestId: Guid,
    private readonly _room: RoomInfo,
    private readonly _checkInDate: Date,
    private readonly _checkOutDate: Date,
    private readonly _price: number,
  ) {}

  public toJSON(): Stringify<ReservationCreationData> {
    return {
      guestId: this._guestId,
      room: this._room,
      checkInDate: this._checkInDate,
      checkOutDate: this._checkOutDate,
      price: this._price,
    };
  }
}
