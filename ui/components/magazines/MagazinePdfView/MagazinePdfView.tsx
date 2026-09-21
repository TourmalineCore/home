'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'react-pdf/dist/Page/AnnotationLayer.css';

import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { Document, Page, pdfjs } from 'react-pdf';
import Slider from 'react-slick';
import { Breakpoint } from '../../../common/enums';
import { useDeviceSize, useFullscreen } from '../../../common/hooks';
import { MagazinePdfLoader } from './components/MagazinePdfLoader/MagazinePdfLoader';
import { MagazinePdfViewArrow } from './components/MagazinePdfViewArrow/MagazinePdfViewArrow';
import { MagazinePdfCounter } from './components/MagazinePdfCounter/MagazinePdfCounter';
import { MagazinePdfFullscreenButton } from './components/MagazinePdfFullscreenButton/MagazinePdfFullscreenButton';
import { MagazinePdfVersionSwitcher } from './components/MagazinePdfVersionSwitcher/MagazinePdfVersionSwitcher';
import {
  DEFAULT_MAGAZINE_PDF_VERSION_ID,
  getMagazinePdfVersion,
  MagazinePdfVersionId,
  resolveMagazinePdfVersionIdFromQuery,
} from './magazinePdfVersions';

// pdfjs-dist relies on Promise.withResolvers, missing in older browsers (e.g. Safari < 17.4 )
if (typeof Promise.withResolvers !== `function`) {
  Promise.withResolvers = function withResolvers<T>() {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason?: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    return {
      promise,
      resolve,
      reject,
    };
  };
}

// Self-hosted (see scripts/copy-pdf-worker.mjs) so a CDN outage can't block rendering. It runs
// in its own global scope, out of reach of the polyfill above, and ships its own shims
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

const VIEW_ELEMENT_ID = `magazine-pdf-view`;

// A4 page aspect ratio (width / height), used to size the spread
const PAGE_ASPECT_RATIO = 0.7071;

const PAGE_RENDER_BUFFER = 1;

// Height of a single control row (the version switcher trigger / counter / fullscreen button),
// mirroring &__header/&__toolbar in MagazinePdfView.scss
const CONTROLS_ROW_HEIGHT = 32;

