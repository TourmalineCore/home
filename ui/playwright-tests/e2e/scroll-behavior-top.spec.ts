import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../custom-test";

test.describe(`Scroll behavior top after switching between pages`, scrollBehaviorTop);

async function scrollBehaviorTop() {
  test(`
    GIVEN frontend page
    WHEN user scrolls and clicks on a link to go to another page
    SHOULD scroll should return to the top after redirect to another page
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
      waitUntil: `domcontentloaded`,
    });

    await page.waitForLoadState(`networkidle`);

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
