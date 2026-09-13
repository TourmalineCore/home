import { test, expect } from '@playwright/experimental-ct-react';
import { MagazinePdfFullscreenButtonState } from './MagazinePdfFullscreenButtonState';

test.describe(`MagazinePdfFullscreenButtonState`, () => {
  test(`
    GIVEN a freshly created state
    WHEN asked whether the viewer is in fullscreen
    THEN it reports false
  `, () => {
    const fullscreenButtonState = new MagazinePdfFullscreenButtonState();

    expect(fullscreenButtonState.isFullscreen)
      .toBe(false);
  });

  test(`
    GIVEN the viewer isn't in fullscreen
    WHEN the state is set to fullscreen
    THEN it reports true
  `, () => {
    const fullscreenButtonState = new MagazinePdfFullscreenButtonState();

    fullscreenButtonState.setIsFullscreen({
      isFullscreen: true,
    });

    expect(fullscreenButtonState.isFullscreen)
      .toBe(true);
  });

  test(`
    GIVEN the viewer is in fullscreen
    WHEN the state is set back to not fullscreen
    THEN it reports false
  `, () => {
    const fullscreenButtonState = new MagazinePdfFullscreenButtonState();

    fullscreenButtonState.setIsFullscreen({
      isFullscreen: true,
    });

    fullscreenButtonState.setIsFullscreen({
      isFullscreen: false,
    });

    expect(fullscreenButtonState.isFullscreen)
      .toBe(false);
  });
});