export function MagazinePdfView() {
  const router = useRouter();

  const {
    versionId: selectedVersionId,
    isInvalid: isVersionQueryInvalid,
  } = resolveMagazinePdfVersionIdFromQuery({
    rawValue: router.query.version,
  });

  const {
    filePath,
  } = getMagazinePdfVersion({
    versionId: selectedVersionId,
  });

  const [totalPages, setTotalPages] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionFromSlide, setTransitionFromSlide] = useState<number | null>(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [maxPageHeight, setMaxPageHeight] = useState(0);

  const [isPdfReady, setIsPdfReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState<{
    loaded: number;
    total: number;
  }>({
    loaded: 0,
    total: 0,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);

  const {
    isFullscreen,
  } = useFullscreen({
    targetId: VIEW_ELEMENT_ID,
    fallbackClassName: `magazine-pdf-view--fullscreen`,
  });

  const {
    height: deviceHeight,
  } = useDeviceSize();

  const slidesToShow = wrapperWidth >= Breakpoint.TABLET ? 2 : 1;
  const isTabletXl = wrapperWidth >= Breakpoint.TABLET_XL;

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const sentinelElement = sentinelRef.current;

    if (!wrapperElement || !sentinelElement) {
      return undefined;
    }

    // Two observers because the wrapper's height depends on the page size computed from it, so
    // the height ceiling comes from the sentinel instead, whose size is fixed. Rounded so
    // sub-pixel jitter doesn't re-render every mounted page
    const wrapperObserver = new ResizeObserver(([entry]) => {
      setWrapperWidth(Math.round(entry.contentRect.width));
    });
    const sentinelObserver = new ResizeObserver(([entry]) => {
      setMaxPageHeight(Math.round(entry.contentRect.height));
    });

    wrapperObserver.observe(wrapperElement);
    sentinelObserver.observe(sentinelElement);

    return () => {
      wrapperObserver.disconnect();
      sentinelObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVersionQueryInvalid) {
      replaceVersionQuery(DEFAULT_MAGAZINE_PDF_VERSION_ID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVersionQueryInvalid]);

  // Document's onLoadSuccess below will set totalPages/isPdfReady for the new file once it's
  // loaded, but currentSlide is otherwise untouched by a file swap - without this the slider
  // would open the new file already scrolled to wherever the previous one was left
  useEffect(() => {
    setCurrentSlide(0);
    setTransitionFromSlide(null);
    setTotalPages(0);
    setIsPdfReady(false);
    setLoadProgress({
      loaded: 0,
      total: 0,
    });
  }, [filePath]);

  // Not fullscreen: unchanged, sentinel-derived ceiling (roughly one screenful, leaving room for
  // the sticky site header). Fullscreen: there's no sticky header competing for space at all, so
  // the only thing to reserve is the header/toolbar rows and the wrapper's own padding, all
  // actually inside this same box - mirrors &__header/&__toolbar's row margin and &__wrapper's
  // --wrapper-padding-vertical in MagazinePdfView.scss
  const controlsRowMargin = 16;
  const wrapperPaddingVertical = isTabletXl ? 44 : 34;
  const controlsOverhead = 2 * (CONTROLS_ROW_HEIGHT + controlsRowMargin + wrapperPaddingVertical);
  const heightCeiling = isFullscreen
    ? Math.max(deviceHeight - controlsOverhead, 0)
    : maxPageHeight;

  // wrapperWidth/heightCeiling are still 0 before the observers' first callback, skip sizing off an empty box
  const pageHeight = wrapperWidth && heightCeiling
    ? Math.min(heightCeiling, wrapperWidth / slidesToShow / PAGE_ASPECT_RATIO)
    : 0;
  const sliderWidth = pageHeight * PAGE_ASPECT_RATIO * slidesToShow;

  const progressText = loadProgress && loadProgress.total > 0
    ? `Загрузка журнала: ${Math.round((loadProgress.loaded / loadProgress.total) * 100)}%`
    : `Загрузка журнала...`;

  return (
    // Fullscreen is a reading mode: focus moves onto the magazine, stays inside the viewer while
    // the rest of the page is hidden behind it, and returns to the button on exit, as in a modal
    <FocusLock
      className="magazine-pdf-view"
      lockProps={{
        id: VIEW_ELEMENT_ID,
        'data-testid': VIEW_ELEMENT_ID,
      }}
      disabled={!isFullscreen}
      onActivation={() => sliderWrapperRef.current?.focus()}
      // Returns focus to the button that opened fullscreen. Deferred by hand, since a lock
      // toggled via `disabled` would otherwise return it mid-render and React would undo that -
      // see "Unmounting and focus management" in react-focus-lock's README
      returnFocus={(originalElement) => {
        setTimeout(() => (originalElement as HTMLElement).focus());

        return false;
      }}
    >
      <div
        className="magazine-pdf-view__wrapper"
        ref={wrapperRef}
      >
        {!isPdfReady && (
          <div className="magazine-pdf-view__loader-container">
            <MagazinePdfLoader progressText={progressText} />
          </div>
        )}

        <div
          className="magazine-pdf-view__header"
          style={{
            width: sliderWidth || undefined,
          }}
        >
          <MagazinePdfVersionSwitcher
            selectedVersionId={selectedVersionId}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={replaceVersionQuery}
          />
        </div>

        <div
          className="magazine-pdf-view__viewport-sentinel"
          aria-hidden
          ref={sentinelRef}
        />

        <Document
          file={filePath}
          // eslint-disable-next-line react/jsx-no-bind
          onLoadSuccess={({
            numPages,
          }) => {
            setTotalPages(numPages);
            setIsPdfReady(true);
          }}
          loading={null}
          onLoadProgress={({
            loaded,
            total,
          }) => setLoadProgress({
            loaded,
            total,
          })}
          externalLinkTarget="_blank"
        >
          {/* Outside the slider so the tab order follows the screen */}
          <MagazinePdfViewArrow
            direction="prev"
            isDisabled={currentSlide === 0}
            onClick={() => sliderRef.current?.slickPrev()}
          />

          {/* Focusable, so that the magazine itself can take focus in fullscreen and the arrow
          keys turn its pages */}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <div
            className="magazine-pdf-view__slider-wrapper"
            data-testid="magazine-pdf-view-slider-wrapper"
            ref={sliderWrapperRef}
            role="region"
            aria-label="Журнал"
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            style={{
              width: sliderWidth || undefined,
            }}
            onKeyDown={(event) => {
              if (event.key === `ArrowLeft`) {
                sliderRef.current?.slickPrev();
              } else if (event.key === `ArrowRight`) {
                sliderRef.current?.slickNext();
              }
            }}
          >
            <Slider
              ref={sliderRef}
              className="magazine-pdf-view__slider"
              arrows={false}
              // Its own arrow keys handler sits on the inner list, which can't take focus, so
              // onKeyDown above stands in for it
              accessibility={false}
              dots={false}
              infinite={false}
              slidesToShow={slidesToShow}
              slidesToScroll={currentSlide === 0 ? 1 : slidesToShow}
              beforeChange={(prevSlide, nextSlide) => {
                // react-slick can report a stray negative target while totalPages is
                // transiently 0 (file swap in progress, see the reset effect above) - it
                // never fires afterChange for that transition, so acting on it would leave
                // currentSlide stuck at an invalid negative value
                if (nextSlide < 0) {
                  return;
                }

                setTransitionFromSlide(prevSlide);
                setCurrentSlide(nextSlide);
              }}
              afterChange={() => setTransitionFromSlide(null)}
            >
              {Array.from({
                length: totalPages,
              }, (_, index) => (
                <div key={index}>
                  {(Math.abs(index - currentSlide) <= PAGE_RENDER_BUFFER
                    || (transitionFromSlide !== null
                    && Math.abs(index - transitionFromSlide) <= PAGE_RENDER_BUFFER))
                    && (
                      <Page
                        pageNumber={index + 1}
                        height={pageHeight || undefined}
                        devicePixelRatio={Math.min(window.devicePixelRatio, 3)}
                        renderTextLayer={false}
                        // Neighbouring pages are mounted but hidden, so their links must not be tabbable
                        renderAnnotationLayer={index >= currentSlide && index < currentSlide + slidesToShow}
                      />
                    )}
                </div>
              ))}
            </Slider>
          </div>

          <MagazinePdfViewArrow
            direction="next"
            isDisabled={currentSlide >= totalPages - slidesToShow}
            onClick={() => sliderRef.current?.slickNext()}
          />
        </Document>

        <div
          className="magazine-pdf-view__toolbar"
          style={{
            width: sliderWidth || undefined,
          }}
        >
          <MagazinePdfCounter
            currentSlide={currentSlide}
            totalPages={totalPages}
            slidesToShow={slidesToShow}
          />

          <MagazinePdfFullscreenButton targetId={VIEW_ELEMENT_ID} />
        </div>
      </div>
    </FocusLock>
  );

  function replaceVersionQuery(versionId: MagazinePdfVersionId) {
    const nextQuery = {
      ...router.query,
    };

    if (versionId === DEFAULT_MAGAZINE_PDF_VERSION_ID) {
      delete nextQuery.version;
    } else {
      nextQuery.version = versionId;
    }

    router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      {
        shallow: true,
      },
    );
  }
}
