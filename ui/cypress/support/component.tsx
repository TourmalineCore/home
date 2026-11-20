import './commands';
import '../../styles/main.scss';

import { mount } from 'cypress/react';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

export type MockRouterOptions = Partial<NextRouter>;

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
      mountWithRouter: (
        component: React.ReactNode,
        routerOptions?: MockRouterOptions
      ) => Cypress.Chainable;
    }
  }
}

Cypress.Commands.add(`mount`, mount);

Cypress.Commands.add(`mountWithRouter`, (component: React.ReactNode, routerOptions: MockRouterOptions = {}) => {
  const mockRouter: NextRouter = {
    route: `/`,
    pathname: `/`,
    query: {},
    asPath: `/`,
    basePath: ``,
    isReady: true,
    locale: undefined,
    locales: undefined,
    defaultLocale: undefined,
    domainLocales: undefined,
    isLocaleDomain: false,
    push: cy.stub()
      .as(`routerPush`),
    replace: cy.stub()
      .as(`routerReplace`),
    reload: cy.stub()
      .as(`routerReload`),
    back: cy.stub()
      .as(`routerBack`),
    forward: cy.stub()
      .as(`routerForward`),
    prefetch: cy.stub()
      .resolves(),
    beforePopState: cy.stub(),
    isFallback: false,
    events: {
      on: cy.stub(),
      off: cy.stub(),
      emit: cy.stub(),
    },
    ...routerOptions,
  } as NextRouter;

  return mount(
    <RouterContext.Provider value={mockRouter}>
      {component}
    </RouterContext.Provider>,
  );
});
