import fs from 'fs';
import test, { expect } from '@playwright/test';
import { Breakpoint } from '../../../common/enums';

const VIEWPORTS = [
  {
    name: `mobile`,
    width: Breakpoint.MOBILE,
    height: 565,
  },
  {
    name: `tablet`,
    width: Breakpoint.TABLET,
    height: 1312,
  },
  {
    name: `tablet-xl`,
    width: Breakpoint.TABLET_XL,
    height: 1801,
  },
  {
    name: `desktop`,
    width: Breakpoint.DESKTOP,
    height: 2360,
  },
  {
    name: `desktop-xl`,
    width: Breakpoint.DESKTOP_XL,
    height: 3318,
  },
];

test.describe(`Snapshot`, () => {
  for (const {
    name,
    width,
    height,
  } of VIEWPORTS) {
    test(`Take the snapshot of ChelzooAdaptation ${width}x${height}`, async ({
      page,
      mount,
    }) => {
      await page.setViewportSize({
        width,
        height,
      });

      const PNG_STUB_FILE = fs.readFileSync(`./playwright-tests/fixtures/stub.png`);

      await page.route(`**/_next/image*`, async (route, request) => {
        const accept = await request.headerValue(`accept`);
        if (accept?.includes(`image/*`)) {
          return route.fulfill({
            contentType: `image/png`,
            body: PNG_STUB_FILE,
          });
        }
        return route.continue();
      });

      await mount(`ChelzooAdaptationStory`);

      await expect(
        page.getByTestId(`chelzoo-adaptation`)
          .filter({
            visible: true,
          }),
      )
        .toHaveScreenshot(`chelzoo-adaptation-${name}.png`, {
          animations: `disabled`,
        });
    });
  }
});
