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
            <div key={title}>
              <h4>{title}</h4>
              <ul>
                {data.map((text) => (
                  <li
                    key={text}
                  >
                    <span>{text}</span>
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
