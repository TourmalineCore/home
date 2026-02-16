/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Error {
  data?: object | object[] | null;
  error: {
    status?: number;
    name?: string;
    message?: string;
    details?: object;
  };
}

export interface HomepageRequest {
  data: {
    blocks: BaseNull &
      (
        | BaseNullComponentMapping<"shared.hero", SharedHeroComponent>
        | BaseNullComponentMapping<"shared.featured-cards-list", SharedFeaturedCardsListComponent>
        | BaseNullComponentMapping<"shared.collage-with-title", SharedCollageWithTitleComponent>
        | BaseNullComponentMapping<"shared.signpost-multiple", SharedSignpostMultipleComponent>
        | BaseNullComponentMapping<"shared.single-image", SharedSingleImageComponent>
        | BaseNullComponentMapping<"shared.three-column-grid", SharedThreeColumnGridComponent>
        | BaseNullComponentMapping<"shared.showcase-grid", SharedShowcaseGridComponent>
        | BaseNullComponentMapping<"shared.collage-with-link", SharedCollageWithLinkComponent>
        | BaseNullComponentMapping<"shared.form", SharedFormComponent>
      );
    seo: SharedSeoComponent;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface HomepageListResponse {
  data?: Homepage[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface Homepage {
  id?: number;
  documentId?: string;
  blocks: AbstractNull &
    (
      | AbstractNullComponentMapping<"shared.hero", SharedHeroComponent>
      | AbstractNullComponentMapping<"shared.featured-cards-list", SharedFeaturedCardsListComponent>
      | AbstractNullComponentMapping<"shared.collage-with-title", SharedCollageWithTitleComponent>
      | AbstractNullComponentMapping<"shared.signpost-multiple", SharedSignpostMultipleComponent>
      | AbstractNullComponentMapping<"shared.single-image", SharedSingleImageComponent>
      | AbstractNullComponentMapping<"shared.three-column-grid", SharedThreeColumnGridComponent>
      | AbstractNullComponentMapping<"shared.showcase-grid", SharedShowcaseGridComponent>
      | AbstractNullComponentMapping<"shared.collage-with-link", SharedCollageWithLinkComponent>
      | AbstractNullComponentMapping<"shared.form", SharedFormComponent>
    );
  seo: SharedSeoComponent;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: number;
    documentId?: string;
  };
  updatedBy?: {
    id?: number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: number;
    documentId?: string;
    blocks?: DiscriminatorNull &
      (
        | DiscriminatorNullComponentMapping<"shared.hero", SharedHeroComponent>
        | DiscriminatorNullComponentMapping<"shared.featured-cards-list", SharedFeaturedCardsListComponent>
        | DiscriminatorNullComponentMapping<"shared.collage-with-title", SharedCollageWithTitleComponent>
        | DiscriminatorNullComponentMapping<"shared.signpost-multiple", SharedSignpostMultipleComponent>
        | DiscriminatorNullComponentMapping<"shared.single-image", SharedSingleImageComponent>
        | DiscriminatorNullComponentMapping<"shared.three-column-grid", SharedThreeColumnGridComponent>
        | DiscriminatorNullComponentMapping<"shared.showcase-grid", SharedShowcaseGridComponent>
        | DiscriminatorNullComponentMapping<"shared.collage-with-link", SharedCollageWithLinkComponent>
        | DiscriminatorNullComponentMapping<"shared.form", SharedFormComponent>
      );
    seo?: SharedSeoComponent;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface HomepageResponse {
  data?: Homepage;
  meta?: object;
}

export interface SharedHeroComponent {
  id?: number;
  __component?: "shared.hero";
  title?: string;
  description?: string;
  media?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    blurDataURL?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface FeaturedCardCardWithImageComponent {
  id?: number;
  image?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    blurDataURL?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  theme?: "black" | "grey" | "blue";
}

export interface SharedTextComponent {
  id?: number;
  text?: string;
}

export interface SharedLinkComponent {
  id?: number;
  text?: string;
  url?: string;
}

export interface FeaturedCardCardWithPointsComponent {
  id?: number;
  title?: string;
  points?: SharedTextComponent[];
  link?: SharedLinkComponent;
  theme?: "white" | "black" | "grey";
}

export interface FeaturedCardWideCardItemsComponent {
  id?: number;
  name?: string;
  icon?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    blurDataURL?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  link?: string;
}

export interface FeaturedCardWideCardComponent {
  id?: number;
  title?: string;
  description?: string;
  wideCardItems?: FeaturedCardWideCardItemsComponent[];
  link?: SharedLinkComponent;
}

export interface SharedFeaturedCardComponent {
  id?: number;
  type?: "points" | "image" | "blank" | "wide";
  cardWithImage?: FeaturedCardCardWithImageComponent;
  cardWithPoints?: FeaturedCardCardWithPointsComponent;
  wideCard?: FeaturedCardWideCardComponent;
}

export interface SharedFeaturedCardsListComponent {
  id?: number;
  __component?: "shared.featured-cards-list";
  title?: string;
  featuredCards?: SharedFeaturedCardComponent[];
  anchorId?: string;
}

export interface SharedCollageWithTitleComponent {
  id?: number;
  __component?: "shared.collage-with-title";
  title?: string;
  images?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    blurDataURL?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface SharedSignpostComponent {
  id?: number;
  image?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    blurDataURL?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  title?: string;
  subtitle?: string;
  link?: string;
}

export interface SharedSignpostMultipleComponent {
  id?: number;
  __component?: "shared.signpost-multiple";
  title?: string;
  link?: SharedLinkComponent;
  signposts?: SharedSignpostComponent[];
}

export interface SharedSingleImageComponent {
  id?: number;
  __component?: "shared.single-image";
  image?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    blurDataURL?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
}

export interface ColumnWithContentColumnWithImageComponent {
  id?: number;
  title?: string;
  image?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    blurDataURL?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  markdownText?: string;
}

export interface ColumnWithContentRepositoryCardComponent {
  id?: number;
  name?: string;
  description?: string;
  link?: string;
  language?: "TypeScript" | "C#";
}

export interface ColumnWithContentColumnWithRepositoriesComponent {
  id?: number;
  title?: string;
  repositories?: ColumnWithContentRepositoryCardComponent[];
  markdownText?: string;
}

export interface ColumnWithContentColumnWithTextAndDateComponent {
  id?: number;
  title?: string;
  text?: string;
  /** @format date */
  date?: string;
}

export interface SharedColumnWithContentComponent {
  id?: number;
  type?: "image" | "repositories" | "text-and-date";
  columnWithImage?: ColumnWithContentColumnWithImageComponent;
  columnWithRepositories?: ColumnWithContentColumnWithRepositoriesComponent;
  columnWithTextAndDate?: ColumnWithContentColumnWithTextAndDateComponent;
}

export interface SharedThreeColumnGridComponent {
  id?: number;
  __component?: "shared.three-column-grid";
  columnsWithContent?: SharedColumnWithContentComponent[];
}

export interface ShowcaseColumnShowcaseColumnWithMarkdownComponent {
  id?: number;
  subtitle?: string;
  markdown?: string;
}

export interface ShowcaseColumnShowcaseColumnWithMediaComponent {
  id?: number;
  title?: string;
  description?: string;
  media?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    blurDataURL?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  link?: string;
  isNda?: boolean;
  size?: "XS" | "S" | "M" | "L";
}

export interface ShowcaseColumnShowcaseColumnsComponent {
  id?: number;
  type?: "media" | "markdown";
  showcaseColumnWithMarkdown?: ShowcaseColumnShowcaseColumnWithMarkdownComponent;
  showcaseColumnWithMedia?: ShowcaseColumnShowcaseColumnWithMediaComponent;
}

export interface SharedShowcaseGridComponent {
  id?: number;
  __component?: "shared.showcase-grid";
  title?: string;
  showcaseColumns?: ShowcaseColumnShowcaseColumnsComponent[];
  showOnMobile?: boolean;
  anchorId?: string;
}

export interface SharedCollageWithLinkComponent {
  id?: number;
  __component?: "shared.collage-with-link";
  link?: SharedLinkComponent;
  images?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    blurDataURL?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface SharedFormComponent {
  id?: number;
  __component?: "shared.form";
}

export interface SharedSeoComponent {
  id?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    blurDataURL?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  keywords?: string;
  metaRobots?: string;
  metaViewport?: string;
  canonicalURL?: string;
  structuredData?: any;
}

export interface LayoutRequest {
  data: {
    emailAddress: string;
    header: SharedHeaderComponent;
    footer?: SharedFooterComponent;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface LayoutListResponse {
  data?: Layout[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface Layout {
  id?: number;
  documentId?: string;
  emailAddress: string;
  header: SharedHeaderComponent;
  footer?: SharedFooterComponent;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: number;
    documentId?: string;
  };
  updatedBy?: {
    id?: number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: number;
    documentId?: string;
    emailAddress?: string;
    header?: SharedHeaderComponent;
    footer?: SharedFooterComponent;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface LayoutResponse {
  data?: Layout;
  meta?: object;
}

export interface SharedHeaderComponent {
  id?: number;
  buttonLabel?: string;
  emailCaption?: string;
  socialLinks?: {
    id?: number;
    documentId?: string;
  }[];
  navigationLists?: {
    id?: number;
    documentId?: string;
  }[];
}

export interface FooterFooterNavigationListComponent {
  id?: number;
  caption?: string;
  isSocialNetworks?: boolean;
  links?: {
    id?: number;
    documentId?: string;
  }[];
  socialLinks?: {
    id?: number;
    documentId?: string;
  }[];
}

export interface SharedFooterComponent {
  id?: number;
  emailCaption?: string;
  navigationLists?: FooterFooterNavigationListComponent[];
}

export interface NavigationRequest {
  data: {
    name: string;
    link: string;
    navItems?: (number | string)[];
    isMultiLevelNavigation: boolean;
    blocks?: InternalNull &
      (
        | InternalNullComponentMapping<"shared.three-column-grid", SharedThreeColumnGridComponent>
        | InternalNullComponentMapping<"shared.single-image", SharedSingleImageComponent>
        | InternalNullComponentMapping<"shared.signpost-multiple", SharedSignpostMultipleComponent>
        | InternalNullComponentMapping<"shared.showcase-grid", SharedShowcaseGridComponent>
        | InternalNullComponentMapping<"shared.hero", SharedHeroComponent>
        | InternalNullComponentMapping<"shared.featured-cards-list", SharedFeaturedCardsListComponent>
        | InternalNullComponentMapping<"shared.collage-with-title", SharedCollageWithTitleComponent>
        | InternalNullComponentMapping<"shared.collage-with-link", SharedCollageWithLinkComponent>
      );
    seo?: SharedSeoComponent;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface NavigationListResponse {
  data?: Navigation[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface Navigation {
  id?: number;
  documentId?: string;
  name: string;
  link: string;
  navItems?: {
    id?: number;
    documentId?: string;
    name?: string;
    link?: string;
    navItems?: {
      id?: number;
      documentId?: string;
    }[];
    isMultiLevelNavigation?: boolean;
    blocks?: PolymorphNull &
      (
        | PolymorphNullComponentMapping<"shared.three-column-grid", SharedThreeColumnGridComponent>
        | PolymorphNullComponentMapping<"shared.single-image", SharedSingleImageComponent>
        | PolymorphNullComponentMapping<"shared.signpost-multiple", SharedSignpostMultipleComponent>
        | PolymorphNullComponentMapping<"shared.showcase-grid", SharedShowcaseGridComponent>
        | PolymorphNullComponentMapping<"shared.hero", SharedHeroComponent>
        | PolymorphNullComponentMapping<"shared.featured-cards-list", SharedFeaturedCardsListComponent>
        | PolymorphNullComponentMapping<"shared.collage-with-title", SharedCollageWithTitleComponent>
        | PolymorphNullComponentMapping<"shared.collage-with-link", SharedCollageWithLinkComponent>
      );
    seo?: SharedSeoComponent;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
  isMultiLevelNavigation: boolean;
  blocks?: BaseNull1 &
    (
      | BaseNull1ComponentMapping<"shared.three-column-grid", SharedThreeColumnGridComponent>
      | BaseNull1ComponentMapping<"shared.single-image", SharedSingleImageComponent>
      | BaseNull1ComponentMapping<"shared.signpost-multiple", SharedSignpostMultipleComponent>
      | BaseNull1ComponentMapping<"shared.showcase-grid", SharedShowcaseGridComponent>
      | BaseNull1ComponentMapping<"shared.hero", SharedHeroComponent>
      | BaseNull1ComponentMapping<"shared.featured-cards-list", SharedFeaturedCardsListComponent>
      | BaseNull1ComponentMapping<"shared.collage-with-title", SharedCollageWithTitleComponent>
      | BaseNull1ComponentMapping<"shared.collage-with-link", SharedCollageWithLinkComponent>
    );
  seo?: SharedSeoComponent;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: number;
    documentId?: string;
  };
  updatedBy?: {
    id?: number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: number;
    documentId?: string;
  }[];
}

export interface NavigationResponse {
  data?: Navigation;
  meta?: object;
}

export interface SocialNetworkRequest {
  data: {
    name: string;
    link: string;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface SocialNetworkListResponse {
  data?: SocialNetwork[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface SocialNetwork {
  id?: number;
  documentId?: string;
  name: string;
  link: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: number;
    documentId?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    /** @format email */
    email?: string;
    resetPasswordToken?: string;
    registrationToken?: string;
    isActive?: boolean;
    roles?: {
      id?: number;
      documentId?: string;
      name?: string;
      code?: string;
      description?: string;
      users?: {
        id?: number;
        documentId?: string;
      }[];
      permissions?: {
        id?: number;
        documentId?: string;
        action?: string;
        actionParameters?: any;
        subject?: string;
        properties?: any;
        conditions?: any;
        role?: {
          id?: number;
          documentId?: string;
        };
        /** @format date-time */
        createdAt?: string;
        /** @format date-time */
        updatedAt?: string;
        /** @format date-time */
        publishedAt?: string;
        createdBy?: {
          id?: number;
          documentId?: string;
        };
        updatedBy?: {
          id?: number;
          documentId?: string;
        };
        locale?: string;
        localizations?: {
          id?: number;
          documentId?: string;
        }[];
      }[];
      /** @format date-time */
      createdAt?: string;
      /** @format date-time */
      updatedAt?: string;
      /** @format date-time */
      publishedAt?: string;
      createdBy?: {
        id?: number;
        documentId?: string;
      };
      updatedBy?: {
        id?: number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: number;
        documentId?: string;
      }[];
    }[];
    blocked?: boolean;
    preferedLanguage?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  updatedBy?: {
    id?: number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: number;
    documentId?: string;
    name?: string;
    link?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface SocialNetworkResponse {
  data?: SocialNetwork;
  meta?: object;
}

type BaseNull = (
  | SharedHeroComponent
  | SharedFeaturedCardsListComponent
  | SharedCollageWithTitleComponent
  | SharedSignpostMultipleComponent
  | SharedSingleImageComponent
  | SharedThreeColumnGridComponent
  | SharedShowcaseGridComponent
  | SharedCollageWithLinkComponent
  | SharedFormComponent
)[];

type BaseNullComponentMapping<Key, Type> = {
  __component: Key;
} & Type;

type AbstractNull = (
  | SharedHeroComponent
  | SharedFeaturedCardsListComponent
  | SharedCollageWithTitleComponent
  | SharedSignpostMultipleComponent
  | SharedSingleImageComponent
  | SharedThreeColumnGridComponent
  | SharedShowcaseGridComponent
  | SharedCollageWithLinkComponent
  | SharedFormComponent
)[];

type AbstractNullComponentMapping<Key, Type> = {
  __component: Key;
} & Type;

type DiscriminatorNull = (
  | SharedHeroComponent
  | SharedFeaturedCardsListComponent
  | SharedCollageWithTitleComponent
  | SharedSignpostMultipleComponent
  | SharedSingleImageComponent
  | SharedThreeColumnGridComponent
  | SharedShowcaseGridComponent
  | SharedCollageWithLinkComponent
  | SharedFormComponent
)[];

type DiscriminatorNullComponentMapping<Key, Type> = {
  __component: Key;
} & Type;

type InternalNull = (
  | SharedThreeColumnGridComponent
  | SharedSingleImageComponent
  | SharedSignpostMultipleComponent
  | SharedShowcaseGridComponent
  | SharedHeroComponent
  | SharedFeaturedCardsListComponent
  | SharedCollageWithTitleComponent
  | SharedCollageWithLinkComponent
)[];

type InternalNullComponentMapping<Key, Type> = {
  __component: Key;
} & Type;

type PolymorphNull = (
  | SharedThreeColumnGridComponent
  | SharedSingleImageComponent
  | SharedSignpostMultipleComponent
  | SharedShowcaseGridComponent
  | SharedHeroComponent
  | SharedFeaturedCardsListComponent
  | SharedCollageWithTitleComponent
  | SharedCollageWithLinkComponent
)[];

type PolymorphNullComponentMapping<Key, Type> = {
  __component: Key;
} & Type;

type BaseNull1 = (
  | SharedThreeColumnGridComponent
  | SharedSingleImageComponent
  | SharedSignpostMultipleComponent
  | SharedShowcaseGridComponent
  | SharedHeroComponent
  | SharedFeaturedCardsListComponent
  | SharedCollageWithTitleComponent
  | SharedCollageWithLinkComponent
)[];

type BaseNull1ComponentMapping<Key, Type> = {
  __component: Key;
} & Type;
