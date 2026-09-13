import { test, expect } from '@playwright/experimental-ct-react';
import { MagazinePdfCounterStory } from './MagazinePdfCounter.story';

test.describe(`MagazinePdfCounter`, () => {
  test(`
    GIVEN the viewer shows two pages per slide and is on a middle slide
    WHEN the container is rendered with these props
    THEN it pushes the slide info into the shared state and renders the resulting page range
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfCounterStory
        currentSlide={5}
        totalPages={24}
        slidesToShow={2}
      />,
    );

    await expect(component)
      .toHaveText(`6–7 / 24`);
  });

  test(`
    GIVEN the container is already rendered for one slide
    WHEN it re-renders after the user navigates to another slide
    THEN the shared state - and so the displayed page range - updates to match the new slide
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfCounterStory
        currentSlide={0}
        totalPages={24}
        slidesToShow={1}
      />,
    );

    await expect(component)
      .toHaveText(`1 / 24`);

    await component.update(
      <MagazinePdfCounterStory
        currentSlide={1}
        totalPages={24}
        slidesToShow={1}
      />,
    );

    await expect(component)
      .toHaveText(`2 / 24`);
  });
});
