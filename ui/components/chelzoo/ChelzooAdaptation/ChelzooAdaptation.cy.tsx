import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Breakpoint } from "../../../common/enums";
import { ChelzooAdaptation } from "./ChelzooAdaptation";
import ChelzooAdaptationTranslationRu from "../../../public/locales/ru/chelzooAdaptation.json";

i18n
  .use(initReactI18next)
  .init({
    lng: `ru`,
    fallbackLng: `ru`,
    ns: [`chelzooAdaptation`],
    defaultNS: `chelzooAdaptation`,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru: {
        chelzooAdaptation: ChelzooAdaptationTranslationRu,
      },
    },
  });

export const VIEWPORTS = [
  {
    name: `mobile`,
    width: Breakpoint.MOBILE,
    height: 565,
  },
  {
    name: `tablet`,
    width: Breakpoint.TABLET,
    height: 1312,
  },
  {
    name: `tablet-xl`,
    width: Breakpoint.TABLET_XL,
    height: 1801,
  },
  {
    name: `desktop`,
    width: Breakpoint.DESKTOP,
    height: 2360,
  },
  {
    name: `desktop-xl`,
    width: Breakpoint.DESKTOP_XL,
    height: 3318,
  },
];

describe(`ChelzooAdaption`, () => {
  describe(`Snapshot`, snapshotTests);
});

function snapshotTests() {
  beforeEach(() => {
    cy.intercept(`**/_next/static/media/**`, {
      fixture: `stub.png`,
    });
    cy.intercept(`**/_next/image**`, {
      fixture: `stub.png`,
    });
  });

  after(() => {
    cy.wrap(
      Cypress.automation(`remote:debugger:protocol`, {
        command: `Emulation.clearDeviceMetricsOverride`,
        params: {},
      }),
    );
  });

  VIEWPORTS.forEach((viewport) => {
    it(`Take the snapshot of ChelzooAdaptation ${viewport.width}x${viewport.height}`, () => {
      cy.viewport(viewport.width, viewport.height);

      cy.wrap(
        Cypress.automation(`remote:debugger:protocol`, {
          command: `Emulation.setDeviceMetricsOverride`,
          params: {
            width: viewport.width,
            height: viewport.height,
            deviceScaleFactor: 1,
            mobile: false,
          },
        }),
      );

      mountComponent();

      cy
        .getByData(`chelzoo-adaptation`)
        .compareSnapshot(`/${viewport.name}`);
    });
  });
}

function mountComponent() {
  cy.mountWithRouter(
    <ChelzooAdaptation />,
  );
}
