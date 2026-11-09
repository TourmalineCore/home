import { describe, expect, test } from '@jest/globals';
import { getMagazinePdfSlides } from './magazinePdfSlides';

describe(`getMagazinePdfSlides`, () => {
  test(`
    GIVEN a magazine with an even number of pages, read two pages at a time
    WHEN getMagazinePdfSlides is called
    THEN the first and the last page get a slide of their own and the rest are paired up
    `, () => {
    expect(getMagazinePdfSlides({
      totalPages: 8,
      pagesPerSlide: 2,
    }))
      .toEqual([
        [1],
        [2, 3],
        [4, 5],
        [6, 7],
        [8],
      ]);
  });

  test(`
    GIVEN a magazine with an odd number of pages, read two pages at a time
    WHEN getMagazinePdfSlides is called
    THEN the first page is still on its own and the last one has nothing left to pair with
    `, () => {
    expect(getMagazinePdfSlides({
      totalPages: 7,
      pagesPerSlide: 2,
    }))
      .toEqual([
        [1],
        [2, 3],
        [4, 5],
        [6, 7],
      ]);
  });

  test(`
    GIVEN a viewport too narrow for two pages at a time
    WHEN getMagazinePdfSlides is called
    THEN every page is a slide of its own
    `, () => {
    expect(getMagazinePdfSlides({
      totalPages: 3,
      pagesPerSlide: 1,
    }))
      .toEqual([
        [1],
        [2],
        [3],
      ]);
  });

  test(`
    GIVEN a magazine of a single page
    WHEN getMagazinePdfSlides is called for two pages at a time
    THEN that page is the only slide there is
    `, () => {
    expect(getMagazinePdfSlides({
      totalPages: 1,
      pagesPerSlide: 2,
    }))
      .toEqual([[1]]);
  });

  test(`
    GIVEN a pdf whose page count isn't known yet
    WHEN getMagazinePdfSlides is called with no pages
    THEN there are no slides to show
    `, () => {
    expect(getMagazinePdfSlides({
      totalPages: 0,
      pagesPerSlide: 2,
    }))
      .toEqual([]);
  });
});
