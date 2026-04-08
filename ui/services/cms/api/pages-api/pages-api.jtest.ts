import { jest } from '@jest/globals';
import { cmsFetch } from '../http-client';
import { getPageData } from './pages-api';
import { AppRoute } from '../../../../common/enums';

jest.mock(`@/services/cms/api/http-client`);
const mockedApiFetch = jest.mocked(cmsFetch);

describe(`getPageData`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedApiFetch.mockResolvedValue({
      data: {
        blocks: [],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`
    GIVEN locale = zh, status = published and slug != '/'
    WHEN getLayoutData is called with this props
    THEN query string should contain locale = en and status = published
    AND request should be sent to the navigations endpoint
    `, async () => {
    await getPageData({
      locale: `zh`,
      status: `published`,
      slug: ``,
    });

    // decode the code in order to convert it into a human-readable form
    // otherwise, symbols '[' and ']' turns into %5B and %5A
    const url = decodeURIComponent(mockedApiFetch.mock.calls[0][0]);

    expect(mockedApiFetch)
      .toHaveBeenCalledWith(
        expect.stringContaining(`locale=en`),
      );

    expect(mockedApiFetch)
      .toHaveBeenCalledWith(
        expect.stringContaining(`status=published`),
      );

    expect(url)
      .toContain(`navigations`);
  });

  test(`
    GIVEN locale = ru, status = published and slug = '/'
    WHEN getLayoutData is called with this props
    THEN query string should contain locale = ru and status = draft
    AND request should be sent to the homepage endpoint
    `, async () => {
    await getPageData({
      locale: `ru`,
      status: `draft`,
      slug: AppRoute.Main,
    });

    // decode the code in order to convert it into a human-readable form
    // otherwise, symbols '[' and ']' turns into %5B and %5A
    const url = decodeURIComponent(mockedApiFetch.mock.calls[0][0]);

    expect(mockedApiFetch)
      .toHaveBeenCalledWith(
        expect.stringContaining(`locale=ru`),
      );

    expect(mockedApiFetch)
      .toHaveBeenCalledWith(
        expect.stringContaining(`status=draft`),
      );

    expect(url)
      .toContain(`homepage`);
  });
});
