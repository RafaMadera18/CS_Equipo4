import { Guid } from "./guid";

export type Tag = {
  id: Guid,
  name: string,
  group: TagGroup
}

export type TagGroup = {
  id: Guid,
  name: string,
  tags: Tag[],
  favorite: boolean,
}
