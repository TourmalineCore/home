# 006: Component Tests

## Status

Proposed

## Context

The current test strategy uses one common components page (ComponentsPage). Components are added to this page, and depending on the URL parameter (for example, `/components/mermaid-diagram-valid`), the page shows a specific component. Tests open these URLs to check the components.

Problems with this approach:

**1. We cannot pass parameters directly to the tested component in tests**

To test a component with different states, we have to duplicate it in the enum and on the components page. For example, to check a successful Mermaid diagram render and an error, we have to create two separate keys in `ComponentName` and two separate blocks in `COMPONENT_MAP` with different parameters:

```js
// common\enums\component-name.ts
export enum ComponentName {
    MERMAID_DIAGRAM_VALID = `mermaid-diagram-valid`,
    MERMAID_DIAGRAM_INVALID = `mermaid-diagram-invalid`,
    ...
}
```

```js
// pages\components\[[...component]].tsx
export const COMPONENT_MAP: Record<string, (pageData: Record<string, any>) => JSX.Element> = {
    [ComponentName.MERMAID_DIAGRAM_VALID]: () => <MermaidDiagram code="valid" />,
    [ComponentName.MERMAID_DIAGRAM_INVALID]: () => <MermaidDiagram code="invalid" />,
    ...
}
```

**2. The components page grows too much because it has many copies of the same component with different data**

**3. The process of adding tests**

To add one new test scenario, we need to make changes in three different places:
- Add a new value to the `ComponentName` enum.
- Add mapping and imports to `ComponentsPage`.
- Write the test itself.

## Decision: Using a modern Playwright approach (@playwright/test + Gallery)

