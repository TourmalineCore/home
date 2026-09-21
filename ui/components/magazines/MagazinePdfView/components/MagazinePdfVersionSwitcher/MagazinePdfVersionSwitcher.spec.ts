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
    GIVEN the magazine page is opened with no ?version= query param
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
    WHEN the user clicks the trigger and then clicks outside of the dropdown
    THEN the dropdown opens showing both versions with the current one marked selected, and closes again
    `,
    opensAndClosesDropdownTests,
  );

  test(
    `
    GIVEN the full version is selected (the default, no ?version= in the URL)
    WHEN the user opens the switcher and picks the teaser
    THEN the trigger updates, the dropdown closes, ?version=teaser is added to the URL and the
    counter shows a valid first-page reading for the new file, not a negative one
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
    GIVEN the user has moved off the first page of the current version
    WHEN they switch to the other version
    THEN the actual pdf file is swapped and the counter resets to that file's own first page
    `,
    resetsToFirstPageOnVersionSwitchTests,
  );
});

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

  await expect(page.getByTestId(`magazine-pdf-counter`))
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

  await page.getByTestId(`magazine-pdf-version-switcher-trigger`)
    .click();

  await page.getByTestId(`magazine-pdf-version-switcher-option-full`)
    .click();

  await expect(page.getByTestId(`magazine-pdf-version-switcher-trigger`))
    .toHaveText(`Полная версия · 40 стр.`);

  await expect(page)
    .toHaveURL(/\/components\/magazine-pdf-view$/);
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
    .toHaveText(/^1 \/ 20/);
}
