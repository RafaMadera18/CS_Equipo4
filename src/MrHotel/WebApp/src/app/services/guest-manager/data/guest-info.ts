import { Guid } from "@customTypes/guid";
import { ReplaceFieldType } from "@customTypes/index";
import { Stringify } from "@customTypes/stringify";

import { CalendarDate } from "calendar-date";

export class GuestInfo {

  private readonly id: Guid;
  private fullName: string;
  private phoneNumber: string;
  private dateOfBirth: Date;

  public constructor(
    id: Guid,
    fullName: string,
    phoneNumber: string,
    dateOfBirth: Date,
  ) {
    this.id = id;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = dateOfBirth;
  }

  public get Id(): Guid {
    return this.id;
  }

  public get FullName(): string {
    return this.fullName;
  }

  public set FullName(value: string) {
    this.fullName = value;
  }

  public get PhoneNumber(): string {
    return this.phoneNumber;
  }

  public set PhoneNumber(value: string) {
    this.phoneNumber = value;
  }

  public get DateOfBirth(): Date {
    return this.dateOfBirth;
  }

  public get id(): Guid {
    return this._id;
  }

  public get fullName(): string {
    return this._fullName;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public get dateOfBirth(): CalendarDate {
    return this._dateOfBirth;
  }

  public static createFromDto(dto: GuestInfoDto): GuestInfo {
    return new GuestInfo(
      dto.id,
      dto.fullName,
      dto.phoneNumber,
      new CalendarDate(dto.dateOfBirth),
    );
  }
}

export type GuestInfoDto = ReplaceFieldType<Stringify<GuestInfo>, "id", Guid>;
