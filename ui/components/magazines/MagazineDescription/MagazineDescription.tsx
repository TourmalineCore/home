import { useTranslation } from "next-i18next";
import { MarkdownText } from "../../MarkdownText/MarkdownText";

export function MagazineDescription() {
  const {
    t,
  } = useTranslation(`magazineTddDescription`);

  return (
    <section
      className="magazine-description"
      data-testid="magazine-description"
    >
      <div className="magazine-description__wrapper">
        <MarkdownText className="magazine-description__text">
          {t(`text`)}
        </MarkdownText>
      </div>
    </section>
  );
}
