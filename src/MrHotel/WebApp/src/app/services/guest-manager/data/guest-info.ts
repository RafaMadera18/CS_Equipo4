import { Guid } from "@customTypes/guid";

export class GuestInfo {

  private readonly _id: Guid;
  private _fullName: string;
  private _phoneNumber: string;
  private _dateOfBirth: Date;

  public constructor(
    id: Guid,
    fullName: string,
    phoneNumber: string,
    dateOfBirth: Date,
  ) {
    this._id = id;
    this._fullName = fullName;
    this._phoneNumber = phoneNumber;
    this._dateOfBirth = dateOfBirth;
  }

  public get id(): Guid {
    return this._id;
  }

  public get fullName(): string {
    return this._fullName;
  }

  public set fullName(value: string) {
    this._fullName = value;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  public get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  public static createFromDto(dto: GuestInfoDto): GuestInfo {
    return new GuestInfo(
      dto.id,
      dto.fullName,
      dto.phoneNumber,
      new Date(dto.dateOfBirth),
    );
  }
}

export type GuestInfoDto = Omit<GuestInfo, "dateOfBirth"> & {
  dateOfBirth: string;
};

