import { Guid } from "@customTypes/.";
import { Tag } from ".";

export type Room = {
  id: Guid;
  name: string;
  tags: Tag[];
};

export function roomEmpty(id: Guid, name: string): Room {
  return {
    id: id,
    name: name,
    tags: [],
  };
}
