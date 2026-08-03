import { FeaturedCardsList } from "../../FeaturedCardsList/FeaturedCardsList";

export function MagazineTeaser() {
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
        title: `Следующий номер — про Content Credentials`,
        description: `Анонсы выпусков, разборы по темам номеров и точки, где можно забрать бумажный журнал — в блогах компании`,
        wideCardItems: [
          {
            id: 1,
            name: `Telegram`,
            link: `https://t.me/+f4cIrOcFi_EyYjcy`,
          },
          {
            id: 2,
            name: `Вконтакте`,
            link: `https://vk.com/tourmalinecore`,
          },
          {
            id: 3,
            name: `Youtube`,
            link: `https://www.youtube.com/@tourmalinecore`,
          },
        ],
      },
    ]}
    />
  );
}
