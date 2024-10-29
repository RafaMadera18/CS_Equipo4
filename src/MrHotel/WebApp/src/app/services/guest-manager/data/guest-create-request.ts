import { Guid } from "@customTypes/guid";
import { GuestInfo } from "./guest-info";

export class GuestCreateRequest {
  public readonly dateOfBirth: string;

  public constructor(
    public readonly fullName: string,
    public readonly phoneNumber: string,
    dateOfBirth: Date,
  ) {
    this.dateOfBirth = new Date(dateOfBirth).toISOString().split("T")[0];
  }

  public replicate(id: Guid): GuestInfo {
    return {
      id: id,
      ...this,
      dateOfBirth: new Date(this.dateOfBirth),
    };
  }
}
