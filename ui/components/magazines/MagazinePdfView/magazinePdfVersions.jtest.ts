import { describe, expect, test } from '@jest/globals';
import { resolveMagazinePdfVersionIdFromQuery } from './magazinePdfVersions';

describe(`resolveMagazinePdfVersionIdFromQuery`, () => {
  test(`
    GIVEN there is no version query param
    WHEN resolveMagazinePdfVersionIdFromQuery is called with undefined
    THEN it resolves to the full version and reports it as not invalid
    `, () => {
    expect(resolveMagazinePdfVersionIdFromQuery(undefined))
      .toEqual({
        versionId: `full`,
        isInvalid: false,
      });
  });

  test(`
    GIVEN version query param = 'teaser'
    WHEN resolveMagazinePdfVersionIdFromQuery is called with this value
    THEN it resolves to the teaser version and reports it as not invalid
    `, () => {
    expect(resolveMagazinePdfVersionIdFromQuery(`teaser`))
      .toEqual({
        versionId: `teaser`,
        isInvalid: false,
      });
  });

  test(`
    GIVEN version query param = 'full'
    WHEN resolveMagazinePdfVersionIdFromQuery is called with this value
    THEN it resolves to the full version and reports it as not invalid
    `, () => {
    expect(resolveMagazinePdfVersionIdFromQuery(`full`))
      .toEqual({
        versionId: `full`,
        isInvalid: false,
      });
  });

  test(`
    GIVEN version query param = 'какая-то-ерунда'
    WHEN resolveMagazinePdfVersionIdFromQuery is called with this value
    THEN it resolves to the full (default) version and reports it as invalid
    `, () => {
    expect(resolveMagazinePdfVersionIdFromQuery(`какая-то-ерунда`))
      .toEqual({
        versionId: `full`,
        isInvalid: true,
      });
  });

  test(`
    GIVEN version query param is repeated in the URL and Next.js hands it back as an array
    WHEN resolveMagazinePdfVersionIdFromQuery is called with this array
    THEN it resolves to the full (default) version and reports it as invalid
    `, () => {
    expect(resolveMagazinePdfVersionIdFromQuery([`teaser`, `full`]))
      .toEqual({
        versionId: `full`,
        isInvalid: true,
      });
  });
});
