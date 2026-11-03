/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { NextRouter } from 'next/router';

export type MockRouterOptions = Partial<NextRouter>;

export function RouterTestProvider({
  children,
  routerOptions = {},
}: {
  children: React.ReactNode;
  routerOptions?: MockRouterOptions;
}) {
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
    push: () => Promise.resolve(true),
    replace: () => Promise.resolve(true),
    reload: () => {},
    back: () => {},
    forward: () => {},
    prefetch: () => Promise.resolve(),
    beforePopState: () => {},
    isFallback: false,
    events: {
      on: () => {},
      off: () => {},
      emit: () => {},
    },
    ...routerOptions,
  } as unknown as NextRouter;

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  );
}
