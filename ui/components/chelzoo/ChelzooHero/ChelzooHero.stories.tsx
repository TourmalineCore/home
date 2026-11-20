import translations from '../../../public/locales/ru/chelzooHero.json';
import { createTestI18n, I18nextTestProvider } from "../../../playwright-tests/I18nextTestProvider";
import { RouterTestProvider } from "../../../playwright-tests/RouterTestProvider";
import { useNonBreakingSpaces } from "../../../common/hooks";
import { ChelzooHero } from './ChelzooHero';

export function ChelzooHeroStory() {
  const testI18n = createTestI18n({
    lng: `ru`,
    ns: `chelzooHero`,
    resources: translations,
  });

  useNonBreakingSpaces({
    locale: `ru`,
  });

  return (
    <RouterTestProvider>
      <I18nextTestProvider i18nInstance={testI18n}>
        <ChelzooHero isComponentPage />
      </I18nextTestProvider>
    </RouterTestProvider>
  );
}
