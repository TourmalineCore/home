import { test, expect, Page } from '@playwright/experimental-ct-react';
import { MagazinePdfFullscreenButtonStory } from './MagazinePdfFullscreenButton.story';

test.describe(`MagazinePdfFullscreenButton`, () => {
  test(`
    GIVEN the viewer isn't in fullscreen
    WHEN the user clicks the fullscreen button
    THEN it requests fullscreen on the viewer element, wiring state and content together
  `, async ({
    mount,
    page,
  }) => {
    const component = await mount(<MagazinePdfFullscreenButtonStory />);

    await stubFullscreenApi(page);

    await component.getByTestId(`magazine-pdf-fullscreen-button`)
      .click();

    await expect.poll(() => page.evaluate(() => (window as unknown as {
      __fullscreenCalls: {
        request: number;
      };
    }).__fullscreenCalls.request))
      .toBe(1);
  });

  test(`
    GIVEN the viewer is currently in fullscreen
    WHEN the user clicks the fullscreen button
    THEN it exits fullscreen instead of requesting it again
  `, async ({
    mount,
    page,
  }) => {
    const component = await mount(<MagazinePdfFullscreenButtonStory />);

    await stubFullscreenApi(page);

    await page.evaluate(() => {
      document.fullscreenElement = document.querySelector(`[data-testid="fullscreen-target"]`);
    });

    await component.getByTestId(`magazine-pdf-fullscreen-button`)
      .click();

    await expect.poll(() => page.evaluate(() => (window as unknown as {
      __fullscreenCalls: {
        exit: number;
      };
    }).__fullscreenCalls.exit))
      .toBe(1);
  });

  test(`
    GIVEN the browser confirms fullscreen was entered for the viewer element
    WHEN a native fullscreenchange event fires
    THEN the shared state is updated and the button reflects it, e.g. becomes pressed
  `, async ({
    mount,
    page,
  }) => {
    const component = await mount(<MagazinePdfFullscreenButtonStory />);

    await stubFullscreenApi(page);

    await page.evaluate(() => {
      document.fullscreenElement = document.querySelector(`[data-testid="fullscreen-target"]`);
      document.dispatchEvent(new Event(`fullscreenchange`));
    });

    await expect(component.getByTestId(`magazine-pdf-fullscreen-button`))
      .toHaveAttribute(`aria-pressed`, `true`);
  });

  test(`
    GIVEN the viewer is in fullscreen
    WHEN the user exits it without clicking the button, e.g. by pressing Esc, and fullscreenchange fires
    THEN the button reflects it becoming not pressed again, staying in sync with the browser
  `, async ({
    mount,
    page,
  }) => {
    const component = await mount(<MagazinePdfFullscreenButtonStory />);

    await stubFullscreenApi(page);

    await page.evaluate(() => {
      document.fullscreenElement = document.querySelector(`[data-testid="fullscreen-target"]`);
      document.dispatchEvent(new Event(`fullscreenchange`));
    });

    await expect(component.getByTestId(`magazine-pdf-fullscreen-button`))
      .toHaveAttribute(`aria-pressed`, `true`);

    await page.evaluate(() => {
      document.fullscreenElement = null;
      document.dispatchEvent(new Event(`fullscreenchange`));
    });

    await expect(component.getByTestId(`magazine-pdf-fullscreen-button`))
      .toHaveAttribute(`aria-pressed`, `false`);
  });

  test(`
    GIVEN the target ref isn't attached to an element yet
    WHEN the user clicks the fullscreen button
    THEN it does nothing instead of throwing
  `, async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <MagazinePdfFullscreenButtonStory attachTargetRef={false} />,
    );

    await stubFullscreenApi(page);

    await component.getByTestId(`magazine-pdf-fullscreen-button`)
      .click();

    await expect.poll(() => page.evaluate(() => (window as unknown as {
      __fullscreenCalls: {
        request: number;
        exit: number;
      };
    }).__fullscreenCalls))
      .toEqual({
        request: 0,
        exit: 0,
      });
  });
});

// The real Fullscreen API isn't deterministic in a headless component-test run, so it's stubbed
// and driven manually instead - the same way a real browser reports the outcome of a
// request/exit call asynchronously, by setting `fullscreenElement` and dispatching
// `fullscreenchange`. Installed via page.evaluate() after mount() (rather than
// page.addInitScript() before it) since requestFullscreen/exitFullscreen are only looked up at
// click time, so the stub just needs to be in place before that click, not before page load.
function stubFullscreenApi(page: Page) {
  return page.evaluate(() => {
    Object.defineProperty(document, `fullscreenElement`, {
      configurable: true,
      writable: true,
      value: null,
    });

    (window as unknown as {
      __fullscreenCalls: {
        request: number;
        exit: number;
      };
    }).__fullscreenCalls = {
      request: 0,
      exit: 0,
    };

    Element.prototype.requestFullscreen = function requestFullscreen() {
      (window as unknown as {
        __fullscreenCalls: {
          request: number;
        };
      }).__fullscreenCalls.request += 1;

      return Promise.resolve();
    };

    document.exitFullscreen = function exitFullscreen() {
      (window as unknown as {
        __fullscreenCalls: {
          exit: number;
        };
      }).__fullscreenCalls.exit += 1;

      return Promise.resolve();
    };
  });
}
