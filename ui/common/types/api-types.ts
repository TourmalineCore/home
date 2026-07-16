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

export interface CookieRequest {
  data: {
    bannerText: string;
    analyticsText: string;
    webvisorText: string;
    privacyText: string;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface CookieListResponse {
  data?: Cookie[];
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

export interface Cookie {
  id?: string | number;
  documentId?: string;
  bannerText: string;
  analyticsText: string;
  webvisorText: string;
  privacyText: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
      name?: string;
      code?: string;
      description?: string;
      users?: {
        id?: string | number;
        documentId?: string;
      }[];
      permissions?: {
        id?: string | number;
        documentId?: string;
        action?: string;
        actionParameters?: any;
        subject?: string;
        properties?: any;
        conditions?: any;
        role?: {
          id?: string | number;
          documentId?: string;
        };
        /** @format date-time */
        createdAt?: string;
        /** @format date-time */
        updatedAt?: string;
        /** @format date-time */
        publishedAt?: string;
        createdBy?: {
          id?: string | number;
          documentId?: string;
        };
        updatedBy?: {
          id?: string | number;
          documentId?: string;
        };
        locale?: string;
        localizations?: {
          id?: string | number;
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
        id?: string | number;
        documentId?: string;
      };
      updatedBy?: {
        id?: string | number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  };
  updatedBy?: {
    id?: string | number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: string | number;
    documentId?: string;
    bannerText?: string;
    analyticsText?: string;
    webvisorText?: string;
    privacyText?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  }[];
}

export interface CookieResponse {
  data?: Cookie;
  meta?: object;
}

export interface CookieConsentRequest {
  data: {
    consentId: string;
    consentVersion: string;
    categories: any;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface CookieConsentListResponse {
  data?: CookieConsent[];
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

export interface CookieConsent {
  id?: string | number;
  documentId?: string;
  consentId: string;
  consentVersion: string;
  categories: any;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
      name?: string;
      code?: string;
      description?: string;
      users?: {
        id?: string | number;
        documentId?: string;
      }[];
      permissions?: {
        id?: string | number;
        documentId?: string;
        action?: string;
        actionParameters?: any;
        subject?: string;
        properties?: any;
        conditions?: any;
        role?: {
          id?: string | number;
          documentId?: string;
        };
        /** @format date-time */
        createdAt?: string;
        /** @format date-time */
        updatedAt?: string;
        /** @format date-time */
        publishedAt?: string;
        createdBy?: {
          id?: string | number;
          documentId?: string;
        };
        updatedBy?: {
          id?: string | number;
          documentId?: string;
        };
        locale?: string;
        localizations?: {
          id?: string | number;
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
        id?: string | number;
        documentId?: string;
      };
      updatedBy?: {
        id?: string | number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  };
  updatedBy?: {
    id?: string | number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: string | number;
    documentId?: string;
    consentId?: string;
    consentVersion?: string;
    categories?: any;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  }[];
}

export interface CookieConsentResponse {
  data?: CookieConsent;
  meta?: object;
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
  id?: string | number;
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
    id?: string | number;
    documentId?: string;
  };
  updatedBy?: {
    id?: string | number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  }[];
}

export interface HomepageResponse {
  data?: Homepage;
  meta?: object;
}

export interface SharedHeroComponent {
  id?: string | number;
  __component?: "shared.hero";
  title?: string;
  description?: string;
  media?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    }[];
    folder?: {
      id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  }[];
}

export interface FeaturedCardCardWithImageComponent {
  id?: string | number;
  image?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    }[];
    folder?: {
      id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  };
  theme?: "black" | "grey" | "blue";
}

export interface SharedTextComponent {
  id?: string | number;
  text?: string;
}

export interface SharedLinkComponent {
  id?: string | number;
  text?: string;
  url?: string;
}

export interface FeaturedCardCardWithPointsComponent {
  id?: string | number;
  title?: string;
  points?: SharedTextComponent[];
  link?: SharedLinkComponent;
  theme?: "white" | "black" | "grey";
}

export interface FeaturedCardWideCardItemsComponent {
  id?: string | number;
  name?: string;
  icon?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    }[];
    folder?: {
      id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  };
  link?: string;
}

export interface FeaturedCardWideCardComponent {
  id?: string | number;
  title?: string;
  description?: string;
  wideCardItems?: FeaturedCardWideCardItemsComponent[];
  link?: SharedLinkComponent;
}

export interface SharedFeaturedCardComponent {
  id?: string | number;
  type?: "points" | "image" | "blank" | "wide";
  cardWithImage?: FeaturedCardCardWithImageComponent;
  cardWithPoints?: FeaturedCardCardWithPointsComponent;
  wideCard?: FeaturedCardWideCardComponent;
}

export interface SharedFeaturedCardsListComponent {
  id?: string | number;
  __component?: "shared.featured-cards-list";
  title?: string;
  featuredCards?: SharedFeaturedCardComponent[];
  anchorId?: string;
}

export interface SharedCollageWithTitleComponent {
  id?: string | number;
  __component?: "shared.collage-with-title";
  title?: string;
  images?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    }[];
    folder?: {
      id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  }[];
}

export interface SharedSignpostComponent {
  id?: string | number;
  image?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    }[];
    folder?: {
      id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  };
  title?: string;
  subtitle?: string;
  link?: string;
}

export interface SharedSignpostMultipleComponent {
  id?: string | number;
  __component?: "shared.signpost-multiple";
  title?: string;
  link?: SharedLinkComponent;
  signposts?: SharedSignpostComponent[];
}

export interface SharedSingleImageComponent {
  id?: string | number;
  __component?: "shared.single-image";
  image?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    }[];
    folder?: {
      id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  };
}

export interface ColumnWithContentColumnWithImageComponent {
  id?: string | number;
  title?: string;
  image?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    }[];
    folder?: {
      id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  };
  markdownText?: string;
}

