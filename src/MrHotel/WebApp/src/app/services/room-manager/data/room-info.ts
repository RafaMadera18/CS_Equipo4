import { Guid } from "@customTypes/.";
import { RoomCreateRequest, RoomProperty } from ".";

export class RoomInfo {
  public constructor(
    private readonly _id: Guid,
    private readonly _name: string,
    private readonly _properties: RoomProperty[],
  ) {}

  public static createFromRequest(
    id: Guid,
    request: RoomCreateRequest,
  ): RoomInfo {
    return new RoomInfo(id, request.name, []);
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get properties() {
    return this._properties;
  }
}
