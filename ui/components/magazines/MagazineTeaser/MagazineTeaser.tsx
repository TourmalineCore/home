import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FeaturedCardsList } from "../../FeaturedCardsList/FeaturedCardsList";

export function MagazineTeaser() {
  const {
    locale,
  } = useRouter();

  const {
    t,
  } = useTranslation(`magazineTeaser`);

  const socialLinks = locale === `ru`
    ? [
      {
        name: `Telegram`,
        icon: `/images/icon-qa.svg`,
        link: `https://t.me/+f4cIrOcFi_EyYjcy`,
      },
      {
        name: `Вконтакте`,
        icon: `/images/icon-design.svg`,
        link: `https://vk.com/tourmalinecore`,
      },
      {
        name: `Youtube`,
        icon: `/images/icon-devops.svg`,
        link: `https://www.youtube.com/@tourmalinecore`,
      },
    ]
    : [
      {
        name: `Youtube`,
        icon: `/images/icon-devops.svg`,
        link: `https://www.youtube.com/@tourmalinecore`,
      },
      {
        name: `LinkedIn`,
        icon: `/images/icon-design.svg`,
        link: `https://www.linkedin.com/company/tourmalinecore`,
      },
    ];

  return (
    <FeaturedCardsList cards={[
      {
        id: 1,
        imageWithBlurDataURL: {
          url: `/images/next-magazine.png`,
          blurDataURL: ``,
        },
        theme: `blue`,
        type: `image`,
        isImageZoomed: true,
      },
      {
        id: 2,
        type: `wide`,
        title: t(`title`),
        description: t(`description`),
        wideCardItems: socialLinks.map((socialLink, index) => ({
          id: index + 1,
          ...socialLink,
        })),
      },
    ]}
    />
  );
}
