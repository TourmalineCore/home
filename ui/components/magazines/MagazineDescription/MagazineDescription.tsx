import { MarkdownText } from "../../MarkdownText/MarkdownText";

export function MagazineDescription() {
  // eslint-disable-next-line max-len
  const text = `<p>Прямо на UWDC, сразу после доклада, мы анонсировали ещё кое-что: первый номер нашего журнала «Турмалин Код».</p>\n <p>Это журнал про инженерную культуру, код и бизнес-процессы. Его мы писали так, чтобы материал приносил пользу как тем, кто принимает бизнес-решения  и ведет за собой команды разработчиков, так и тем, кто проектирует системы и пишет их код.</p>\n <p>Открывающий выпуск про Test-Driven Development (разработку через тестирование): зачем TDD бизнесу, как он меняет дизайн кода системы, что мешает внедрению, какие есть открытые материалы у нас уже сейчас.</p>`;

  return (
    <section
      className="magazine-description"
      data-testid="magazine-description"
    >
      <div className="magazine-description__wrapper">
        <MarkdownText className="magazine-description__text">
          {text}
        </MarkdownText>
      </div>
    </section>
  );
}
