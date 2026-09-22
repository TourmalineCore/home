import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from '../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../playwright-tests/constants/breakpoints';
import { Breakpoint, ComponentName } from '../../../common/enums';

const TEST_ID = ComponentName.MAGAZINE_PDF_VIEW;

// The same tablet held one way and then the other: upright there's room for a single page at a
// time, landscape for two side by side
const TABLET_UPRIGHT = {
  width: Breakpoint.TABLET,
  height: 1024,
};
const TABLET_LANDSCAPE = {
  width: Breakpoint.TABLET_XL,
  height: 768,
};

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

  test.describe(`FullscreenTests`, () => {
    for (const {
      name,
      breakpoint,
      breakpointName,
    } of BREAKPOINTS) {
      test(name, async ({
        page,
        setViewportSize,
      }) => {
        await setViewportSize({
          width: breakpoint,
        });

        // useFullscreen's css fallback (see its iPhone Safari branch) lays the viewer out exactly
        // like the real Fullscreen API does, and unlike it leaves no fullscreen browser window
        // behind for the tests that follow
        await page.evaluate(() => {
          Reflect.deleteProperty(Element.prototype, `requestFullscreen`);
        });

        await page.getByTestId(`magazine-pdf-fullscreen-button`)
          .click();

        await expect(page.getByTestId(TEST_ID)
          .filter({
            visible: true,
          }))
          .toHaveScreenshot(`${TEST_ID}-fullscreen-${breakpointName}.png`, {
            mask: [page.locator(`.magazine-pdf-view__slider-wrapper`)],
          });
      });
    }
  });
});

