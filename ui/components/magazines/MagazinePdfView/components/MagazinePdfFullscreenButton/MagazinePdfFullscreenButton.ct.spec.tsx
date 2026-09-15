import { test, expect } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';
import { MagazinePdfFullscreenButton } from './MagazinePdfFullscreenButton';

const TARGET_ID = `fullscreen-target`;

test.describe(`MagazinePdfFullscreenButton`, () => {
  test(`
    GIVEN the viewer isn't in fullscreen
    WHEN the button is rendered
    THEN it isn't marked as pressed and its label offers to enter fullscreen
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <div id={TARGET_ID}>
        <MagazinePdfFullscreenButton targetId={TARGET_ID} />
      </div>,
    );

    const button = component.getByTestId(`magazine-pdf-fullscreen-button`);

    await expect(button)
      .toHaveAttribute(`aria-pressed`, `false`);
    await expect(button)
      .toHaveAttribute(`aria-label`, `Развернуть журнал на весь экран`);
    await expect(button)
      .toHaveText(`На весь экран`);
  });

  test(`
    GIVEN the button is rendered
    WHEN a screen reader inspects it
    THEN it points at the element it puts into fullscreen
  `, async ({
    mount,
  }) => {
    const component = await mount(
      <div id={TARGET_ID}>
        <MagazinePdfFullscreenButton targetId={TARGET_ID} />
      </div>,
    );

    await expect(component.getByTestId(`magazine-pdf-fullscreen-button`))
      .toHaveAttribute(`aria-controls`, TARGET_ID);
  });

  test(`
    GIVEN the viewer isn't in fullscreen
    WHEN the user clicks the fullscreen button
    THEN it requests fullscreen on the target element
  `, async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <div id={TARGET_ID}>
        <MagazinePdfFullscreenButton targetId={TARGET_ID} />
      </div>,
    );

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
    const component = await mount(
      <div id={TARGET_ID}>
        <MagazinePdfFullscreenButton targetId={TARGET_ID} />
      </div>,
    );

    await stubFullscreenApi(page);
    await enterFullscreen(page);

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
    GIVEN the browser confirms fullscreen was entered for the target element
    WHEN a native fullscreenchange event fires
    THEN the button reflects it, becoming pressed and offering to leave fullscreen
  `, async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <div id={TARGET_ID}>
        <MagazinePdfFullscreenButton targetId={TARGET_ID} />
      </div>,
    );

    await stubFullscreenApi(page);
    await enterFullscreen(page);

    const button = component.getByTestId(`magazine-pdf-fullscreen-button`);

    await expect(button)
      .toHaveAttribute(`aria-pressed`, `true`);
    await expect(button)
      .toHaveAttribute(`aria-label`, `Свернуть журнал`);
    await expect(button)
      .toHaveText(`Свернуть`);
  });

  test(`
    GIVEN the viewer is in fullscreen
    WHEN the user exits it without clicking the button, e.g. by pressing Esc, and fullscreenchange fires
    THEN the button becomes not pressed again, staying in sync with the browser
  `, async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <div id={TARGET_ID}>
        <MagazinePdfFullscreenButton targetId={TARGET_ID} />
      </div>,
    );

    await stubFullscreenApi(page);
    await enterFullscreen(page);

    await expect(component.getByTestId(`magazine-pdf-fullscreen-button`))
      .toHaveAttribute(`aria-pressed`, `true`);

    await page.evaluate(() => {
      (document as unknown as { fullscreenElement: Element | null; }).fullscreenElement = null;
      document.dispatchEvent(new Event(`fullscreenchange`));
    });

    await expect(component.getByTestId(`magazine-pdf-fullscreen-button`))
      .toHaveAttribute(`aria-pressed`, `false`);
  });

  test(`
    GIVEN there is no element with the target id on the page
    WHEN the user clicks the fullscreen button
    THEN it does nothing instead of throwing
  `, async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <div>
        <MagazinePdfFullscreenButton targetId={TARGET_ID} />
      </div>,
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

  test(`
    GIVEN there is no element with the target id on the page
    WHEN some other element goes fullscreen and fullscreenchange fires
    THEN the button doesn't mistake "nothing is fullscreen" for "our missing target is"
  `, async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <div>
        <MagazinePdfFullscreenButton targetId={TARGET_ID} />
      </div>,
    );

    await stubFullscreenApi(page);

    await page.evaluate(() => {
      document.dispatchEvent(new Event(`fullscreenchange`));
    });

    await expect(component.getByTestId(`magazine-pdf-fullscreen-button`))
      .toHaveAttribute(`aria-pressed`, `false`);
  });
});

// The real Fullscreen API isn't deterministic headless, so it's stubbed and driven manually.
// After mount() rather than addInitScript(), since the methods are only looked up on click
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

function enterFullscreen(page: Page, targetId = TARGET_ID) {
  return page.evaluate((id) => {
    (document as unknown as { fullscreenElement: Element | null; }).fullscreenElement = document.getElementById(id);
    document.dispatchEvent(new Event(`fullscreenchange`));
  }, targetId);
}
