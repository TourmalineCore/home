import { jest } from '@jest/globals';
import { cmsFetch } from '../http-client';
import { getPageData } from './pages-api';

jest.mock(`@/services/cms/api/http-client`);
const mockedApiFetch = jest.mocked(cmsFetch);

describe(`getPageData`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedApiFetch.mockResolvedValue({
      data: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`
    GIVEN locale = zh
    WHEN getLayoutData is called with this locale
    THEN query string should contain locale en
    `, async () => {
    await getPageData({
      locale: `zh`,
      status: `published`,
      slug: ``,
    });

    expect(mockedApiFetch)
      .toHaveBeenCalledWith(
        expect.stringContaining(`locale=en`),
      );
  });
});
