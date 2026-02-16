import type { Schema, Struct } from '@strapi/strapi';

export interface ColumnWithContentColumnWithImage
  extends Struct.ComponentSchema {
  collectionName: 'components_column_with_content_column_with_images';
  info: {
    displayName: 'columnWithImage';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    markdownText: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ColumnWithContentColumnWithRepositories
  extends Struct.ComponentSchema {
  collectionName: 'components_column_with_content_column_with_repositories';
  info: {
    displayName: 'columnWithRepositories';
  };
  attributes: {
    markdownText: Schema.Attribute.RichText;
    repositories: Schema.Attribute.Component<
      'column-with-content.repository-card',
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ColumnWithContentColumnWithTextAndDate
  extends Struct.ComponentSchema {
  collectionName: 'components_column_with_content_column_with_text_and_dates';
  info: {
    displayName: 'columnWithTextAndDate';
  };
  attributes: {
    date: Schema.Attribute.Date;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ColumnWithContentRepositoryCard
  extends Struct.ComponentSchema {
  collectionName: 'components_column_with_content_repository_cards';
  info: {
    displayName: 'repositoryCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    language: Schema.Attribute.Enumeration<['TypeScript', 'C#']>;
    link: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FeaturedCardCardWithImage extends Struct.ComponentSchema {
  collectionName: 'components_featured_card_card_with_images';
  info: {
    displayName: 'cardWithImage';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    theme: Schema.Attribute.Enumeration<['black', 'grey', 'blue']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'blue'>;
  };
}

export interface FeaturedCardCardWithPoints extends Struct.ComponentSchema {
  collectionName: 'components_featured_card_card_with_points';
  info: {
    displayName: 'cardWithPoints';
  };
  attributes: {
    link: Schema.Attribute.Component<'shared.link', false>;
    points: Schema.Attribute.Component<'shared.text', true> &
      Schema.Attribute.Required;
    theme: Schema.Attribute.Enumeration<['white', 'black', 'grey']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'white'>;
    title: Schema.Attribute.String;
  };
}

export interface FeaturedCardWideCard extends Struct.ComponentSchema {
  collectionName: 'components_featured_card_wide_cards';
  info: {
    displayName: 'wideCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String;
    wideCardItems: Schema.Attribute.Component<
      'featured-card.wide-card-items',
      true
    >;
  };
}

export interface FeaturedCardWideCardItems extends Struct.ComponentSchema {
  collectionName: 'components_featured_card_wide_card_items';
  info: {
    displayName: 'wideCardItems';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterFooterNavigationList extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_navigation_lists';
  info: {
    displayName: 'footerNavigationList';
  };
  attributes: {
    caption: Schema.Attribute.String & Schema.Attribute.Required;
    isSocialNetworks: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    links: Schema.Attribute.Relation<'oneToMany', 'api::navigation.navigation'>;
    socialLinks: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-network.social-network'
    >;
  };
}

export interface SharedCollageWithLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_collage_with_links';
  info: {
    displayName: 'collageWithLink';
  };
  attributes: {
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    link: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface SharedCollageWithTitle extends Struct.ComponentSchema {
  collectionName: 'components_shared_collage_with_titles';
  info: {
    displayName: 'collageWithTitle';
  };
  attributes: {
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedColumnWithContent extends Struct.ComponentSchema {
  collectionName: 'components_shared_column_with_contents';
  info: {
    displayName: 'columnWithContent';
  };
  attributes: {
    columnWithImage: Schema.Attribute.Component<
      'column-with-content.column-with-image',
      false
    > &
      Schema.Attribute.Required;
    columnWithRepositories: Schema.Attribute.Component<
      'column-with-content.column-with-repositories',
      false
    > &
      Schema.Attribute.Required;
    columnWithTextAndDate: Schema.Attribute.Component<
      'column-with-content.column-with-text-and-date',
      false
    > &
      Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['image', 'repositories', 'text-and-date']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'image'>;
  };
}

export interface SharedFeaturedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_featured_cards';
  info: {
    displayName: 'featuredCard';
  };
  attributes: {
    cardWithImage: Schema.Attribute.Component<
      'featured-card.card-with-image',
      false
    > &
      Schema.Attribute.Required;
    cardWithPoints: Schema.Attribute.Component<
      'featured-card.card-with-points',
      false
    > &
      Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['points', 'image', 'blank', 'wide']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'points'>;
    wideCard: Schema.Attribute.Component<'featured-card.wide-card', false> &
      Schema.Attribute.Required;
  };
}

export interface SharedFeaturedCardsList extends Struct.ComponentSchema {
  collectionName: 'components_shared_featured_cards_lists';
  info: {
    displayName: 'featuredCardsList';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    featuredCards: Schema.Attribute.Component<'shared.featured-card', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    emailCaption: Schema.Attribute.String;
    navigationLists: Schema.Attribute.Component<
      'footer.footer-navigation-list',
      true
    >;
  };
}

export interface SharedForm extends Struct.ComponentSchema {
  collectionName: 'components_shared_forms';
  info: {
    displayName: 'form';
  };
  attributes: {};
}

export interface SharedHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    emailCaption: Schema.Attribute.String;
    navigationLists: Schema.Attribute.Relation<
      'oneToMany',
      'api::navigation.navigation'
    >;
    socialLinks: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-network.social-network'
    >;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    description: Schema.Attribute.Text;
    media: Schema.Attribute.Media<'images' | 'videos', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedShowcaseGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_showcase_grids';
  info: {
    displayName: 'showcaseGrid';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    showcaseColumns: Schema.Attribute.Component<
      'showcase-column.showcase-columns',
      true
    > &
      Schema.Attribute.Required;
    showOnMobile: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedSignpost extends Struct.ComponentSchema {
  collectionName: 'components_shared_signposts';
  info: {
    displayName: 'signpost';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSignpostMultiple extends Struct.ComponentSchema {
  collectionName: 'components_shared_signpost_multiples';
  info: {
    displayName: 'signpostMultiple';
  };
  attributes: {
    link: Schema.Attribute.Component<'shared.link', false>;
    signposts: Schema.Attribute.Component<'shared.signpost', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SharedSingleImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_single_images';
  info: {
    displayName: 'singleImage';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SharedText extends Struct.ComponentSchema {
  collectionName: 'components_shared_texts';
  info: {
    displayName: 'text';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedThreeColumnGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_three_column_grids';
  info: {
    displayName: 'threeColumnGrid';
  };
  attributes: {
    columnsWithContent: Schema.Attribute.Component<
      'shared.column-with-content',
      true
    > &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
        },
        number
      >;
  };
}

export interface ShowcaseColumnShowcaseColumnWithMarkdown
  extends Struct.ComponentSchema {
  collectionName: 'components_showcase_column_showcase_column_with_markdowns';
  info: {
    displayName: 'showcaseColumnWithMarkdown';
  };
  attributes: {
    markdown: Schema.Attribute.RichText & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ShowcaseColumnShowcaseColumnWithMedia
  extends Struct.ComponentSchema {
  collectionName: 'components_showcase_column_showcase_column_with_medias';
  info: {
    displayName: 'showcaseColumnWithMedia';
  };
  attributes: {
    description: Schema.Attribute.Text;
    isNda: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    size: Schema.Attribute.Enumeration<['XS', 'S', 'M', 'L']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'M'>;
    title: Schema.Attribute.Text;
  };
}

export interface ShowcaseColumnShowcaseColumns extends Struct.ComponentSchema {
  collectionName: 'components_showcase_column_showcase_columns';
  info: {
    displayName: 'showcaseColumns';
  };
  attributes: {
    showcaseColumnWithMarkdown: Schema.Attribute.Component<
      'showcase-column.showcase-column-with-markdown',
      false
    >;
    showcaseColumnWithMedia: Schema.Attribute.Component<
      'showcase-column.showcase-column-with-media',
      false
    >;
    type: Schema.Attribute.Enumeration<['media', 'markdown']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'media'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'column-with-content.column-with-image': ColumnWithContentColumnWithImage;
      'column-with-content.column-with-repositories': ColumnWithContentColumnWithRepositories;
      'column-with-content.column-with-text-and-date': ColumnWithContentColumnWithTextAndDate;
      'column-with-content.repository-card': ColumnWithContentRepositoryCard;
      'featured-card.card-with-image': FeaturedCardCardWithImage;
      'featured-card.card-with-points': FeaturedCardCardWithPoints;
      'featured-card.wide-card': FeaturedCardWideCard;
      'featured-card.wide-card-items': FeaturedCardWideCardItems;
      'footer.footer-navigation-list': FooterFooterNavigationList;
      'shared.collage-with-link': SharedCollageWithLink;
      'shared.collage-with-title': SharedCollageWithTitle;
      'shared.column-with-content': SharedColumnWithContent;
      'shared.featured-card': SharedFeaturedCard;
      'shared.featured-cards-list': SharedFeaturedCardsList;
      'shared.footer': SharedFooter;
      'shared.form': SharedForm;
      'shared.header': SharedHeader;
      'shared.hero': SharedHero;
      'shared.link': SharedLink;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
      'shared.showcase-grid': SharedShowcaseGrid;
      'shared.signpost': SharedSignpost;
      'shared.signpost-multiple': SharedSignpostMultiple;
      'shared.single-image': SharedSingleImage;
      'shared.text': SharedText;
      'shared.three-column-grid': SharedThreeColumnGrid;
      'showcase-column.showcase-column-with-markdown': ShowcaseColumnShowcaseColumnWithMarkdown;
      'showcase-column.showcase-column-with-media': ShowcaseColumnShowcaseColumnWithMedia;
      'showcase-column.showcase-columns': ShowcaseColumnShowcaseColumns;
    }
  }
}
