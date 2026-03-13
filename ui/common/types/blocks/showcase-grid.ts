import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface ShowcaseGridBlock extends BaseBlock<BlockType.SHARED_SHOWCASE_GRID> {
  title?: string;
  showOnMobile: boolean;
  anchorId?: string;
  showcaseColumns: {
    id: number;
    type: 'media' | 'markdown';
    showcaseColumnWithMedia: ShowcaseColumnWithMediaProps | null;
    showcaseColumnWithMarkdown: ShowcaseColumnWithMarkdownProps | null;
  }[];
}

export interface ShowcaseColumnWithMarkdownProps {
  subtitle?: string;
  markdown: string;
}

export interface ShowcaseColumnWithMediaProps {
  title?: string;
  description?: string;
  media: {
    url: string;
    mime: string;
    blurDataURL?: string;
  };
  link?: string;
  isNda?: boolean;
  size: 'L' | 'M' | 'S' | 'XS';
}
