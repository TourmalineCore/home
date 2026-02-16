import { BlockType } from "../../enums";
import { ImagesWithBlurDataURL } from "../shared";
import { BaseBlock } from "./base-block";

export interface CollageWithLinkBlock extends BaseBlock<BlockType.SHARED_COLLAGE_WITH_LINK> {
  text?: string;
  link?: string;
  imagesWithBlurDataURL: ImagesWithBlurDataURL[];
}
