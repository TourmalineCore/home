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
    GIVEN the teaser version is selected and the user has moved off its first page
    WHEN they open the switcher and pick the full version
    THEN the trigger updates, the dropdown closes, ?version=teaser is removed from the URL 
    AND the pdf file is swapped for one the counter reads as its own first page
    `,
    switchesBetweenVersionsTests,
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

  await expect(trigger)
    .toHaveAttribute(`aria-expanded`, `true`);

  await expect(page.getByTestId(`magazine-pdf-version-switcher-option-teaser`))
    .toBeVisible();

  await expect(page.getByTestId(`magazine-pdf-version-switcher-option-full`))
    .toHaveAttribute(`aria-selected`, `true`);

  await page.mouse.click(10, 10);

  await expect(trigger)
    .toHaveAttribute(`aria-expanded`, `false`);

  await expect(page.getByTestId(`magazine-pdf-version-switcher-option-teaser`))
    .not.toBeVisible();
}

async function switchesBetweenVersionsTests({
  page,
  goToComponentsPage,
}: {
  page: Page;
  goToComponentsPage: CustomTestFixtures[`goToComponentsPage`];
}) {
  await goToComponentsPage(`${TEST_ID}?version=teaser`);

  // The counter reads the pdf itself, so it only settles once the file is parsed
  await page.waitForSelector(`[data-testid="${TEST_ID}"] canvas`);

  const trigger = page.getByTestId(`magazine-pdf-version-switcher-trigger`);
  const counter = page.getByTestId(`magazine-pdf-counter`);

  await expect(trigger)
    .toHaveText(`Тизер · 20 стр.`);

  await page.getByTestId(`magazine-pdf-view-next-arrow`)
    .click();

  await expect(counter)
    .toHaveText(/^2/);

  await trigger.click();

  await page.getByTestId(`magazine-pdf-version-switcher-option-full`)
    .click();

  await expect(page)
    .toHaveURL(/\/components\/magazine-pdf-view$/);

  await expect(trigger)
    .toHaveText(`Полная версия · 40 стр.`);

  await expect(counter)
    .toHaveText('1 / 40');
}
