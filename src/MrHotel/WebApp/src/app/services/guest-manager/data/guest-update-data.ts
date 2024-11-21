import { CalendarDate } from "calendar-date";

import { Guid, Stringify } from "@customTypes/.";

import { GuestInfo } from "./guest-info";

export class GuestUpdateData {
  public constructor(
    private readonly _fullName: string,
    private readonly _phoneNumber: string,
    private readonly _dateOfBirth: CalendarDate,
  ) {}

  public get fullName(): string {
    return this._fullName;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public get dateOfBirth(): CalendarDate {
    return this._dateOfBirth;
  }

  public toJSON(): Stringify<GuestUpdateData> {
    return {
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dateOfBirth.toString(),
    };
  }

  public toGuestInfo(id: Guid): GuestInfo {
    return new GuestInfo(id, this.fullName, this.phoneNumber, this.dateOfBirth);
  }
}
