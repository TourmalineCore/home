import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from '../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../playwright-tests/constants/breakpoints';
import { Breakpoint, ComponentName } from '../../../common/enums';

const TEST_ID = ComponentName.MAGAZINE_PDF_VIEW;

test.describe(`MagazinePdfViewScreenshotTests`, () => {
  test.beforeEach(async ({
    page,
    goToComponentsPage,
  }) => {
    await goToComponentsPage(TEST_ID);

    // The pdf loads asynchronously, so wait for its first page before screenshotting
    await page.waitForSelector(`[data-testid="${TEST_ID}"] canvas`);
  });

  for (const {
    name,
    breakpoint,
    breakpointName,
  } of BREAKPOINTS) {
    test(name, async ({
      page,
      testScreenshotAtBreakpoint,
    }) => {
      await testScreenshotAtBreakpoint({
        testId: TEST_ID,
        breakpoint,
        breakpointName,
        // The pdf can be swapped for a new issue, so only the viewer UI around it is asserted.
        // The wrapper is masked rather than the canvases: react-pdf keeps the next page mounted
        // past the visible edge, and Playwright merges flush masks into one that overshoots
        mask: [page.locator(`.magazine-pdf-view__slider-wrapper`)],
      });
    });
  }

  test.describe(`ShowVersionSwitcherOpenTests`, () => {
    const breakpoints = BREAKPOINTS.filter((breakpoint) => breakpoint.breakpoint === Breakpoint.MOBILE
      || breakpoint.breakpoint === Breakpoint.DESKTOP_XL);

    for (const {
      name,
      breakpoint,
      breakpointName,
    } of breakpoints) {
      test(name, async ({
        page,
        setViewportSize,
      }) => {
        await setViewportSize({
          width: breakpoint,
        });

        await page.getByTestId(`magazine-pdf-version-switcher-trigger`)
          .click();

        // `mask` won't do here: it paints an overlay with a forced top-most z-index regardless
        // of real stacking order, so it would blank out the open dropdown too, since that visually
        // sits on top of the pdf area it's meant to mask. Hiding the pdf at the source instead of
        // overlaying it sidesteps that - the dropdown, a separate element, stays visible on top
        // of whatever's left behind (the wrapper's own background)
        await page.addStyleTag({
          content: `.magazine-pdf-view__slider-wrapper { visibility: hidden !important; }`,
        });

        await expect(page.getByTestId(TEST_ID)
          .filter({
            visible: true,
          }))
          .toHaveScreenshot(`${TEST_ID}-switcher-open-${breakpointName}.png`);
      });
    }
  });
});

