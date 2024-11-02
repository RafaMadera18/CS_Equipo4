import { RoomInfo } from "./room-info";

import { Guid } from "@customTypes/.";

export class RoomCreateRequest {
  public constructor(private readonly _name: string) {}

  //TODO: This method belongs to this class?
  public createRoomInfo(id: Guid): RoomInfo {
    return {
      id: id,
      name: this.name,
      properties: [],
    };
  }

  public get name() {
    return this._name;
  }

  public toJSON() {
    return {
      name: this.name
    }
  }
}
