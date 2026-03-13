import { BlockType } from "../../enums";
import { ImagesWithBlurDataURL } from "../shared";
import { BaseBlock } from "./base-block";

export interface CollageWithTitleBlock extends BaseBlock<BlockType.SHARED_COLLAGE_WITH_TITLE> {
  title: string;
  imagesWithBlurDataURL: ImagesWithBlurDataURL[];
}
