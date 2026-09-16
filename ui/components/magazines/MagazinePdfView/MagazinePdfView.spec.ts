import { expect, Page, test } from '../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../playwright-tests/constants/breakpoints';
import { ComponentName } from '../../../common/enums';

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
    WHEN user clicks by fullscreen button
    THEN viewer is requested to go fullscreen and the button offers to leave it
    AND user clicks by the same button again
    THEN fullscreen is exited and the button offers to enter it again
    `,
    fullScreenTests,
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
    .toHaveText(/1.2 \/ 20/);

  await page.getByTestId(`magazine-pdf-view-next-arrow`)
    .click();

  await expect(magazinePdfCounter)
    .toHaveText(/2.3 \/ 20/);

  const prevArrowButton = page.getByTestId(`magazine-pdf-view-prev-arrow`);

  await page.waitForTimeout(500);

  await prevArrowButton
    .click();

  await expect(magazinePdfCounter)
    .toHaveText(/1.2 \/ 20/);
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
