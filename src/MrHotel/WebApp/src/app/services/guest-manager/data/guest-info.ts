import { Guid } from "@customTypes/guid";

export class GuestInfo {
  // TODO: Change properties to private
  public constructor(
    public readonly id: Guid,
    public fullName: string,
    public phoneNumber: string,
    public dateOfBirth: Date,
  ) {}

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
