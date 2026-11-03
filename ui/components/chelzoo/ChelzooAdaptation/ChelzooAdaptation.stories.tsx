import { ChelzooAdaptation } from "./ChelzooAdaptation";

import translations from '../../../public/locales/ru/chelzooAdaptation.json';
import { createTestI18n, I18nextTestProvider } from "../../../playwright-tests/I18nextTestProvider";
import { RouterTestProvider } from "../../../playwright-tests/RouterTestProvider";
import { useNonBreakingSpaces } from "../../../common/hooks";

export function ChelzooAdaptationStory() {
  const testI18n = createTestI18n({
    lng: `ru`,
    ns: `chelzooAdaptation`,
    resources: translations,
  });

  useNonBreakingSpaces({
    locale: `ru`,
  });

  return (
    <RouterTestProvider>
      <I18nextTestProvider i18nInstance={testI18n}>
        <ChelzooAdaptation />
      </I18nextTestProvider>
    </RouterTestProvider>
  );
}
