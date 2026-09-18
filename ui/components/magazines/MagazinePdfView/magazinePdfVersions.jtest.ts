import { describe, expect, test } from '@jest/globals';
import { resolveMagazinePdfVersionIdFromQuery } from './magazinePdfVersions';

describe(`resolveMagazinePdfVersionIdFromQuery`, () => {
  test(`
    GIVEN there is no version query param
    WHEN resolveMagazinePdfVersionIdFromQuery is called with undefined
    THEN it resolves to the full version and reports it as not invalid
    `, () => {
    expect(resolveMagazinePdfVersionIdFromQuery({
      rawValue: undefined,
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
    }))
      .toEqual({
        versionId: `full`,
        isInvalid: true,
      });
  });
});
