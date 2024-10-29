import { RoomInfo } from "./room-info";

import { Guid } from "@customTypes/.";

export class RoomCreateRequest {
  public constructor(public readonly name: string) {}

  public replicate(id: Guid): RoomInfo {
    return {
      id: id,
      name: this.name,
      properties: [],
    };
  }
}
