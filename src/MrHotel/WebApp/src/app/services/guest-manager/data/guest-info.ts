import { Guid } from "@customTypes/guid";

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

  public static createFromDto(dto: GuestInfoDto): GuestInfo {
    return new GuestInfo(
      dto.Id,
      dto.FullName,
      dto.PhoneNumber,
      new Date(dto.dateOfBirth),
    );
  }
}

export type GuestInfoDto = Omit<GuestInfo, "dateOfBirth"> & {
  dateOfBirth: string;
};

