import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';
import { cmsFetch } from '../http-client';
import { getCookieData } from './cookie-api';

jest.mock(`@/services/cms/api/http-client`);
const mockedApiFetch = jest.mocked(cmsFetch);

describe(`getCookieData`, () => {
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
    WHEN getCookieData is called with this props
    THEN query string should contain locale = en and status = published
    `, async () => {
    await getCookieData({
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
    WHEN getCookieData is called with this props
    THEN query string should contain locale = ru and status = draft
    `, async () => {
    await getCookieData({
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
