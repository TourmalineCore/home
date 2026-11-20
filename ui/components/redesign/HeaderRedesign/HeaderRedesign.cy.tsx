import { Breakpoint } from "../../../common/enums";
import { HeaderRedesign } from "./HeaderRedesign";
import headerRedesignTranslations from "../../../public/locales/ru/headerRedesign.json";

export const VIEWPORTS = [
  {
    name: `mobile`,
    width: Breakpoint.MOBILE,
    height: 408,
  },
  {
    name: `tablet`,
    width: Breakpoint.TABLET,
    height: 408,
  },
  {
    name: `tablet-xl`,
    width: Breakpoint.TABLET_XL,
    height: 408,
  },
  {
    name: `desktop`,
    width: Breakpoint.DESKTOP,
    height: 408,
  },
  {
    name: `desktop-xl`,
    width: Breakpoint.DESKTOP_XL,
    height: 408,
  },
];

describe(`Header`, () => {
  describe(`Snapshot`, snapshotTests);
  describe(`Initialization`, initializationTests);
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
    it(`Take the snapshot of HeaderRedesign ${viewport.width}x${viewport.height}`, () => {
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
        .getByData(`header-redesign`)
        .compareSnapshot(`/${viewport.name}`);
    });
  });
}

function initializationTests() {
  it(`
  GIVEN header redesign
  WHEN render the component
  SHOULD see them
  `, () => {
    cy.viewport(1366, 600);

    mountComponent();

    cy.getByData(`header-accordion-button`)
      .first()
      .trigger(`mouseover`);

    cy
      .contains(`Frontend`)
      .should(`be.visible`);
  });
}

function mountComponent() {
  cy.mountWithRouter(
    <HeaderRedesign
      {...headerRedesignTranslations}
    />,
  );
}
