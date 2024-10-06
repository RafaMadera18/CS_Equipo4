import { Guid } from "./guid"

export type Guest = {
  id: Guid
  name: string,
  phoneNumber: string,
  dateOfBirth: Date
}
