import { test, expect } from '@playwright/experimental-ct-react';
import { MagazinePdfCounterState } from './MagazinePdfCounterState';

test.describe(`MagazinePdfCounterState`, () => {
  test(`
    GIVEN a freshly created state
    WHEN asked for the current page
    THEN it starts at page 0 of 0, before any slide info has arrived
  `, () => {
    const counterState = new MagazinePdfCounterState();

    expect(counterState.currentPage)
      .toBe(0);
    expect(counterState.currentPageEnd)
      .toBe(0);
    expect(counterState.totalPages)
      .toBe(0);
  });

  test(`
    GIVEN the first slide is shown, one page per slide
    WHEN the state is set with this slide info
    THEN it reports page 1 as both the start and the end of the visible range
  `, () => {
    const counterState = new MagazinePdfCounterState();

    counterState.setSlideInfo({
      currentSlide: 0,
      totalPages: 24,
      slidesToShow: 1,
    });

    expect(counterState.currentPage)
      .toBe(1);
    expect(counterState.currentPageEnd)
      .toBe(1);
    expect(counterState.totalPages)
      .toBe(24);
  });

  test(`
    GIVEN a middle slide is shown, two pages per slide (a spread)
    WHEN the state is set with this slide info
    THEN it reports the spread's first and last page numbers
  `, () => {
    const counterState = new MagazinePdfCounterState();

    counterState.setSlideInfo({
      currentSlide: 5,
      totalPages: 24,
      slidesToShow: 2,
    });

    expect(counterState.currentPage)
      .toBe(6);
    expect(counterState.currentPageEnd)
      .toBe(7);
  });

  test(`
    GIVEN the last slide is shown with two pages per slide, but only one page is left (odd total)
    WHEN the state is set with this slide info
    THEN the spread's end is clamped to the total page count instead of overshooting it
  `, () => {
    const counterState = new MagazinePdfCounterState();

    counterState.setSlideInfo({
      currentSlide: 23,
      totalPages: 24,
      slidesToShow: 2,
    });

    expect(counterState.currentPage)
      .toBe(24);
    expect(counterState.currentPageEnd)
      .toBe(24);
  });

  test(`
    GIVEN a magazine with a single page
    WHEN the state is set for the only slide
    THEN it reports page 1 as both the start and the end of the visible range
  `, () => {
    const counterState = new MagazinePdfCounterState();

    counterState.setSlideInfo({
      currentSlide: 0,
      totalPages: 1,
      slidesToShow: 1,
    });

    expect(counterState.currentPage)
      .toBe(1);
    expect(counterState.currentPageEnd)
      .toBe(1);
  });

  test(`
    GIVEN the state is already set for one slide
    WHEN the user navigates to another slide and the state is updated again
    THEN it recalculates the visible page range for the new slide
  `, () => {
    const counterState = new MagazinePdfCounterState();

    counterState.setSlideInfo({
      currentSlide: 0,
      totalPages: 24,
      slidesToShow: 2,
    });

    expect(counterState.currentPage)
      .toBe(1);

    counterState.setSlideInfo({
      currentSlide: 3,
      totalPages: 24,
      slidesToShow: 2,
    });

    expect(counterState.currentPage)
      .toBe(4);
    expect(counterState.currentPageEnd)
      .toBe(5);
  });
});