We will stop using the current components page approach. Instead, we will use the official and stable "Test Gallery" pattern with @playwright/test, which is described in the [official documentation](https://playwright.dev/docs/test-components#why-a-framework-agnostic-approach).

The main feature of this approach is that it uses the real Next.js environment. Components are rendered by the real Next.js server, not by a separate builder. This means we automatically get a working router, translations (next-i18next), CSS modules, and path aliases. We do not need any extra settings or tricks. This completely avoids the problems that the other approaches have.

To set this up, we need to:
1. Update Playwright to version 1.63 or higher.
2. Create a new page at `/pages/playwright/gallery` in Next.js (the page name can be anything).

```js
// We need to import the components (or their Stories) that we want to test
import * as HeaderRedesign from '../../components/redesign/HeaderRedesign/HeaderRedesign';
import * as ChelzooAdaptationStory from '../../components/chelzoo/ChelzooAdaptation/ChelzooAdaptation.stories';

// Create the registry
// The key is the name we will pass to mount()
const componentsRegistry: Record<string, React.ComponentType<any>> = {
  ...HeaderRedesign,
  ...ChelzooAdaptationStory,
};

export default function GalleryPage() {
  const [TestedComponent, setTestedComponent] = useState<React.ComponentType<any> | null>(null);
  const [props, setProps] = useState<any>({});

  useEffect(() => {
    // Playwright calls this function when mount() runs
    // We update the state, and React correctly renders and unmounts the component
    (window as any).mount = async ({
      story,
      props: newProps,
    }: {
      story: string;
      props?: any;
    }) => {
      const Component = componentsRegistry[story];

      if (!Component) {
        throw new Error(`Component not found: "${story}". Available: ${Object.keys(componentsRegistry)
          .join(`, `)}`);
      }

      setTestedComponent(() => Component);
      setProps(newProps || {});

      return document.getElementById(`root`);
    };

    // Cleanup function. Playwright calls this before the next test to ensure full isolation
    (window as any).unmount = () => {
      setTestedComponent(null);
      setProps({});
    };
  }, []);

  // Render the component for testing
  return (
    <div id="root">
      {TestedComponent && (
        <TestedComponent
          {...props}
        />
      )}
    </div>
  );
}

// For components that use useTranslation, you can load translations using getStaticProps
export async function getStaticProps({
  locale,
}: {
  locale: string;
}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [`chelzooAdaptation`])),
    },
  };
}
```

After that, you can start writing tests. Below is an example of snapshot tests for the header.

```js
import headerTranslationsRu from '../../../public/locales/ru/headerRedesign.json';

test.describe(`SnapshotTests`, () => {
  for (const {
    name,
    width,
    height,
  } of VIEWPORTS) {
    test(`Take the snapshot of Header ${width}x${height}`, async ({
      page,
      mount,
    }) => {
      await page.setViewportSize({
        width,
        height,
      });

      const PNG_STUB_FILE = fs.readFileSync(`./playwright-tests/fixtures/stub.png`);

      await page.route(`**/_next/image*`, async (route, request) => {
        const accept = await request.headerValue(`accept`);
        if (accept?.includes(`image/*`)) {
          return route.fulfill({
            contentType: `image/png`,
            body: PNG_STUB_FILE,
          });
        }
        return route.continue();
      });

      // The first argument is the key we added to the gallery. It tells the gallery which component to render.
      // The second argument is the props that will be passed to the component or Story.
      // Because HeaderRedesign gets texts as props (not from useTranslation), 
      // we can easily pass them from a JSON file or change specific fields for the test.
      await mount(`HeaderRedesign`, {
        ...headerTranslationsRu,
        buttonLabel: 'Test label'
      });

      await expect(
        page.getByTestId(TEST_ID)
          .filter({
            visible: true,
          }),
      )
        .toHaveScreenshot(`header-redesign-${name}.png`, {
          animations: `disabled`,
        });
    });
  }
})
```

This approach solves the problem of passing parameters to components in tests. It also stops us from duplicating components with different states. This will make writing tests much easier.

If we need to, we can also create Story files. In these files, we can add extra wrappers or other extra logic. For example, we can mock `useRouter` to test the logic connected to it.

**Comparison table of component testing approaches**

| Feature | @playwright/test + Gallery (Chosen) | @playwright/experimental-ct-react | Cypress |
|---|---|---|---|
| **Support status** | Actively developed | No longer supported since version 1.63 | Actively developed |
| **Parallel testing** | Built-in | Built-in | Paid |
| **Sharding** | Built-in | Built-in | Paid |
| **Execution speed** | Fast | Fast | Medium |
| **Multi-browser support** | Chromium + Firefox + WebKit | Chromium + Firefox + WebKit | One browser per session |
| **Screenshot testing** | Built-in | Built-in | Through a plugin |
| **Mocking Next.js dependencies** | Not required, but possible via Story | Required (via Story) | Required (directly in the test) |
| **CSS, aliases, SVG plugins** | Work automatically | Need setup and extra dependencies | Need setup |
| **Setup difficulty** | Medium (setup the gallery once) | Medium (install extra dependencies, mock wrappers) | Easy |

## Alternatives

### 1. Using @playwright/experimental-ct-react

This is a special Playwright package for component testing. However, when we used it with Next.js, we had some problems that needed workarounds. We fixed all these problems, but we still decided not to use this package. Starting from Playwright version 1.63, it is officially marked as deprecated and is no longer supported. This means we cannot update Playwright past version 1.62, and we will not get new features.

**Problems and solutions**

1. Components that use the `useRouter` hook throw an error when mounted

```bash
(uncaught exception)Error: NextRouter was not mounted. https://nextjs.org/docs/messages/next-router-not-mounted
```

**Solution**: Create a mock wrapper for `useRouter` and wrap the tested component in it.

```js
/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { NextRouter } from 'next/router';

export function RouterTestProvider({
  children,
  routerOptions = {},
}: {
  children: React.ReactNode;
  routerOptions?: Partial<NextRouter>;
}) {
  const mockRouter: NextRouter = {
    route: `/`,
    pathname: `/`,
    query: {},
    asPath: `/`,
    basePath: ``,
    isReady: true,
    locale: `ru`,
    locales: [`ru`, `en`, `zh`],
    defaultLocale: `ru`,
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
```

2. Components that import .svg files as React components fail with a parsing error

```bash
SyntaxError: Unexpected token '<'
Failed to execute 'createElement' on 'Document': The tag name provided ('data:image/svg+xml,...') is not a valid name.
```

**Solution**: Playwright CT uses Vite, not Webpack (like Next.js does). By default, Vite sees .svg files as a string (URL), not as a component. You need to set up `vite-plugin-svgr` in the Playwright configuration.

1. `npm install -D vite-plugin-svgr @vitejs/plugin-react`

2. Add them to `playwright-ct.config.ts`:

```js
import { defineConfig } from '@playwright/experimental-ct-react';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  use: {
    ctViteConfig: {
      plugins: [
        react(),
        svgr({
            include: `**/*.svg`
        }),
      ] as any,
    },
  },
});
```

We need to add `@vitejs/plugin-react` for two reasons:
- Playwright stops adding `react()` automatically when you add any custom plugin (like svgr) to `ctViteConfig.plugins`. If you do not add `react()` yourself, Vite cannot compile JSX/TSX, and any component will fail with an error like "React is not defined" or "Unexpected token <".
- TypeScript type conflicts. Playwright CT has its own Vite version inside its folders (`node_modules/@playwright/experimental-ct-core/node_modules/vite`). If you install the plugin in the main project folder and cast the plugins array to `as any`, you can avoid type errors between the two different Vite versions.

3. Images added through CSS (`background-image`) do not show up in component tests.

**Solution**: Change relative paths to absolute paths (starting from the root of the `public/` folder).

**Before (does not work in Playwright CT):**
```css
background-image: url("../../../../../public/images/header-button-edge-left-desktop-xl.svg");
```

**After (works everywhere):**
```css
background-image: url("/images/header-button-edge-left-desktop-xl.svg");
```

**Important things to know about Playwright component tests**

If a component uses providers (like `useRouter`, `i18n`, etc.), you need to move them to a separate file called a Story. This is the official Playwright pattern, which is described in the [documentation](https://playwright.dev/docs/test-components?spm=a2ty_o01.29997173.0.0.4762c921FqU7ue#using-providers).

### 2. Using Cypress

Even though it is easier to learn and you can write mock wrappers right inside the test file without a Story, Cypress runs tests slower. Also, the free version does not support running tests in parallel. Just like `@playwright/experimental-ct-react`, it has problems when testing components with specific Next.js logic. Also, the CEO wants us to keep using Playwright.

**Problems and solutions**

1. Components that use the `useRouter` hook throw an error when mounted

```bash
(uncaught exception)Error: NextRouter was not mounted. https://nextjs.org/docs/messages/next-router-not-mounted
```

**Solution**: Create a mock wrapper for `useRouter` and wrap the tested component in it.

```js
Cypress.Commands.add(`mountWithRouter`, (component: React.ReactNode, routerOptions: MockRouterOptions = {}) => {
  const mockRouter: NextRouter = {
    route: `/`,
    pathname: `/`,
    query: {},
    asPath: `/`,
    basePath: ``,
    isReady: true,
    locale: `ru`,
    locales: [`ru`, `en`, `zh`],
    defaultLocale: `ru`,
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
```

2. Images loaded through the Next.js `<Image />` component do not load in tests.

**Solution**: Catch the image requests using `intercept` and replace them with simple placeholder images (stubs).

```js
beforeEach(() => {
  cy.intercept(`**/_next/static/media/**`, {
    fixture: `stub.png`,
  });
  cy.intercept(`**/_next/image**`, {
    fixture: `stub.png`,
  });
});
```