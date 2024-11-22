import { Guid } from "@customTypes/guid";
import { RoomPropertyGroup } from "./room-property-group";
import { Stringify } from "@customTypes/stringify";

export class RoomPropertyGroupCreationData {
  constructor(private readonly _name: string) {}

  public get name() {
    return this._name;
  }

  public toJSON(): Stringify<RoomPropertyGroupCreationData> {
    return {
      name: this._name
    }
  }

  public toRoomPropertyGroup(id: Guid): RoomPropertyGroup {
    return {
      id: id,
      name: this._name,
      properties: [],
    };
  }
}
