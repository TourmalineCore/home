import z from "zod";

const HeroSchema = z.object({
  __component: z.literal(`shared.hero`),
  id: z.number(),
  title: z.string(),
  description: z.string(),
  media: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
    }))
});

const FeaturedCardsListSchema = z.object({
  __component: z.literal(`shared.featured-cards-list`),
  id: z.number(),
  anchorId: z.string(),
  title: z.string(),
  featuredCards: z.array(
    z.object({
      id: z.number(),
      type: z.enum([
        `points`,
        `image`,
        `wide`,
        `blank`
      ]),
      cardWithImage: z.object({
        theme: z.enum([
          `blue`,
          `white`,
          `grey`,
        ]),
        image: z.object({
          url: z.string()
        })
      })
        .nullish(),
      cardWithPoints: z.object({
        theme: z.enum([
          `black`,
          `white`,
          `grey`,
        ]),
        title: z.string(),
        link: z.object({
          text: z.string(),
          url: z.string(),
        }),
        points: z.array(
          z.object({
            text: z.string(),
          })
        ) 
      })
        .nullish(),
      wideCard: z.object({
        title: z.string(),
        description: z.string(),
        wideCardItems: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            link: z.string(),
            icon: z.object({
              url: z.string(),
            })
          })),
        link: z.object({
          text: z.string(),
          url: z.string(),
        }),
      })
        .nullish(),
    }))
});

const CollageWithTitleSchema = z.object({
  __component: z.literal(`shared.collage-with-title`),
  title: z.string(),
  images: z.array(z.object({
    url: z.string()
  }))
})
const CollageWithLinkSchema = z.object({
  __component: z.literal(`shared.collage-with-link`),
  link: z.object({
    text: z.string(),
    url: z.string(),
  }),
  images: z.array(z.object({
    url: z.string()
  }))
})


const SignpostMultipleSchema = z.object({
  __component: z.literal(`shared.signpost-multiple`),
  title: z.string(),
  link: z.object({
    text: z.string(),
    url: z.string(),
  })
    .nullish(),
  signposts: z.array(z.object({
    title: z.string(),
    subtitle: z.string(),
    link: z.string(),
    image: z.object({
      url: z.string()
    })
  }))
    .nullish()
})

const SingleImageSchema = z.object({
  __component: z.literal(`shared.single-image`),
  image: z.object({
    url: z.string()
  })
})

const ColumnSchema = z.discriminatedUnion(`type`, [
  z.object({
    type: z.literal(`image`),
    columnWithImage: z.object({
      title: z.string(),
      image: z.object({
        url: z.string() 
      }),
      markdownText: z.string(),
    }),
  }),
  z.object({
    type: z.literal(`repositories`),
    columnWithRepositories: z.object({
      title: z.string(),
      markdownText: z.string(),
      repositories: z.array(z.object({
        name: z.string(),
        description: z.string(),
        link: z.string(),
        language: z.enum([`TypeScript`, `C#`]),
      })),
    }),
  }),
  z.object({
    type: z.literal(`text-and-date`),
    columnWithTextAndDate: z.object({
      title: z.string(),
      text: z.string(),
      date: z.string(),
    }),
  }),
]);

const ThreeColumnGridSchema = z.object({
  __component: z.literal(`shared.three-column-grid`),
  columnsWithContent: z.array(ColumnSchema),
});

const ShowcaseColumnSchema = z.discriminatedUnion(`type`, [
  z.object({
    type: z.literal(`media`),
    showcaseColumnWithMedia: z.object({
      title: z.string(),
      media: z.object({
        url: z.string() 
      }),
      description: z.string(),
      link: z.string(),
      isNda: z.boolean(),
      size: z.string(),
    }),
  }),
  z.object({
    type: z.literal(`markdown`),
    showcaseColumnWithMarkdown: z.object({
      subtitle: z.string(),
      markdown: z.string(),
    }),
  }),
]);

const ShowcaseGridSchema = z.object({
  __component: z.literal(`shared.showcase-grid`),
  title: z.string(),
  showOnMobile: z.boolean(),
  anchorId: z.string(),
  showcaseColumns: z.array(ShowcaseColumnSchema),
});

const FormSchema = z.object({
  __component: z.literal(`shared.form`),
});

export const PageSchema = z.object({
  id: z.number(),
  blocks: z.array(
    z.discriminatedUnion(
      `__component`,
      [
        HeroSchema,
        CollageWithTitleSchema,
        CollageWithLinkSchema,
        FeaturedCardsListSchema,
        SignpostMultipleSchema,
        SingleImageSchema,
        ThreeColumnGridSchema,
        ShowcaseGridSchema,
        FormSchema
      ]
    )
  )
    .nullish(),
  seo: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
    keywords: z.string()
      .nullish()
  })
    .nullish()
});

