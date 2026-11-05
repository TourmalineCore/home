import fs from 'fs';
import { expect, test } from '@playwright/experimental-ct-react';
import { HeaderRedesignStory } from "./HeaderRedesign.stories";
import { Breakpoint } from '../../../common/enums';

const VIEWPORTS = [
  {
    name: `mobile`,
    width: Breakpoint.MOBILE,
    height: 80,
  },
  {
    name: `tablet`,
    width: Breakpoint.TABLET,
    height: 80,
  },
  {
    name: `tablet-xl`,
    width: Breakpoint.TABLET_XL,
    height: 80,
  },
  {
    name: `desktop`,
    width: Breakpoint.DESKTOP,
    height: 88,
  },
  {
    name: `desktop-xl`,
    width: Breakpoint.DESKTOP_XL,
    height: 158,
  },
];

test.describe(`Snapshot`, () => {
  for (const {
    name,
    width,
    height,
  } of VIEWPORTS) {
    test(`Take the snapshot of Header ${width}x${height}`, async ({
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

      await mount(<HeaderRedesignStory />);

      await expect(
        page.getByTestId(`header-redesign`)
          .filter({
            visible: true,
          }),
      )
        .toHaveScreenshot(`header-redesign-${name}.png`, {
          animations: `disabled`,
        });
    });
  }
});
