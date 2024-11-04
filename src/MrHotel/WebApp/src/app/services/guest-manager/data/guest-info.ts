import { Guid } from "@customTypes/guid";
import { ReplaceFieldType } from "@customTypes/index";
import { Stringify } from "@customTypes/stringify";

import { CalendarDate } from "calendar-date";

export class GuestInfo {
  public constructor(
    private readonly _id: Guid,
    private readonly _fullName: string,
    private readonly _phoneNumber: string,
    private readonly _dateOfBirth: CalendarDate,
  ) {}

  public static createFromDto(dto: GuestInfoDto): GuestInfo {
    return new GuestInfo(
      dto.id,
      dto.fullName,
      dto.phoneNumber,
      new CalendarDate(dto.dateOfBirth),
    );
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
}

export type GuestInfoDto = ReplaceFieldType<Stringify<GuestInfo>, "id", Guid>;