test.describe(`MagazinePdfViewTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(TEST_ID);
  });

  test(
    `
    GIVEN rendering MagazinePdfView
    WHEN its arrows are rendered
    THEN they have correct aria-labels
    `,
    magazinePdfViewArrowAriaLabelTests,
  );

  test(
    `
    GIVEN rendering MagazinePdfView
    WHEN user clicks by next page button and then by previous page button
    THEN counter is changed to the next page number and then back to the previous one
    `,
    counterOfPagesTests,
  );

  test(
    `
    GIVEN rendering MagazinePdfView
    WHEN user clicks by fullscreen button and then by the same button again
    THEN viewer is changed to fullscreen and then back to the normal view
    `,
    fullScreenTests,
  );
});

test.describe(`MagazinePdfVersionSwitcherTests`, () => {
  test(
    `
    GIVEN the magazine page is opened with no ?version=query param
    WHEN MagazinePdfView renders
    THEN the version switcher trigger shows the full version as selected
    `,
    showsFullVersionByDefaultTests,
  );

  test(
    `
    GIVEN the magazine page is opened with ?version=teaser
    WHEN MagazinePdfView renders
    THEN the version switcher trigger shows the teaser as selected
    `,
    showsTeaserFromQueryParamTests,
  );

  test(
    `
    GIVEN the magazine page is opened with an invalid ?version=value
    WHEN MagazinePdfView renders
    THEN the full version is shown and the invalid query param is stripped from the URL
    `,
    redirectsInvalidVersionParamTests,
  );

  test(
    `
    GIVEN the version switcher is closed
    WHEN the user clicks the trigger
    THEN the dropdown list opens showing both versions, with the current one marked selected
    `,
    opensDropdownTests,
  );

  test(
    `
    GIVEN the version switcher dropdown is open
    WHEN the user clicks outside of it
    THEN the dropdown closes
    `,
    closesDropdownOnOutsideClickTests,
  );

  test(
    `
    GIVEN the full version is selected (the default, no ?version= in the URL)
    WHEN the user opens the switcher and picks the teaser
    THEN the trigger updates, the dropdown closes and ?version=teaser is added to the URL
    `,
    switchesToTeaserTests,
  );

  test(
    `
    GIVEN the teaser is selected (?version=teaser in the URL)
    WHEN the user opens the switcher and picks the full version (the default)
    THEN ?version is removed from the URL entirely
    `,
    switchesBackToFullTests,
  );

  test(
    `
    GIVEN the viewer is on a viewport where the pdf, header and toolbar together are taller than the screen
    WHEN the user enters fullscreen
    THEN the whole block still fits the screen (no overflow) with an equal margin top and bottom
    `,
    fitsFullscreenWithoutOverflowTests,
  );

  test(
    `
    GIVEN the user has moved off the first page of the current version
    WHEN they switch to the other version
    THEN the actual pdf file is swapped and the counter resets to that file's own first page
    `,
    resetsToFirstPageOnVersionSwitchTests,
  );

  test(
    `
    GIVEN the user has not moved off the first page of the current version
    WHEN they switch to the other version
    THEN the counter shows a valid first-page reading for the new file, not a negative one
    `,
    switchingFromFirstPageKeepsCounterValidTests,
  );
});

async function magazinePdfViewArrowAriaLabelTests({
  page,
}: {
  page: Page;
}) {
  await expect(page.getByTestId(`magazine-pdf-view-next-arrow`))
    .toHaveAttribute(`aria-label`, `Следующий разворот`);

  await expect(page.getByTestId(`magazine-pdf-view-prev-arrow`))
    .toHaveAttribute(`aria-label`, `Предыдущий разворот`);
}

async function counterOfPagesTests({
  page,
}: {
  page: Page;
}) {
  const magazinePdfCounter = page.getByTestId(`magazine-pdf-counter`);
  await expect(magazinePdfCounter)
    .toHaveText(/1.2 \/ 40/);

  await page.getByTestId(`magazine-pdf-view-next-arrow`)
    .click();

  await expect(magazinePdfCounter)
    .toHaveText(/2.3 \/ 40/);

  const prevArrowButton = page.getByTestId(`magazine-pdf-view-prev-arrow`);

  await page.waitForTimeout(500);

  await prevArrowButton
    .click();

  await expect(magazinePdfCounter)
    .toHaveText(/1.2 \/ 40/);
}

async function fullScreenTests({
  page,
}: {
  page: Page;
}) {
  await stubFullscreenApi(page);

  const fullscreenButton = page.getByTestId(`magazine-pdf-fullscreen-button`);

  await expect(fullscreenButton)
    .toHaveAttribute(`aria-label`, `Развернуть журнал на весь экран`);

  await expect(fullscreenButton)
    .toHaveText(`На весь экран`);

  await fullscreenButton
    .click();

  await expect
    .poll(() => getFullscreenCalls(page))
    .toEqual({
      request: 1,
      exit: 0,
    });

  await setFullscreenElement(page, ComponentName.MAGAZINE_PDF_VIEW);

  await expect(fullscreenButton)
    .toHaveAttribute(`aria-label`, `Свернуть журнал`);

  await expect(fullscreenButton)
    .toHaveText(`Свернуть`);

  await fullscreenButton
    .click();

  await expect
    .poll(() => getFullscreenCalls(page))
    .toEqual({
      request: 1,
      exit: 1,
    });

  await setFullscreenElement(page, null);

  await expect(fullscreenButton)
    .toHaveAttribute(`aria-label`, `Развернуть журнал на весь экран`);

  await expect(fullscreenButton)
    .toHaveText(`На весь экран`);
}

function getFullscreenCalls(page: Page) {
  return page.evaluate(() => (window as unknown as {
    __fullscreenCalls: {
      request: number;
      exit: number;
    };
  }).__fullscreenCalls);
}

function stubFullscreenApi(page: Page) {
  return page.evaluate(() => {
    Object.defineProperty(document, `fullscreenElement`, {
      configurable: true,
      writable: true,
      value: null,
    });

    (window as unknown as {
      __fullscreenCalls: {
        request: number;
        exit: number;
      };
    }).__fullscreenCalls = {
      request: 0,
      exit: 0,
    };

    Element.prototype.requestFullscreen = function requestFullscreen() {
      (window as unknown as {
        __fullscreenCalls: {
          request: number;
          exit: number;
        };
      }).__fullscreenCalls.request += 1;

      return Promise.resolve();
    };

    document.exitFullscreen = function exitFullscreen() {
      (window as unknown as {
        __fullscreenCalls: {
          request: number;
          exit: number;
        };
      }).__fullscreenCalls.exit += 1;

      return Promise.resolve();
    };
  });
}

function setFullscreenElement(page: Page, targetId: string | null) {
  return page.evaluate((id) => {
    (document as unknown as {
      fullscreenElement: Element | null;
    }).fullscreenElement = id
      ? document.getElementById(id)
      : null;

    document.dispatchEvent(new Event(`fullscreenchange`));
  }, targetId);
}

async function showsFullVersionByDefaultTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(TEST_ID);

  await expect(page.getByTestId(`magazine-pdf-version-switcher-trigger`))
    .toHaveText(`Полная версия · 40 стр.`);
}

async function showsTeaserFromQueryParamTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(`${TEST_ID}?version=teaser`);

  await expect(page.getByTestId(`magazine-pdf-version-switcher-trigger`))
    .toHaveText(`Тизер · 20 стр.`);
}

async function redirectsInvalidVersionParamTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(`${TEST_ID}?version=какая-то-ерунда`);

  await expect(page.getByTestId(`magazine-pdf-version-switcher-trigger`))
    .toHaveText(`Полная версия · 40 стр.`);

  await expect(page)
    .toHaveURL(/\/components\/magazine-pdf-view$/);
}

async function opensDropdownTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(TEST_ID);

  await page.getByTestId(`magazine-pdf-version-switcher-trigger`)
    .click();

  await expect(page.getByTestId(`magazine-pdf-version-switcher-option-teaser`))
    .toBeVisible();

  await expect(page.getByTestId(`magazine-pdf-version-switcher-option-full`))
    .toHaveAttribute(`aria-selected`, `true`);
}

async function closesDropdownOnOutsideClickTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(TEST_ID);

  const trigger = page.getByTestId(`magazine-pdf-version-switcher-trigger`);

  await trigger.click();

  await expect(page.getByTestId(`magazine-pdf-version-switcher-option-teaser`))
    .toBeVisible();

  await page.mouse.click(10, 10);

  await expect(trigger)
    .toHaveAttribute(`aria-expanded`, `false`);
}

async function switchesToTeaserTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(TEST_ID);

  await page.getByTestId(`magazine-pdf-version-switcher-trigger`)
    .click();

  await page.getByTestId(`magazine-pdf-version-switcher-option-teaser`)
    .click();

  await expect(page.getByTestId(`magazine-pdf-version-switcher-trigger`))
    .toHaveText(`Тизер · 20 стр.`);

  await expect(page.getByTestId(`magazine-pdf-version-switcher-trigger`))
    .toHaveAttribute(`aria-expanded`, `false`);

  await expect(page)
    .toHaveURL(/[?&]version=teaser(&|$)/);
}

async function switchesBackToFullTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(`${TEST_ID}?version=teaser`);

  await page.getByTestId(`magazine-pdf-version-switcher-trigger`)
    .click();

  await page.getByTestId(`magazine-pdf-version-switcher-option-full`)
    .click();

  await expect(page.getByTestId(`magazine-pdf-version-switcher-trigger`))
    .toHaveText(`Полная версия · 40 стр.`);

  await expect(page)
    .toHaveURL(/\/components\/magazine-pdf-view$/);
}

async function fitsFullscreenWithoutOverflowTests({
  page,
  goToComponentsPage,
  setViewportSize,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
  setViewportSize: CustomTestFixtures[`setViewportSize`];
}) {
  // Set before navigating, not after: the wrapper's ResizeObserver then only ever has one
  // size to settle on (the page's very first layout), instead of an old-to-new transition
  // whose end we'd otherwise have to wait for with no element/attribute to assert on
  await setViewportSize({
    width: 1440,
    height: 900,
  });

  await goToComponentsPage(TEST_ID);
  await page.waitForSelector(`[data-testid="${TEST_ID}"] canvas`);

  await page.getByTestId(`magazine-pdf-fullscreen-button`)
    .click();

  await expect
    .poll(() => page.evaluate(() => document.fullscreenElement?.id))
    .toBe(TEST_ID);

  // Polls (Playwright's own retry mechanism, not a fixed sleep) until both the fullscreen
  // request and the ResizeObserver-driven relayout it triggers have actually landed
  await expect
    .poll(async () => {
      const {
        viewHeight,
        topMargin,
        bottomMargin,
      } = await readFullscreenGeometry(page, TEST_ID);

      return viewHeight > 0
        && bottomMargin >= 0
        && Math.abs(topMargin - bottomMargin) <= 2;
    })
    .toBe(true);

  const {
    topMargin,
  } = await readFullscreenGeometry(page, TEST_ID);

  // The margin should be roughly the wrapper's own padding (44px at this breakpoint), not a
  // leftover reservation for the sticky site header (68.2px) that doesn't exist in fullscreen
  expect(topMargin)
    .toBeLessThanOrEqual(50);
}

function readFullscreenGeometry(page: Page, testId: string) {
  return page.evaluate((id) => {
    const view = document.getElementById(id)!;
    const header = view.querySelector(`.magazine-pdf-view__header`)!;
    const toolbar = view.querySelector(`.magazine-pdf-view__toolbar`)!;

    return {
      viewHeight: view.getBoundingClientRect().height,
      topMargin: header.getBoundingClientRect().top,
      bottomMargin: view.getBoundingClientRect().height - toolbar.getBoundingClientRect().bottom,
    };
  }, testId);
}

async function resetsToFirstPageOnVersionSwitchTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(TEST_ID);
  await page.waitForSelector(`[data-testid="${TEST_ID}"] canvas`);

  const counter = page.getByTestId(`magazine-pdf-counter`);

  await expect(counter)
    .toHaveText(/\/ 40$/);

  await page.getByTestId(`magazine-pdf-view-next-arrow`)
    .click();

  await expect(counter)
    .toHaveText(/^2/);

  await page.getByTestId(`magazine-pdf-version-switcher-trigger`)
    .click();

  await page.getByTestId(`magazine-pdf-version-switcher-option-teaser`)
    .click();

  await expect(counter)
    .toHaveText(/^1.2 \/ 20/);
}

async function switchingFromFirstPageKeepsCounterValidTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(TEST_ID);
  await page.waitForSelector(`[data-testid="${TEST_ID}"] canvas`);

  await page.getByTestId(`magazine-pdf-version-switcher-trigger`)
    .click();

  await page.getByTestId(`magazine-pdf-version-switcher-option-teaser`)
    .click();

  await expect(page.getByTestId(`magazine-pdf-counter`))
    .toHaveText(`1–2 / 20`);
}
