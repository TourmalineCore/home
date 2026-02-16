import { BlockType } from "../../enums";
import { ImagesWithBlurDataURL } from "../shared";
import { BaseBlock } from "./base-block";

export interface SingleImageBlock extends BaseBlock<BlockType.SHARED_SINGLE_IMAGE> {
  imageWithBlurDataURL: ImagesWithBlurDataURL;
}
