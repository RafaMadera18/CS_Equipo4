import { Guid } from "@customTypes/.";
import { TagGroup } from ".";

export type Tag = {
  id: Guid;
  name: string;
  group: TagGroup;
};
