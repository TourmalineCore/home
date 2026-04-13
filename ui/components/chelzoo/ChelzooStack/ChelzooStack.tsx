import { useTranslation } from "next-i18next";

type StackList = {
  title: string;
  data: string[];
}[];

export function ChelzooStack() {
  const {
    t,
  } = useTranslation(`chelzooStack`);

  const stackList: StackList = t(`list`, {
    returnObjects: true,
  });

  return (
    <section
      className="chelzoo-stack"
      data-testid="chelzoo-stack"
    >
      <div className="container-cases chelzoo-stack__wrapper">
        <h2 className="chelzoo-stack__title">
          {t(`sectionTitle`)}
        </h2>
        <p className="chelzoo-stack__description">
          {t(`description`)}
        </p>
        <div className="chelzoo-stack__list">
          {stackList.map(({
            title,
            data,
          }) => (
            <div
              key={title}
              className="chelzoo-stack__item"
            >
              <h3 className="chelzoo-stack__direction">{title}</h3>
              <ul className="chelzoo-stack__technologies">
                {data.map((text) => (
                  <li
                    key={text}
                    className="chelzoo-stack__technology"
                  >
                    <span
                      className="chelzoo-stack__name"
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
