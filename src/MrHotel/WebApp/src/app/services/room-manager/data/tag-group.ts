import { Guid } from "@customTypes/.";
import { Tag } from ".";

export type TagGroup = {
  id: Guid;
  name: string;
  tags: Tag[];
  favorite: boolean;
};
