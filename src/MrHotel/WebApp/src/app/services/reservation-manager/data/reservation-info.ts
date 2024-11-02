import { Guid } from "@customTypes/index";
import { RoomInfo } from "@services/room-manager/data";

export class ReservationInfo {
  public constructor(
    private readonly id: Guid,
    private readonly room: RoomInfo,
    private readonly checkInDate: Date,
    private readonly checkOutDate: Date,
    private readonly price: number
  ) {}


}
