import { Guid } from "./guid";

export type Tag = {
  id: Guid,
  name: string,
  favorite: boolean,
  group: TagGroup
}

export type TagGroup = {
  id: Guid,
  name: string,
  tags: Tag[]
}
