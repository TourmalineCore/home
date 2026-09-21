import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from '../../../../../playwright-tests/custom-test';
import { ComponentName } from '../../../../../common/enums';

const TEST_ID = ComponentName.MAGAZINE_PDF_VIEW;

test.describe(`MagazinePdfVersionSwitcherTests`, () => {
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
    WHEN the user clicks the trigger and then clicks outside of the dropdown
    THEN the dropdown opens showing both versions with the current one marked selected, and closes again
    `,
    opensAndClosesDropdownTests,
  );

  test(
    `
    GIVEN the full version is selected (the default, no ?version= in the URL) and the user has
    moved off its first page
    WHEN they open the switcher and pick the teaser
    THEN the trigger updates, the dropdown closes, ?version=teaser is added to the URL and the
    pdf file is swapped for one the counter reads as its own first page, not a negative one
    `,
    switchesToTeaserTests,
  );

  test(
    `
    GIVEN the teaser is selected (?version=teaser in the URL)
    WHEN the user opens the switcher and picks the full version (the default)
    THEN the trigger updates and ?version is removed from the URL entirely
    `,
    switchesBackToFullTests,
  );
});

async function redirectsInvalidVersionParamTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(`${TEST_ID}?version=notValidVersion`);

  await expect(page.getByTestId(`magazine-pdf-version-switcher-trigger`))
    .toHaveText(`Полная версия · 40 стр.`);

  await expect(page)
    .toHaveURL(/\/components\/magazine-pdf-view$/);
}

async function opensAndClosesDropdownTests({
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

  await expect(page.getByTestId(`magazine-pdf-version-switcher-option-full`))
    .toHaveAttribute(`aria-selected`, `true`);

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

  // The counter reads the pdf itself, so it only settles once the file is parsed
  await page.waitForSelector(`[data-testid="${TEST_ID}"] canvas`);

  const trigger = page.getByTestId(`magazine-pdf-version-switcher-trigger`);
  const counter = page.getByTestId(`magazine-pdf-counter`);

  await expect(trigger)
    .toHaveText(`Полная версия · 40 стр.`);

  await page.getByTestId(`magazine-pdf-view-next-arrow`)
    .click();

  await expect(counter)
    .toHaveText(/^2/);

  await trigger.click();

  await page.getByTestId(`magazine-pdf-version-switcher-option-teaser`)
    .click();

  await expect(trigger)
    .toHaveText(`Тизер · 20 стр.`);

  await expect(trigger)
    .toHaveAttribute(`aria-expanded`, `false`);

  await expect(page)
    .toHaveURL(/[?&]version=teaser(&|$)/);

  await expect(counter)
    .toHaveText(`1 / 20`);
}

async function switchesBackToFullTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(`${TEST_ID}?version=teaser`);

  const trigger = page.getByTestId(`magazine-pdf-version-switcher-trigger`);

  await expect(trigger)
    .toHaveText(`Тизер · 20 стр.`);

  await trigger.click();

  await page.getByTestId(`magazine-pdf-version-switcher-option-full`)
    .click();

  await expect(trigger)
    .toHaveText(`Полная версия · 40 стр.`);

  await expect(page)
    .toHaveURL(/\/components\/magazine-pdf-view$/);
}
