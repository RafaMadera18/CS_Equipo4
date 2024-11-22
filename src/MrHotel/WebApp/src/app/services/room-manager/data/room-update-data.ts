import { Guid, Stringify } from "@customTypes/index";

export class RoomUpdateData {
  private readonly _name: string;
  private readonly _propertiesIds: Guid[];

  public constructor(name: string, propertiesIds: Guid[]) {
    this._name = name;
    this._propertiesIds = propertiesIds;
  }

  public toJSON(): Stringify<RoomUpdateData> {
    return {
      name: this._name,
      propertiesIds: this._propertiesIds,
    };
  }
}
