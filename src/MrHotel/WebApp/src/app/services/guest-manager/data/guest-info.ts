import { Guid } from "@customTypes/guid";
import { GuestCreateRequest } from ".";

export class GuestInfo {
  public constructor(
    private readonly _id: Guid,
    private readonly _fullName: string,
    private readonly _phoneNumber: string,
    private readonly _dateOfBirth: Date,
  ) {}

  public static createFromDto(dto: GuestInfoDto): GuestInfo {
    return new GuestInfo(
      dto.id,
      dto.fullName,
      dto.phoneNumber,
      new Date(dto.dateOfBirth),
    );
  }

  public static createFromRequest(
    id: Guid,
    request: GuestCreateRequest,
  ): GuestInfo {
    return new GuestInfo(
      id,
      request.fullName,
      request.phoneNumber,
      new Date(request.dateOfBirth),
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

  public get dateOfBirth(): Date {
    return this._dateOfBirth;
  }
}

export type GuestInfoDto = {
  id: Guid;
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
};
