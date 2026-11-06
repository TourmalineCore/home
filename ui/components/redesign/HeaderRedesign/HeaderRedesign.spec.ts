import fs from 'fs';
import { test, expect } from '@playwright/test';
import { Breakpoint } from '../../../common/enums';
import headerTranslationsRu from '../../../public/locales/ru/headerRedesign.json';

const TEST_ID = `header-redesign`;

const VIEWPORTS = [
  {
    name: `mobile`,
    width: Breakpoint.MOBILE,
    height: 80,
  },
  {
    name: `tablet`,
    width: Breakpoint.TABLET,
    height: 80,
  },
  {
    name: `tablet-xl`,
    width: Breakpoint.TABLET_XL,
    height: 80,
  },
  {
    name: `desktop`,
    width: Breakpoint.DESKTOP,
    height: 88,
  },
  {
    name: `desktop-xl`,
    width: Breakpoint.DESKTOP_XL,
    height: 158,
  },
];

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

      await mount(`HeaderRedesignStory`, {
        ...headerTranslationsRu,
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

  // test.describe(`ShowSubmenuTests`, () => {
  //   const breakpoints = BREAKPOINTS.filter((breakpoint) => breakpoint.breakpoint === Breakpoint.DESKTOP_XL);

  //   for (const {
  //     name,
  //     breakpoint,
  //     breakpointName,
  //   } of breakpoints) {
  //     test(name, async ({
  //       page,
  //       setViewportSize,
  //       goToComponentsPage,
  //     }: {
  //       page: Page;
  //       setViewportSize: CustomTestFixtures["setViewportSize"];
  //       goToComponentsPage: CustomTestFixtures["goToComponentsPage"];
  //     }) => {
  //       await goToComponentsPage(ComponentName.HEADER);

  //       await setViewportSize({
  //         width: breakpoint,
  //       });

  //       await page.getByTestId(`header-accordion`)
  //         .first()
  //         .hover();

  //       await page.getByTestId(`header-redesign`)
  //         .evaluate((el) => {
  //           el.style.paddingBottom = `400px`;
  //         });

  //       await expect(page.getByTestId(`header-redesign`))
  //         .toHaveScreenshot(`${TEST_ID}-submenu-${breakpointName}.png`);
  //     });
  //   }
  // });
  // test.describe(`Scroll behavior on page interactions`, () => {
  //   const testCases = [
  //     {
  //       breakpointName: BreakpointName.DESKTOP,
  //       breakpoint: Breakpoint.DESKTOP,
  //     },
  //     {
  //       breakpointName: BreakpointName.MOBILE,
  //       breakpoint: Breakpoint.MOBILE,
  //     },
  //   ];

  //   for (const {
  //     breakpointName,
  //     breakpoint,
  //   } of testCases) {
  //     test(`
  //       GIVEN page in ${breakpointName} breakpoint
  //       AND the page has been scrolled away from the top
  //       WHEN the user opens the burger menu, expands a section, and taps a link to another page
  //       THEN after the redirect the new page opens scrolled to the top
  //     `, async ({
  //       page,
  //       goto,
  //       setViewportSize,
  //     }: {
  //       page: Page;
  //       goto: CustomTestFixtures['goto'];
  //       setViewportSize: CustomTestFixtures["setViewportSize"];
  //     }) => {
  //       await goto(`/ru`);

  //       await setViewportSize({
  //         width: breakpoint,
  //       });

  //       await scrollAwayFromTop({
  //         page,
  //       });

  //       const currentUrl = page.url();

  //       if (breakpoint === Breakpoint.MOBILE) {
  //         await page
  //           .getByTestId(`header-redesign-burger`)
  //           .click();
  //       }

  //       await page
  //         .getByTestId(`header-accordion-button`)
  //         .filter({
  //           visible: true,
  //         })
  //         .first()
  //         .click();

  //       await page
  //         .getByText(`UI/UX дизайн`)
  //         .filter({
  //           visible: true,
  //         })
  //         .first()
  //         .click();

  //       await page.waitForURL((url) => url.toString() !== currentUrl, {
  //         waitUntil: `networkidle`,
  //       });

  //       await page.getByText(`UX/UI design`)
  //         .waitFor({
  //           state: `visible`,
  //         });

  //       await expect(await getScrollY({
  //         page,
  //       }))
  //         .toBe(0);
  //     });
  //   }

  //   test(`
  //     GIVEN page has been scrolled away from the top
  //     WHEN a modal is opened and closed without navigating to a new page
  //     THEN the scroll is restored to its previous value
  //   `, async ({
  //     browser,
  //   }: {
  //     browser: Browser;
  //   }) => {
  //     // Set Russian coordinates so that the form is displayed
  //     const context = await browser.newContext({
  //       permissions: [`geolocation`],
  //       geolocation: {
  //         latitude: 61.5240,
  //         longitude: 105.3188,
  //       },
  //     });

  //     const page = await context.newPage();

  //     await page.setViewportSize({
  //       width: Breakpoint.DESKTOP,
  //       height: 768,
  //     });

  //     await page.goto(`/ru`);

  //     const scrollBeforeModal = await scrollAwayFromTop({
  //       page,
  //     });

  //     await page
  //       .getByTestId(`header-contact-button`)
  //       .filter({
  //         visible: true,
  //       })
  //       .click();

  //     await page.waitForTimeout(100);

  //     await page.keyboard.press(`Escape`);

  //     await expect(await getScrollY({
  //       page,
  //     }))
  //       .toBe(scrollBeforeModal);
  //   });
  // });
});

test.describe(`ShowLangTooltipTests`, () => {
  test(`Mobile`, async ({
    page,
    mount,
  }) => {
    await page.setViewportSize({
      width: Breakpoint.MOBILE,
      height: 768,
    });

    await mount(`HeaderRedesignStory`, {
      ...headerTranslationsRu,
    });

    await page
      .getByTestId(`lang-switch`)
      .click();

    await expect(page
      .getByText(`EN`)
      .filter({
        visible: true,
      }))
      .toBeVisible();
  });

  test(`Desktop`, async ({
    page,
    mount,
  }) => {
    await page.setViewportSize({
      width: Breakpoint.DESKTOP_XL,
      height: 768,
    });

    await mount(`HeaderRedesignStory`, {
      ...headerTranslationsRu,
    });

    await page
      .getByTestId(`lang-switch`)
      .hover();

    await expect(page.getByText(`EN`)
      .filter({
        visible: true,
      }))
      .toBeVisible();
  });
});

// async function getScrollY({
//   page,
// }: {
//   page: Page;
// }) {
//   return page.evaluate(() => window.scrollY);
// }

// async function scrollAwayFromTop({
//   page,
// }: {
//   page: Page;
// }) {
//   await expect(await getScrollY({
//     page,
//   }))
//     .toBe(0);

//   // Scroll down to hide the header, then scroll up slightly to make it reappear
//   await page.mouse.wheel(0, 1000);
//   await page.mouse.wheel(0, -200);
//   await page.waitForTimeout(100);

//   const currentScroll = await getScrollY({
//     page,
//   });

//   await expect(currentScroll)
//     .not
//     .toBe(0);

//   return currentScroll;
// }
