import { BlockType } from "../../enums";
import { ImagesWithBlurDataURL } from "../shared";
import { BaseBlock } from "./base-block";

export interface FeaturedCardsListBlock extends BaseBlock<BlockType.SHARED_FEATURED_CARDS_LIST> {
  title?: string;
  anchorId?: string;
  cards: FeaturedCardProps[];
}

export interface FeaturedCardProps extends Points, ImageCard, WideCardProps {
  id: number;
  type: Type;
}

export interface Points {
  title?: string;
  theme: Theme;
  points: string[];
  link?: {
    text: string;
    url: string;
  };
}

export interface ImageCard {
  theme: Theme;
  imageWithBlurDataURL?: ImagesWithBlurDataURL;
}

export interface WideCardProps {
  title?: string;
  description?: string;
  wideCardItems: {
    id: number;
    icon?: string;
    name: string;
    link?: string;
  }[];
  link?: {
    text: string;
    url: string;
  };
}

type Type = 'image' | 'points' | 'blank' | 'wide';

type Theme = 'white' | 'grey' | 'black' | 'blue';
