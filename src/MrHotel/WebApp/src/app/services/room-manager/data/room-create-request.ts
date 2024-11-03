export class RoomCreateRequest {
  private readonly _name: string;

  public constructor(name: string) {
    this._name = name;
  }

  public get name() {
    return this._name;
  }

  public toJSON() {
    return {
      name: this.name,
    };
  }
}
