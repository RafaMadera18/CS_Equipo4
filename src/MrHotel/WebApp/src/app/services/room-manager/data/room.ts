import { Guid } from "@customTypes/.";
import { Tag } from ".";

export type Room = {
  id: Guid;
  name: string;
  tags: Tag[];
};
