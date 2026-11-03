import { I18nextProvider } from 'react-i18next';
import { ChelzooAdaptation } from "./ChelzooAdaptation";

import translations from '../../../public/locales/ru/chelzooAdaptation.json';
import { createTestI18n } from "../../../playwright-tests/I18nextTestProvider";
import { RouterTestProvider } from "../../../playwright-tests/RouterTestProvider";

export function ChelzooAdaptationStory() {
  const testI18n = createTestI18n({
    lng: `ru`,
    ns: `chelzooAdaptation`,
    resources: translations,
  });

  return (
    <RouterTestProvider>
      <I18nextProvider i18n={testI18n}>
        <ChelzooAdaptation />
      </I18nextProvider>
    </RouterTestProvider>
  );
}
