import { test, expect } from '@playwright/experimental-ct-react';
import { MagazinePdfFullscreenButtonContentStory } from './MagazinePdfFullscreenButtonContent.story';

test.describe(`MagazinePdfFullscreenButtonContent`, () => {
  test(`
    GIVEN the viewer isn't in fullscreen
    WHEN the button is rendered
    THEN it isn't marked as pressed and its label offers to enter fullscreen
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfFullscreenButtonContentStory
        initialIsFullscreen={false}
        onToggleClick={() => {}}
      />,
    );

    await expect(component)
      .toHaveAttribute(`aria-pressed`, `false`);
    await expect(component)
      .toHaveAttribute(`aria-label`, `Развернуть журнал на весь экран`);
  });

  test(`
    GIVEN the viewer is in fullscreen
    WHEN the button is rendered
    THEN it is marked as pressed and its label offers to exit fullscreen
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfFullscreenButtonContentStory
        initialIsFullscreen
        onToggleClick={() => {}}
      />,
    );

    await expect(component)
      .toHaveAttribute(`aria-pressed`, `true`);
    await expect(component)
      .toHaveAttribute(`aria-label`, `Свернуть журнал`);
  });

  test(`
    GIVEN the button is rendered
    WHEN the user clicks it
    THEN it calls the onToggleClick callback
  `, async ({
    mount,
  }) => {
    let toggleCallCount = 0;

    const component = await mount(
      <MagazinePdfFullscreenButtonContentStory
        initialIsFullscreen={false}
        onToggleClick={() => {
          toggleCallCount += 1;
        }}
      />,
    );

    await component.click();

    expect(toggleCallCount)
      .toBe(1);
  });

  test(`
    GIVEN the button is rendered
    WHEN it's inspected for its type
    THEN it's a plain button, so it can't accidentally submit a surrounding form
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <MagazinePdfFullscreenButtonContentStory
        initialIsFullscreen={false}
        onToggleClick={() => {}}
      />,
    );

    await expect(component)
      .toHaveAttribute(`type`, `button`);
  });
});
