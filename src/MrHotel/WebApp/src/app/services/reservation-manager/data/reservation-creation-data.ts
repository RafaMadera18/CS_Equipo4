import { Guid } from "@customTypes/guid";
import { Stringify } from "@customTypes/stringify";
import { ReservationInfo } from "./reservation-info";
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
      roomId: this._room.id,
      checkInDate: this._checkInDate.toJSON(),
      checkOutDate: this._checkOutDate.toJSON(),
      price: this._price,
    };
  }

  public toReservationInfo(id: Guid): ReservationInfo {
    return new ReservationInfo(
      id,
      this._guestId,
      this._room,
      this._checkInDate,
      this._checkOutDate,
      this._price,
    );
  }
}