export interface ColumnWithContentRepositoryCardComponent {
  id?: string | number;
  name?: string;
  description?: string;
  link?: string;
  language?: "TypeScript" | "C#";
}

export interface ColumnWithContentColumnWithRepositoriesComponent {
  id?: string | number;
  title?: string;
  repositories?: ColumnWithContentRepositoryCardComponent[];
  markdownText?: string;
}

export interface ColumnWithContentColumnWithTextAndDateComponent {
  id?: string | number;
  title?: string;
  text?: string;
  /** @format date */
  date?: string;
}

export interface SharedColumnWithContentComponent {
  id?: string | number;
  type?: "image" | "repositories" | "text-and-date";
  columnWithImage?: ColumnWithContentColumnWithImageComponent;
  columnWithRepositories?: ColumnWithContentColumnWithRepositoriesComponent;
  columnWithTextAndDate?: ColumnWithContentColumnWithTextAndDateComponent;
}

export interface SharedThreeColumnGridComponent {
  id?: string | number;
  __component?: "shared.three-column-grid";
  columnsWithContent?: SharedColumnWithContentComponent[];
}

export interface ShowcaseColumnShowcaseColumnWithMarkdownComponent {
  id?: string | number;
  subtitle?: string;
  markdown?: string;
}

export interface ShowcaseColumnShowcaseColumnWithMediaComponent {
  id?: string | number;
  title?: string;
  description?: string;
  media?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    }[];
    folder?: {
      id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  };
  link?: string;
  isNda?: boolean;
  size?: "XS" | "S" | "M" | "L";
}

export interface ShowcaseColumnShowcaseColumnsComponent {
  id?: string | number;
  type?: "media" | "markdown";
  showcaseColumnWithMarkdown?: ShowcaseColumnShowcaseColumnWithMarkdownComponent;
  showcaseColumnWithMedia?: ShowcaseColumnShowcaseColumnWithMediaComponent;
}

export interface SharedShowcaseGridComponent {
  id?: string | number;
  __component?: "shared.showcase-grid";
  title?: string;
  showcaseColumns?: ShowcaseColumnShowcaseColumnsComponent[];
  showOnMobile?: boolean;
  anchorId?: string;
}

export interface SharedCollageWithLinkComponent {
  id?: string | number;
  __component?: "shared.collage-with-link";
  link?: SharedLinkComponent;
  images?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    }[];
    folder?: {
      id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  }[];
}

export interface SharedFormComponent {
  id?: string | number;
  __component?: "shared.form";
}

export interface SharedSeoComponent {
  id?: string | number;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    }[];
    folder?: {
      id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
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
  id?: string | number;
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
    id?: string | number;
    documentId?: string;
  };
  updatedBy?: {
    id?: string | number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  }[];
}

export interface LayoutResponse {
  data?: Layout;
  meta?: object;
}

export interface SharedHeaderComponent {
  id?: string | number;
  buttonLabel?: string;
  emailCaption?: string;
  socialLinks?: {
    id?: string | number;
    documentId?: string;
  }[];
  navigationLists?: {
    id?: string | number;
    documentId?: string;
  }[];
}

export interface FooterFooterNavigationListComponent {
  id?: string | number;
  caption?: string;
  isSocialNetworks?: boolean;
  links?: {
    id?: string | number;
    documentId?: string;
  }[];
  socialLinks?: {
    id?: string | number;
    documentId?: string;
  }[];
}

