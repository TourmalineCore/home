import { BlockType } from "../../enums";
import { ImagesWithBlurDataURL } from "../shared";
import { BaseBlock } from "./base-block";

export interface ThreeColumnGridBlock extends BaseBlock<BlockType.SHARED_THREE_COLUMN_GRID> {
  columns: Column[];
}

export interface Column {
  id: number;
  type: 'image' | 'repositories' | 'text-and-date';
  columnWithImage: ColumnWithImageProps | null;
  columnWithRepositories: ColumnWithRepositoriesProps | null;
  columnWithTextAndDate: ColumnWithTextAndDateProps | null;
}

export interface ColumnWithImageProps extends ColumnWithContentProps {
  imageWithBlurDataURL: ImagesWithBlurDataURL;
}

export interface ColumnWithRepositoriesProps extends ColumnWithContentProps {
  title: string;
  repositories: {
    name: string;
    description?: string;
    language?: string;
    link?: string;
  }[];
  markdownText?: string;
}

export interface ColumnWithTextAndDateProps extends ColumnWithContentProps {
  text: string;
  date?: string;
}

export interface ColumnWithContentProps {
  title?: string;
  markdownText?: string;
}
