import fs from 'fs';
import { expect, test } from '@playwright/experimental-ct-react';
import { ChelzooHeroStory } from "./ChelzooHero.stories";
import { Breakpoint } from '../../../common/enums';

const VIEWPORTS = [
  {
    name: `mobile`,
    width: Breakpoint.MOBILE,
    height: 713
  },
  {
    name: `tablet`,
    width: Breakpoint.TABLET,
    height: 732
  },
  {
    name: `tablet-xl`,
    width: Breakpoint.TABLET_XL,
    height: 856
  },
  {
    name: `desktop`,
    width: Breakpoint.DESKTOP,
    height: 830
  },
  {
    name: `desktop-xl`,
    width: Breakpoint.DESKTOP_XL,
    height: 1152
  },
];

test.describe(`Snapshot`, () => {
  for (const {
    name,
    width,
    height
  } of VIEWPORTS) {
    test(`Take the snapshot of ChelzooHero ${width}x${height}`, async ({
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

      await mount(<ChelzooHeroStory />);

      await expect(
        page.getByTestId(`chelzoo-hero`)
          .filter({
            visible: true,
          }),
      )
        .toHaveScreenshot(`chelzoo-hero-${name}.png`, {
          animations: `disabled`,
        });
    });
  }
});
