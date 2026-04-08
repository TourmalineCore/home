import { jest } from '@jest/globals';
import { cmsFetch } from '../http-client';
import { getLayoutData } from './layout-api';

jest.mock(`@/services/cms/api/http-client`);
const mockedApiFetch = jest.mocked(cmsFetch);

describe(`getLayoutData`, () => {
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
    GIVEN locale = zh and status = published
    WHEN getLayoutData is called with this props
    THEN query string should contain locale = en and status = published
    `, async () => {
    await getLayoutData({
      locale: `zh`,
      status: `published`,
    });

    expect(mockedApiFetch)
      .toHaveBeenCalledWith(
        expect.stringContaining(`locale=en`),
      );

    expect(mockedApiFetch)
      .toHaveBeenCalledWith(
        expect.stringContaining(`status=published`),
      );
  });

  test(`
    GIVEN locale = ru and status = published
    WHEN getLayoutData is called with this props
    THEN query string should contain locale = ru and status = draft
    `, async () => {
    await getLayoutData({
      locale: `ru`,
      status: `draft`,
    });

    expect(mockedApiFetch)
      .toHaveBeenCalledWith(
        expect.stringContaining(`locale=ru`),
      );

    expect(mockedApiFetch)
      .toHaveBeenCalledWith(
        expect.stringContaining(`status=draft`),
      );
  });
});
