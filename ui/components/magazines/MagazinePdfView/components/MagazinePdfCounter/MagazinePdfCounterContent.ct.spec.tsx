import { test, expect } from '@playwright/experimental-ct-react';
import { MagazinePdfCounterContentStory } from './MagazinePdfCounterContent.story';

test.describe(`MagazinePdfCounterContent`, () => {
  test(`
    GIVEN one page is visible (currentPage equals currentPageEnd)
    WHEN the component is rendered
    THEN it displays a single page number, e.g. "1 / 24"
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfCounterContentStory
        currentSlide={0}
        totalPages={24}
        slidesToShow={1}
      />,
    );

    await expect(component)
      .toHaveText(`1 / 24`);
  });

  test(`
    GIVEN a spread of two pages is visible (currentPage differs from currentPageEnd)
    WHEN the component is rendered
    THEN it displays the page range, e.g. "6–7 / 24"
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfCounterContentStory
        currentSlide={5}
        totalPages={24}
        slidesToShow={2}
      />,
    );

    await expect(component)
      .toHaveText(`6–7 / 24`);
  });

  test(`
    GIVEN the counter is rendered
    WHEN a screen reader inspects it
    THEN it is announced politely on updates, so page changes are accessible without moving focus
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfCounterContentStory
        currentSlide={0}
        totalPages={24}
        slidesToShow={1}
      />,
    );

    await expect(component)
      .toHaveAttribute(`aria-live`, `polite`);
  });

  test(`
    GIVEN the counter is rendered
    WHEN it's inspected for its identity
    THEN it exposes the data-testid used by other tests and pages to find it
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfCounterContentStory
        currentSlide={0}
        totalPages={24}
        slidesToShow={1}
      />,
    );

    await expect(component)
      .toHaveAttribute(`data-testid`, `magazine-pdf-counter`);
  });
});
