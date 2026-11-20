import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ChelzooHero } from "./ChelzooHero";
import ChelzooHeroTranslationRu from "../../../public/locales/ru/chelzooHero.json";
import ChelzooHeroTranslationEn from "../../../public/locales/en/chelzooHero.json";

i18n
  .use(initReactI18next)
  .init({
    lng: `ru`,
    fallbackLng: `ru`,
    ns: [`chelzooHero`],
    defaultNS: `chelzooHero`,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru: {
        chelzooHero: ChelzooHeroTranslationRu,
      },
      en: {
        chelzooHero: ChelzooHeroTranslationEn,
      },
    },
  });

describe(`ChelzooHero`, () => {
  describe(`Initialization`, initializationTests);
});

function initializationTests() {
  it(`
  GIVEN chelzoo hero
  WHEN render the component
  SHOULD see them
  `, () => {
    mountComponent();
  });
}

function mountComponent() {
  cy.viewport(1366, 600);

  cy.mountWithRouter(
    <ChelzooHero />,
  );
}
