export function getHeroMock({
  imageId
}: {
  imageId: number;
}) {
  return {
    __component: `shared.hero`,
    title: `title`,
    description: `description`,
    media: [imageId],
  }
}

export function getFeaturedCardsListMock({
  imageId
}: {
  imageId: number;
}) {
  return {
    __component: `shared.featured-cards-list`,
    title: `title`,
    anchorId: `services`,
    featuredCards: [
      {
        type: `points`,
        cardWithPoints: {
          title: `cardWithPoints title`,
          link: {
            text: `cardWithPoints link`,
            url: `/`
          },
          theme: `white`,
          points: [
            {
              text: `point 1`
            },
            {
              text: `point 2`
            }
          ]
        }
      },
      {
        type: `image`,
        cardWithImage: {
          theme: `blue`,
          image: imageId,
        }
      },
      {
        type: `blank`,
      },
      {
        type: `wide`,
        wideCard: {
          title: `wideCard title`,
          description: `wideCard description`,
          wideCardItems: [
            {
              name: `Frontend`,
              link: `/frontend`,
              icon: imageId,
            },
            {
              name: `Backend`,
              link: `/backend`,
              icon:  imageId,
            }
          ],
          link: {
            text: `wideCard link`,
            url: `/`
          },
        },
      }
    ],
  }
}

export function getCollageWithTitleMock({
  imageId
}: {
  imageId: number;
}) {
  return {
    __component: `shared.collage-with-title`,
    title: `collage title`,
    images: [imageId, imageId]
  }
}

export function getCollageWithLinkMock({
  imageId
}: {
  imageId: number;
}) {
  return {
    __component: `shared.collage-with-link`,
    link: {
      text: `Collage with link`,
      url: `/`
    },
    images: [imageId, imageId]
  }
}

export function getSignpostMultipleMock({
  imageId
}: {
  imageId: number;
}) {
  return {
    __component: `shared.signpost-multiple`,
    title: `Signpost Multiple title`,
    link: {
      text: `Signpost Multiple link`,
      url: `/`
    },
    signposts: [
      {
        title: `signpost title`,
        subtitle: `signpost subtitle`,
        link: `/`,
        image: imageId,
      }
    ]
  }
}

export function getSingleImageMock({
  imageId
}: {
  imageId: number;
}) {
  return {
    __component: `shared.single-image`,
    image: imageId
  }
}

export function getThreeColumnGridMock({
  imageId
}: {
  imageId: number;
}) {
  return {
    __component: `shared.three-column-grid`,
    columnsWithContent: [
      {
        type: `image`,
        columnWithImage: {
          title: `We teach at the university`,
          image: imageId,
          markdownText: `We talk about the basics of web architecture`,
        }
      },
      {
        type: `repositories`,
        columnWithRepositories: {
          title: `We do open source`,
          markdownText: `It is important for us to share experience`,
          repositories: [
            {
              name: `to-dos`,
              description: `description`,
              link: `/`,
              language: `C#`
            }
          ]
        },
      },
      {
        type: `text-and-date`,
        columnWithTextAndDate: {
          title: `We publish scientific research`,
          text: `Мethod for determining`,
          date: new Date(`2025-09-15`)
        }
      }
    ]
  }
}

export function getFormMocks() {
  return {
    __component: `shared.form`,
  }
}

export function getShowcaseGridMock({
  imageId
}: {
  imageId: number;
}) {
  return {
    __component: `shared.showcase-grid`,
    title: `Projects`,
    showOnMobile: true,
    anchorId: `projects`,
    showcaseColumns: [
      {
        type: `media`,
        showcaseColumnWithMedia: {
          title: `Pelican`,
          media: imageId,
          description: `Pelican project description`,
          link: `/`,
          isNda: false,
          size: `M`,
        }
      },
      {
        type: `markdown`,
        showcaseColumnWithMarkdown: {
          subtitle: `Inner Circle`,
          markdown: `It is important for us to share experience`,
        },
      }
    ]
  }
}