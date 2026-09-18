'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'react-pdf/dist/Page/AnnotationLayer.css';

import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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
    <div
      id={VIEW_ELEMENT_ID}
      className="magazine-pdf-view"
      data-testid={VIEW_ELEMENT_ID}
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
          <div
            className="magazine-pdf-view__slider-wrapper"
            style={{
              width: sliderWidth || undefined,
            }}
          >
            <Slider
              className="magazine-pdf-view__slider"
              dots={false}
              infinite={false}
              slidesToShow={slidesToShow}
              slidesToScroll={currentSlide === 0 ? 1 : slidesToShow}
              prevArrow={<MagazinePdfViewArrow direction="prev" />}
              nextArrow={<MagazinePdfViewArrow direction="next" />}
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
                        renderAnnotationLayer
                      />
                    )}
                </div>
              ))}
            </Slider>
          </div>
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
    </div>
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
