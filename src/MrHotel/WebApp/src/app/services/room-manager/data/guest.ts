import { Guid } from "@customTypes/.";

export type Guest = {
  id: Guid;
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
};
