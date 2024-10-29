import { Guid } from "@customTypes/.";

export class Guest {
  public constructor(
    public readonly id: Guid,
    public fullName: string,
    public phoneNumber: string,
    public dateOfBirth: Date,
  ) {}

  public static fromDto(dto: GuestDto): Guest {
    return new Guest(
      dto.id,
      dto.fullName,
      dto.phoneNumber,
      new Date(dto.dateOfBirth),
    );
  }
}

export type GuestDto = Omit<Guest, "dateOfBirth"> & {
  dateOfBirth: string;
};