test.describe(`MagazinePdfViewTests`, () => {
  test.beforeEach(async ({
    page,
    goToComponentsPage,
  }) => {
    await goToComponentsPage(TEST_ID);

    // The arrows and the slider appear only once the pdf is parsed, long after the page
    // itself goes quiet
    await page.waitForSelector(`[data-testid="${TEST_ID}"] canvas`);
  });

  test(
    `
    GIVEN rendering MagazinePdfView
    WHEN its arrows are rendered on the first slide
    THEN they have correct aria-labels, and only the prev one is aria-disabled
    `,
    magazinePdfViewArrowAriaTests,
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

  test(
    `
    GIVEN rendering MagazinePdfView
    WHEN user enters fullscreen, turns a page with the arrow key and then leaves fullscreen
    THEN the magazine takes focus on entering, the page turns, and focus returns to the fullscreen button on leaving
    `,
    fullscreenFocusTests,
  );

  test(
    `
    GIVEN rendering MagazinePdfView
    WHEN user moves through it with Tab
    THEN focus follows the on-screen order: switcher, prev arrow, magazine, next arrow, fullscreen button
    `,
    tabOrderTests,
  );

  test(
    `
    GIVEN a magazine whose first page has a link
    WHEN user turns past that page and tabs out of the magazine
    THEN focus skips the link on the hidden page and moves to the next arrow
    `,
    hiddenPageLinksAreNotTabbableTests,
  );
});

test.describe(`MagazinePdfViewSlideTests`, () => {
  test(
    `
    GIVEN a viewport wide enough to show two pages side by side
    WHEN the reader opens the magazine and turns its first page
    THEN that page is shown on its own, like the cover of a real one, and the ones after it in pairs
    `,
    showsCoverAloneThenPairsTests,
  );

  test(
    `
    GIVEN a viewport wide enough to show two pages side by side
    WHEN the reader pages through to the end of the magazine
    THEN its last page is shown on its own, like the back cover of a real one, with nowhere left to go
    `,
    showsLastPageAloneTests,
  );

  test(
    `
    GIVEN a tablet held landscape, with the reader a few pages into the magazine
    WHEN they turn it upright, leaving no room for two pages side by side
    THEN the first page of the spread they were reading stays on screen, now on its own
    `,
    keepsFirstPageOfSpreadOnRotatingUprightTests,
  );

  test(
    `
    GIVEN a tablet held upright, with the reader past the middle of the magazine
    WHEN they turn it landscape, where the pages they've read take up fewer slides
    THEN the page they were reading stays on screen, rather than the end of the magazine
    `,
    keepsPagePastTheMiddleOnRotatingLandscapeTests,
  );
});

test.describe(`MagazinePdfViewSlideOnRetinaTests`, () => {
  // Pages are drawn at the screen's own pixel density, and a page shown on its own has no
  // neighbour to size itself against - a combination that has gone wrong before
  test.use({
    deviceScaleFactor: 2,
  });

  test(
    `
    GIVEN a screen with a higher pixel density, on a viewport wide enough for two pages
    WHEN the reader compares the cover with a pair of pages from inside the magazine
    THEN the page shown on its own is drawn at the very same size as the paired ones
    `,
    showsFirstPageAtTheSameSizeAsPairedOnesTests,
  );
});

async function magazinePdfViewArrowAriaTests({
  page,
}: {
  page: Page;
}) {
  const nextArrow = page.getByTestId(`magazine-pdf-view-next-arrow`);
  const prevArrow = page.getByTestId(`magazine-pdf-view-prev-arrow`);

  await expect(nextArrow)
    .toHaveAttribute(`aria-label`, `Следующий разворот`);

  await expect(nextArrow)
    .toHaveAttribute(`aria-disabled`, `false`);

  await expect(prevArrow)
    .toHaveAttribute(`aria-label`, `Предыдущий разворот`);

  await expect(prevArrow)
    .toHaveAttribute(`aria-disabled`, `true`);
}

async function counterOfPagesTests({
  page,
}: {
  page: Page;
}) {
  const magazinePdfCounter = page.getByTestId(`magazine-pdf-counter`);
  await expect(magazinePdfCounter)
    .toHaveText(/^1 \/ 40/);

  await page.getByTestId(`magazine-pdf-view-next-arrow`)
    .click();

  await expect(magazinePdfCounter)
    .toHaveText(/2.3 \/ 40/);

  const prevArrowButton = page.getByTestId(`magazine-pdf-view-prev-arrow`);

  await page.waitForTimeout(500);

  await prevArrowButton
    .click();

  await expect(magazinePdfCounter)
    .toHaveText(/^1 \/ 40/);
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

async function fullscreenFocusTests({
  page,
}: {
  page: Page;
}) {
  await stubFullscreenApi(page);

  const fullscreenButton = page.getByTestId(`magazine-pdf-fullscreen-button`);
  const magazine = page.getByTestId(`magazine-pdf-view-slider-wrapper`);
  const counter = page.getByTestId(`magazine-pdf-counter`);

  await fullscreenButton.click();
  await setFullscreenElement(page, ComponentName.MAGAZINE_PDF_VIEW);

  await expect(magazine)
    .toBeFocused();

  await expect(counter)
    .toHaveText(/^1 \//);

  await page.keyboard.press(`ArrowRight`);

  await expect(counter)
    .toHaveText(/^2.3 \//);

  // Stands in for Esc or the browser's own UI, which only report the exit via fullscreenchange
  await setFullscreenElement(page, null);

  await expect(fullscreenButton)
    .toBeFocused();
}

async function tabOrderTests({
  page,
}: {
  page: Page;
}) {
  await page.getByTestId(`magazine-pdf-version-switcher-trigger`)
    .focus();

  await expectTabMovesTo({
    page,
    testId: `magazine-pdf-view-prev-arrow`,
  });
  await expectTabMovesTo({
    page,
    testId: `magazine-pdf-view-slider-wrapper`,
  });
  await expectTabMovesTo({
    page,
    testId: `magazine-pdf-view-next-arrow`,
  });
  await expectTabMovesTo({
    page,
    testId: `magazine-pdf-fullscreen-button`,
  });
}

async function expectTabMovesTo({
  page,
  testId,
}: {
  page: Page;
  testId: string;
}) {
  await page.keyboard.press(`Tab`);

  await expect(page.getByTestId(testId))
    .toBeFocused();
}

async function hiddenPageLinksAreNotTabbableTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  // Stub instead of the real issue, whose content changes: only its first page has a link
  await page.route(`**/*.pdf`, (route) => route.fulfill({
    path: `./playwright-tests/fixtures/stub.pdf`,
  }));
  await goToComponentsPage(TEST_ID);

  const magazine = page.getByTestId(`magazine-pdf-view-slider-wrapper`);
  const nextArrow = page.getByTestId(`magazine-pdf-view-next-arrow`);

  await expect(magazine.getByRole(`link`))
    .toBeVisible();

  await nextArrow.click();

  await magazine.focus();
  await page.keyboard.press(`Tab`);

  await expect(nextArrow)
    .toBeFocused();
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

async function showsCoverAloneThenPairsTests({
  page,
  goToComponentsPage,
  setViewportSize,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
  setViewportSize: CustomTestFixtures[`setViewportSize`];
}) {
  await openMagazineAt({
    page,
    goToComponentsPage,
    setViewportSize,
    width: Breakpoint.DESKTOP,
  });

  await expectPagesOnScreen(page, {
    count: 1,
    areCentred: true,
  });

  await expect(page.getByTestId(`magazine-pdf-counter`))
    .toHaveText(`1 / 40`);

  await page.getByTestId(`magazine-pdf-view-next-arrow`)
    .click();

  await expect(page.getByTestId(`magazine-pdf-counter`))
    .toHaveText(`2–3 / 40`);

  await expectPagesOnScreen(page, {
    count: 2,
    areCentred: true,
  });
}

async function showsLastPageAloneTests({
  page,
  goToComponentsPage,
  setViewportSize,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
  setViewportSize: CustomTestFixtures[`setViewportSize`];
}) {
  // The teaser rather than the full version: same behaviour at the end of the file, half the
  // pages to walk through to get there
  await openMagazineAt({
    page,
    goToComponentsPage,
    setViewportSize,
    width: Breakpoint.DESKTOP,
    path: `${TEST_ID}?version=teaser`,
  });

  await pageToTheEnd(page);

  await expectPagesOnScreen(page, {
    count: 1,
    areCentred: true,
  });

  await expect(page.getByTestId(`magazine-pdf-counter`))
    .toHaveText(`20 / 20`);

  await expect(page.getByTestId(`magazine-pdf-view-next-arrow`))
    .toHaveAttribute(`aria-disabled`, `true`);
}

async function showsFirstPageAtTheSameSizeAsPairedOnesTests({
  page,
  goToComponentsPage,
  setViewportSize,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
  setViewportSize: CustomTestFixtures[`setViewportSize`];
}) {
  await openMagazineAt({
    page,
    goToComponentsPage,
    setViewportSize,
    width: Breakpoint.DESKTOP,
  });

  await expectPagesOnScreen(page, {
    count: 1,
    areCentred: true,
  });

  const coverSize = await readPageSizeOnScreen(page);

  await page.getByTestId(`magazine-pdf-view-next-arrow`)
    .click();

  await expectPagesOnScreen(page, {
    count: 2,
    areCentred: true,
  });

  expect(coverSize)
    .toEqual(await readPageSizeOnScreen(page));
}

async function keepsFirstPageOfSpreadOnRotatingUprightTests({
  page,
  goToComponentsPage,
  setViewportSize,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
  setViewportSize: CustomTestFixtures[`setViewportSize`];
}) {
  await openMagazineAt({
    page,
    goToComponentsPage,
    setViewportSize,
    ...TABLET_LANDSCAPE,
  });

  // Past the cover and the pair after it
  await turnPages(page, 2);

  await expect(page.getByTestId(`magazine-pdf-counter`))
    .toHaveText(`4–5 / 40`);

  await setViewportSize(TABLET_UPRIGHT);

  await expectPageNumbersOnScreen(page, [4]);
}

async function keepsPagePastTheMiddleOnRotatingLandscapeTests({
  page,
  goToComponentsPage,
  setViewportSize,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
  setViewportSize: CustomTestFixtures[`setViewportSize`];
}) {
  // The teaser rather than the full version: same behaviour past the middle, half the pages to
  // walk through to get there
  await openMagazineAt({
    page,
    goToComponentsPage,
    setViewportSize,
    ...TABLET_UPRIGHT,
    path: `${TEST_ID}?version=teaser`,
  });

  // Past the middle: one page at a time, that's further along than the last of the paired slides
  await turnPages(page, 11);

  await expect(page.getByTestId(`magazine-pdf-counter`))
    .toHaveText(`12 / 20`);

  await setViewportSize(TABLET_LANDSCAPE);

  await expectPageNumbersOnScreen(page, [12, 13]);
}

async function turnPages(page: Page, turns: number) {
  const nextArrow = page.getByTestId(`magazine-pdf-view-next-arrow`);

  for (let turn = 0; turn < turns; turn += 1) {
    // eslint-disable-next-line no-await-in-loop
    await nextArrow.click();

    // The slider drops a turn asked for while the previous one is still animating
    // eslint-disable-next-line no-await-in-loop
    await page.waitForTimeout(600);
  }
}

async function openMagazineAt({
  page,
  goToComponentsPage,
  setViewportSize,
  width,
  height = 900,
  path = TEST_ID,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
  setViewportSize: CustomTestFixtures[`setViewportSize`];
  width: number;
  height?: number;
  path?: string;
}) {
  // Sized before navigating, so the wrapper's ResizeObserver only ever settles on one width and
  // the pages aren't re-measured underneath the assertions below
  await setViewportSize({
    width,
    height,
  });

  await goToComponentsPage(path);

  await page.waitForSelector(`[data-testid="${TEST_ID}"] canvas`);
}

async function pageToTheEnd(page: Page) {
  const nextArrow = page.getByTestId(`magazine-pdf-view-next-arrow`);

  // Bounded so a viewer that never reaches its last page fails the assertion below instead of
  // spinning here. The teaser is 20 pages, far fewer turns than that even one page at a time
  for (let turn = 0; turn < 25; turn += 1) {
    // eslint-disable-next-line no-await-in-loop
    const hasNextSlide = await nextArrow.evaluate(
      // The arrow marks itself once there's nowhere left to go, and the styles make it unclickable
      (element) => !element.classList.contains(`slick-disabled`),
    );

    if (!hasNextSlide) {
      return;
    }

    // eslint-disable-next-line no-await-in-loop
    await nextArrow.click();

    // The slider drops a turn asked for while the previous one is still animating
    // eslint-disable-next-line no-await-in-loop
    await page.waitForTimeout(600);
  }
}

function expectPagesOnScreen(page: Page, expected: {
  count: number;
  areCentred: boolean;
}) {
  // Polled: the counter updates as soon as the turn starts, while the pages themselves are
  // still sliding into place
  return expect
    .poll(async () => {
      const pagesOnScreen = await readPagesOnScreen(page);

      return {
        count: pagesOnScreen.length,
        areCentred: areCentredInViewer(pagesOnScreen),
      };
    })
    .toEqual(expected);
}

async function readPageSizeOnScreen(page: Page) {
  const [firstPage] = await readPagesOnScreen(page);

  return {
    width: Math.round(firstPage.width),
    height: Math.round(firstPage.height),
  };
}

// Which pages of the pdf are the ones on screen, in the order they're laid out in
function expectPageNumbersOnScreen(page: Page, expected: number[]) {
  // Polled, as in expectPagesOnScreen above
  return expect
    .poll(async () => {
      const pagesOnScreen = await readPagesOnScreen(page);

      return pagesOnScreen.map((pageBox) => pageBox.pageNumber);
    })
    .toEqual(expected);
}

// The pages on screen, as plain boxes to assert against, each carrying the centre of the
// viewer they sit in
function readPagesOnScreen(page: Page) {
  return page.evaluate(() => {
    const viewer = document.querySelector<HTMLElement>(`.magazine-pdf-view__slider-wrapper`)!;
    const viewerRect = viewer.getBoundingClientRect();

    return Array.from(viewer.querySelectorAll(`canvas`))
      .map((canvas) => {
        const pageRect = canvas.getBoundingClientRect();

        return {
          pageNumber: Number(canvas.closest(`[data-page-number]`)
            ?.getAttribute(`data-page-number`)),
          left: pageRect.left,
          right: pageRect.right,
          width: pageRect.width,
          height: pageRect.height,
          viewerCentre: viewerRect.left + viewerRect.width / 2,
          // The neighbouring slides stay mounted just past the viewer's edges, so only the
          // pages actually inside it count as being on screen
          isOnScreen: pageRect.width > 0
            && pageRect.left >= viewerRect.left - 1
            && pageRect.right <= viewerRect.right + 1,
        };
      })
      .filter((pageBox) => pageBox.isOnScreen);
  });
}

function areCentredInViewer(pagesOnScreen: Awaited<ReturnType<typeof readPagesOnScreen>>) {
  if (pagesOnScreen.length === 0) {
    return false;
  }

  const left = Math.min(...pagesOnScreen.map((pageBox) => pageBox.left));
  const right = Math.max(...pagesOnScreen.map((pageBox) => pageBox.right));

  return Math.abs((left + right) / 2 - pagesOnScreen[0].viewerCentre) <= 2;
}
