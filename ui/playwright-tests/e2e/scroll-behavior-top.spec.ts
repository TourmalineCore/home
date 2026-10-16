import { Breakpoint } from "../../common/enums";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../custom-test";

test.describe(`Scroll to top after switching between pages`, scrollToTop);

async function scrollToTop() {
  test(`
    GIVEN frontend page
    WHEN user scrolls and clicks on a link to go to another page
    SHOULD return scroll to the top after redirect to another page
  `, async ({
    goto,
    page,
  }: {
    goto: CustomTestFixtures['goto'];
    page: Page;
  }) => {
    await goto(`/frontend`);

    await expect(await getScrollY({
      page,
    }))
      .toBe(0);

    const firstServicesTechnologyItem = await page.getByTestId(`services-technology-item`)
      .first();

    await firstServicesTechnologyItem
      .scrollIntoViewIfNeeded();

    await expect(await getScrollY({
      page,
    }))
      .not
      .toBe(0);

    const currentUrl = page.url();

    await firstServicesTechnologyItem.click();

    await page.waitForURL((url) => url.toString() !== currentUrl, {
      waitUntil: `networkidle`,
    });

    await page.getByText(`UX/UI design`)
      .waitFor({
        state: `visible`,
      });

    await expect(await getScrollY({
      page,
    }))
      .toBe(0);
  });

  test(`
    GIVEN frontend page in mobile resolution
    AND the page has been scrolled away from the top
    WHEN the user opens the burger menu, expands a section, and taps a link to another page
    THEN after the redirect the new page opens scrolled to the top
  `, async ({
    goto,
    setViewportSize,
    page,
  }: {
    goto: CustomTestFixtures['goto'];
    setViewportSize: CustomTestFixtures['setViewportSize'];
    page: Page;
  }) => {
    await setViewportSize({
      width: Breakpoint.MOBILE,
    });

    await goto(`/frontend`);

    await expect(await getScrollY({
      page,
    }))
      .toBe(0);

    const firstServicesTechnologyItem = await page.getByTestId(`services-technology-item`)
      .first();

    await firstServicesTechnologyItem
      .scrollIntoViewIfNeeded();

    await expect(await getScrollY({
      page,
    }))
      .not
      .toBe(0);

    const currentUrl = page.url();

    await page
      .getByTestId(`header-redesign-burger`)
      .click();

    await page
      .getByTestId(`header-accordion-button`)
      .filter({
        visible: true,
      })
      .first()
      .click();

    await page
      .getByText(`UI/UX design`)
      .filter({
        visible: true,
      })
      .first()
      .click();

    await page.waitForURL((url) => url.toString() !== currentUrl, {
      waitUntil: `networkidle`,
    });

    await page.getByText(`UX/UI design`)
      .waitFor({
        state: `visible`,
      });

    await expect(await getScrollY({
      page,
    }))
      .toBe(0);
  });
}

async function getScrollY({
  page,
}: {
  page: Page;
}) {
  return page.evaluate(() => window.scrollY);
}
