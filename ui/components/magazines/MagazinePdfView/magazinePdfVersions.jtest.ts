import { describe, expect, test } from '@jest/globals';
import { getMagazinePdfVersions, resolveMagazinePdfVersionIdFromQuery } from './magazinePdfVersions';

const RU_VERSIONS = getMagazinePdfVersions({
  locale: `ru`,
});
const EN_VERSIONS = getMagazinePdfVersions({
  locale: `en`,
});

describe(`resolveMagazinePdfVersionIdFromQuery`, () => {
  test(`
    GIVEN there is no version query param
    WHEN resolveMagazinePdfVersionIdFromQuery is called with undefined
    THEN it resolves to the full version and reports it as not invalid
    `, () => {
    expect(resolveMagazinePdfVersionIdFromQuery({
      rawValue: undefined,
      versions: RU_VERSIONS,
    }))
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
    expect(resolveMagazinePdfVersionIdFromQuery({
      rawValue: `teaser`,
      versions: RU_VERSIONS,
    }))
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
    expect(resolveMagazinePdfVersionIdFromQuery({
      rawValue: `full`,
      versions: RU_VERSIONS,
    }))
      .toEqual({
        versionId: `full`,
        isInvalid: false,
      });
  });

  test(`
    GIVEN version query param = 'notValidValue'
    WHEN resolveMagazinePdfVersionIdFromQuery is called with this value
    THEN it resolves to the full (default) version and reports it as invalid
    `, () => {
    expect(resolveMagazinePdfVersionIdFromQuery({
      rawValue: `notValidValue`,
      versions: RU_VERSIONS,
    }))
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
    expect(resolveMagazinePdfVersionIdFromQuery({
      rawValue: [`teaser`, `full`],
      versions: RU_VERSIONS,
    }))
      .toEqual({
        versionId: `full`,
        isInvalid: true,
      });
  });

  test(`
    GIVEN version query param = 'teaser' on a locale that has no teaser
    WHEN resolveMagazinePdfVersionIdFromQuery is called with this value
    THEN it resolves to the full (default) version
    `, () => {
    expect(resolveMagazinePdfVersionIdFromQuery({
      rawValue: `teaser`,
      versions: EN_VERSIONS,
    }))
      .toEqual({
        versionId: `full`,
        isInvalid: true,
      });
  });
});
