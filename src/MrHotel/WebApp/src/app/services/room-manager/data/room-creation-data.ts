import { Guid, Stringify } from "@customTypes/.";

import { RoomInfo } from "./room-info";
import { RoomAvailability } from "./room-availability";
import { RoomAvailabilityState } from "./room-availability-state";

export class RoomCreationData {
  private readonly _name: string;

  public constructor(name: string) {
    this._name = name;
  }

  public get name() {
    return this._name;
  }

  public toJSON(): Stringify<RoomCreationData> {
    return {
      name: this.name,
    };
  }

  public toRoomInfo(id: Guid): RoomInfo {
    return new RoomInfo(id, this.name, []);
  }
}
