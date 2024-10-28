import { Guid } from "@customTypes/.";

export type Guest = {
  id: Guid;
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
};

export function createGuest(
  id: Guid,
  name: string,
  phoneNumber: string,
  dateOfBirth: Date,
) {
  return {
    id: id,
    name: name,
    phoneNumber: phoneNumber,
    dateOfBirth: dateOfBirth
  }
}
