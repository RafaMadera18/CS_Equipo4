import { Guid } from "@customTypes/guid";
import { GuestInfo } from "./guest-info";

export class GuestCreateRequest {
  private readonly fullName: string;
  private readonly phoneNumber: string;
  private readonly dateOfBirth: string;

  public constructor(fullName: string, phoneNumber: string, dateOfBirth: Date) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    // TODO: Extract method. standardize date format
    this.dateOfBirth = new Date(dateOfBirth).toISOString().split("T")[0];
  }

  public createGuestInfo(id: Guid): GuestInfo {
    return {
      id: id,
      ...this,
      dateOfBirth: new Date(this.dateOfBirth),
    };
  }

  public get FullName(): string {
    return this.fullName;
  }

  public get PhoneNumber(): string {
    return this.phoneNumber;
  }

  public get DateOfBirth(): string {
    return this.dateOfBirth;
  }
}
