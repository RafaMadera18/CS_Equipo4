import { Guid } from "@customTypes/guid";

export class GuestInfo {
  public constructor(
    public readonly id: Guid,
    public fullName: string,
    public phoneNumber: string,
    public dateOfBirth: Date,
  ) {}

  public static fromDto(dto: GuestInfoDto): GuestInfo {
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
