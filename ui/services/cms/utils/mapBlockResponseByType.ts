import { BlockType } from "../../../common/enums";
import {
  Block,
  FeaturedCardProps,
  SignpostMultipleBlock,
  Column,
  ShowcaseGridBlock,
  HeroBlock,
  CollageWithTitleBlock,
  CollageWithLinkBlock,
  SignpostProps,
  SingleImageBlock,
} from "../../../common/types";
import { BlockApi } from "../../../common/types/blocks/api-block";

export function mapBlockResponseByType(block: BlockApi): Block | null {
  const component = block.__component;

  if (component === BlockType.SHARED_HERO) {
    return {
      __component: BlockType.SHARED_HERO,
      id: block.id,
      title: block.title || ``,
      description: block.description,
      media: block.media as HeroBlock['media'],
    };
  }

  if (component === BlockType.SHARED_FEATURED_CARDS_LIST) {
    const featuredCards = (block.featuredCards || []).map((card) => ({
      id: card.id,
      type: card.type,
      theme: card.cardWithPoints?.theme || card.cardWithImage?.theme || null,
      title: card.wideCard?.title || card.cardWithPoints?.title || null,
      points: card.cardWithPoints?.points?.map(({
        text,
      }) => text) || null,
      link: card.cardWithPoints?.link || card.wideCard?.link || null,
      ...(card.cardWithImage?.image?.url && {
        imageWithBlurDataURL: card.cardWithImage.image,
      }),
      description: card.wideCard?.description || null,
      wideCardItems: card.wideCard?.wideCardItems?.map((item) => ({
        id: item.id,
        name: item.name || ``,
        link: item.link,
        icon: item.icon?.url || null,
      })) || null,
    }));

    return {
      __component: BlockType.SHARED_FEATURED_CARDS_LIST,
      id: block.id,
      title: block.title,
      anchorId: block.anchorId,
      cards: featuredCards as FeaturedCardProps[],
    };
  }

  if (component === BlockType.SHARED_COLLAGE_WITH_TITLE) {
    return {
      __component: BlockType.SHARED_COLLAGE_WITH_TITLE,
      id: block.id,
      title: block.title || ``,
      imagesWithBlurDataURL: block.images as CollageWithTitleBlock['imagesWithBlurDataURL'],
    };
  }

  if (component === BlockType.SHARED_COLLAGE_WITH_LINK) {
    return {
      __component: BlockType.SHARED_COLLAGE_WITH_LINK,
      id: block.id,
      text: block.link?.text || ``,
      link: block.link?.url || ``,
      imagesWithBlurDataURL: block.images as CollageWithLinkBlock['imagesWithBlurDataURL'],
    };
  }

  if (component === BlockType.SHARED_SIGNPOST_MULTIPLE) {
    const signposts = (block.signposts || []).map((signpost) => ({
      title: signpost.title || ``,
      subtitle: signpost.subtitle,
      link: signpost.link,
      imageWithBlurDataURL: signpost.image as SignpostProps['imageWithBlurDataURL'],
    }));

    return {
      __component: BlockType.SHARED_SIGNPOST_MULTIPLE,
      id: block.id,
      title: block.title,
      viewAllLink: block.link as SignpostMultipleBlock['viewAllLink'],
      signposts,
    };
  }

  if (component === BlockType.SHARED_SINGLE_IMAGE) {
    return {
      __component: BlockType.SHARED_SINGLE_IMAGE,
      id: block.id,
      imageWithBlurDataURL: block.image as SingleImageBlock['imageWithBlurDataURL'],
    };
  }

  if (component === BlockType.SHARED_THREE_COLUMN_GRID) {
    const columns = (block.columnsWithContent || []).map((column) => ({
      id: column.id,
      type: column.type,
      columnWithImage: {
        ...column.columnWithImage,
        imageWithBlurDataURL: column.columnWithImage?.image,
      },
      columnWithRepositories: column.columnWithRepositories,
      columnWithTextAndDate: column.columnWithTextAndDate,
    }));

    return {
      __component: BlockType.SHARED_THREE_COLUMN_GRID,
      id: block.id,
      columns: columns as Column[],
    };
  }

  if (component === BlockType.SHARED_SHOWCASE_GRID) {
    const showcaseColumns = (block.showcaseColumns || []).map((column) => ({
      id: column.id,
      type: column.type,
      showcaseColumnWithMedia: column.showcaseColumnWithMedia ? {
        title: column.showcaseColumnWithMedia.title,
        description: column.showcaseColumnWithMedia.description,
        media: column.showcaseColumnWithMedia.media,
        link: column.showcaseColumnWithMedia.link,
        isNda: column.showcaseColumnWithMedia.isNda,
        size: column.showcaseColumnWithMedia.size,
      } : null,
      showcaseColumnWithMarkdown: column.showcaseColumnWithMarkdown || null,
    }));

    return {
      __component: BlockType.SHARED_SHOWCASE_GRID,
      id: block.id,
      showOnMobile: block.showOnMobile!,
      title: block.title,
      anchorId: block.anchorId,
      showcaseColumns: showcaseColumns as ShowcaseGridBlock['showcaseColumns'],
    };
  }

  if (component === BlockType.SHARED_FORM_BLOCK) {
    return {
      id: block.id,
      __component: BlockType.SHARED_FORM_BLOCK,
    };
  }

  return null;
}
