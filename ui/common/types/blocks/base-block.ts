import { BlockType } from "../../enums";

export interface BaseBlock<T extends BlockType> {
  id?: number;
  __component: T;
}