export interface SharedFooterComponent {
  id?: string | number;
  emailCaption?: string;
  navigationLists?: FooterFooterNavigationListComponent[];
}

export interface MagazineSubscriptionRequest {
  data: {
    telegram?: string;
    /** @format email */
    email?: string;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface MagazineSubscriptionListResponse {
  data?: MagazineSubscription[];
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

export interface MagazineSubscription {
  id?: string | number;
  documentId?: string;
  telegram?: string;
  /** @format email */
  email?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
      name?: string;
      code?: string;
      description?: string;
      users?: {
        id?: string | number;
        documentId?: string;
      }[];
      permissions?: {
        id?: string | number;
        documentId?: string;
        action?: string;
        actionParameters?: any;
        subject?: string;
        properties?: any;
        conditions?: any;
        role?: {
          id?: string | number;
          documentId?: string;
        };
        /** @format date-time */
        createdAt?: string;
        /** @format date-time */
        updatedAt?: string;
        /** @format date-time */
        publishedAt?: string;
        createdBy?: {
          id?: string | number;
          documentId?: string;
        };
        updatedBy?: {
          id?: string | number;
          documentId?: string;
        };
        locale?: string;
        localizations?: {
          id?: string | number;
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
        id?: string | number;
        documentId?: string;
      };
      updatedBy?: {
        id?: string | number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  };
  updatedBy?: {
    id?: string | number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: string | number;
    documentId?: string;
    telegram?: string;
    /** @format email */
    email?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  }[];
}

export interface MagazineSubscriptionResponse {
  data?: MagazineSubscription;
  meta?: object;
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
  id?: string | number;
  documentId?: string;
  name: string;
  link: string;
  navItems?: {
    id?: string | number;
    documentId?: string;
    name?: string;
    link?: string;
    navItems?: {
      id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  }[];
  isMultiLevelNavigation: boolean;
  blocks?: DiscriminatorNull1 &
    (
      | DiscriminatorNull1ComponentMapping<"shared.three-column-grid", SharedThreeColumnGridComponent>
      | DiscriminatorNull1ComponentMapping<"shared.single-image", SharedSingleImageComponent>
      | DiscriminatorNull1ComponentMapping<"shared.signpost-multiple", SharedSignpostMultipleComponent>
      | DiscriminatorNull1ComponentMapping<"shared.showcase-grid", SharedShowcaseGridComponent>
      | DiscriminatorNull1ComponentMapping<"shared.hero", SharedHeroComponent>
      | DiscriminatorNull1ComponentMapping<"shared.featured-cards-list", SharedFeaturedCardsListComponent>
      | DiscriminatorNull1ComponentMapping<"shared.collage-with-title", SharedCollageWithTitleComponent>
      | DiscriminatorNull1ComponentMapping<"shared.collage-with-link", SharedCollageWithLinkComponent>
    );
  seo?: SharedSeoComponent;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: string | number;
    documentId?: string;
  };
  updatedBy?: {
    id?: string | number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: string | number;
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
  id?: string | number;
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
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
      name?: string;
      code?: string;
      description?: string;
      users?: {
        id?: string | number;
        documentId?: string;
      }[];
      permissions?: {
        id?: string | number;
        documentId?: string;
        action?: string;
        actionParameters?: any;
        subject?: string;
        properties?: any;
        conditions?: any;
        role?: {
          id?: string | number;
          documentId?: string;
        };
        /** @format date-time */
        createdAt?: string;
        /** @format date-time */
        updatedAt?: string;
        /** @format date-time */
        publishedAt?: string;
        createdBy?: {
          id?: string | number;
          documentId?: string;
        };
        updatedBy?: {
          id?: string | number;
          documentId?: string;
        };
        locale?: string;
        localizations?: {
          id?: string | number;
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
        id?: string | number;
        documentId?: string;
      };
      updatedBy?: {
        id?: string | number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
      documentId?: string;
    }[];
  };
  updatedBy?: {
    id?: string | number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: string | number;
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
      id?: string | number;
      documentId?: string;
    };
    updatedBy?: {
      id?: string | number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: string | number;
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

type DiscriminatorNull1 = (
  | SharedThreeColumnGridComponent
  | SharedSingleImageComponent
  | SharedSignpostMultipleComponent
  | SharedShowcaseGridComponent
  | SharedHeroComponent
  | SharedFeaturedCardsListComponent
  | SharedCollageWithTitleComponent
  | SharedCollageWithLinkComponent
)[];

type DiscriminatorNull1ComponentMapping<Key, Type> = {
  __component: Key;
} & Type;
