import { Guid } from './guid';
import { Tag } from './tag';

export type Room = {
  id: Guid;
  name: string;
  tags: Tag[];
};
