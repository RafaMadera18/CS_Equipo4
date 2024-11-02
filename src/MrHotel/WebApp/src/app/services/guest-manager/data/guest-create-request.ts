import { Guid } from "@customTypes/guid";
import { GuestInfo } from "./guest-info";

export class GuestCreateRequest {
  //TODO: Api Error if is private or different variable name
  private readonly _fullName: string;
  private readonly _phoneNumber: string;
  private readonly _dateOfBirth: string;

  public constructor(fullName: string, phoneNumber: string, dateOfBirth: Date) {
    this._fullName = fullName;
    this._phoneNumber = phoneNumber;
    // TODO: Extract method. standardize date format
    this._dateOfBirth = new Date(dateOfBirth).toISOString().split("T")[0];
  }

  //TODO: This method belongs to this class?
  public createGuestInfo(id: Guid): GuestInfo {
    return {
      id: id,
      ...this,
      dateOfBirth: new Date(this.dateOfBirth),
    };
  }

  public get fullName(): string {
    return this._fullName;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public get dateOfBirth(): string {
    return this._dateOfBirth;
  }

  public toJSON() {
    return {
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dateOfBirth,
    };
  }
}
