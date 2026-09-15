import { test, expect } from '@playwright/experimental-ct-react';
import { MagazinePdfCounter } from './MagazinePdfCounter';

test.describe(`MagazinePdfCounter`, () => {
  test(`
    GIVEN the first page is shown, one page per slide
    WHEN the counter is rendered
    THEN it displays a single page number, e.g. "1 / 24"
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfCounter
        currentSlide={0}
        totalPages={24}
        slidesToShow={1}
      />,
    );

    await expect(component)
      .toHaveText(`1 / 24`);
  });

  test(`
    GIVEN a middle slide is shown, two pages per slide (a spread)
    WHEN the counter is rendered
    THEN it displays the spread's page range, e.g. "6–7 / 24"
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfCounter
        currentSlide={5}
        totalPages={24}
        slidesToShow={2}
      />,
    );

    await expect(component)
      .toHaveText(`6–7 / 24`);
  });

  test(`
    GIVEN the last slide is shown with two pages per slide, but only one page is left (odd total)
    WHEN the counter is rendered
    THEN the spread's end is clamped to the total page count instead of overshooting it
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfCounter
        currentSlide={23}
        totalPages={24}
        slidesToShow={2}
      />,
    );

    await expect(component)
      .toHaveText(`24 / 24`);
  });

  test(`
    GIVEN the pdf hasn't reported its page count yet, so there are no pages to number
    WHEN the counter is rendered
    THEN it displays zeros instead of a page 1 that doesn't exist
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfCounter
        currentSlide={0}
        totalPages={0}
        slidesToShow={1}
      />,
    );

    await expect(component)
      .toHaveText(`0 / 0`);
  });

  test(`
    GIVEN the counter is rendered
    WHEN a screen reader inspects it
    THEN it is announced politely on updates, so page changes are accessible without moving focus
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfCounter
        currentSlide={0}
        totalPages={24}
        slidesToShow={1}
      />,
    );

    await expect(component)
      .toHaveAttribute(`aria-live`, `polite`);
  });
});
