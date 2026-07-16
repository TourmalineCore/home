import { BlockType } from "../../enums";

export interface BaseBlock<T extends BlockType> {
  id?: number | string;
  __component: T;
}
