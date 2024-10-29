import { Room } from "./room";

import { Guid } from "@customTypes/.";

export class RoomCreateRequest {
  public constructor(public readonly name: string) {}

  public replicate(id: Guid): Room {
    return {
      id: id,
      name: this.name,
      tags: [],
    };
  }
}
