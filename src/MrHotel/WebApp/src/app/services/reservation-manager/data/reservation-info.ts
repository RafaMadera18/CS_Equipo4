import { Guid } from "@customTypes/index";
import { RoomInfo } from "@services/room-manager/data";

export class ReservationInfo {
  public constructor(
    private readonly _id: Guid,
    private readonly _guestId: Guid,
    private readonly _room: RoomInfo,
    private readonly _checkInDate: Date,
    private readonly _checkOutDate: Date,
    private readonly _price: number,
  ) {}

  public get id(): Guid {
    return this._id;
  }

  public get room(): RoomInfo {
    return this._room;
  }

  public get checkInDate(): Date {
    return this._checkInDate;
  }

  public get checkOutDate(): Date {
    return this._checkOutDate;
  }

  public get price(): number {
    return this._price;
  }
}
