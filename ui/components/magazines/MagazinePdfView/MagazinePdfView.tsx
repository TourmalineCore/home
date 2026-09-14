"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Slider from "react-slick";
import clsx from 'clsx';
import IconChevronLeft from '../../../icons/icon-chevron-left.svg';
import IconChevronRight from '../../../icons/icon-chevron-right.svg';
import { Breakpoint } from '../../../common/enums';
import { MagazinePdfLoader } from "./components/MagazinePdfLoader/MagazinePdfLoader";
import { MagazinePdfCounter } from "./components/MagazinePdfCounter/MagazinePdfCounter";
import { MagazinePdfCounterState } from "./components/MagazinePdfCounter/MagazinePdfCounterState";
import { MagazinePdfCounterStateContext } from "./components/MagazinePdfCounter/MagazinePdfCounterStateContext";
import { MagazinePdfFullscreenButton } from "./components/MagazinePdfFullscreenButton/MagazinePdfFullscreenButton";
import { MagazinePdfFullscreenButtonState } from "./components/MagazinePdfFullscreenButton/MagazinePdfFullscreenButtonState";
import { MagazinePdfFullscreenButtonStateContext } from "./components/MagazinePdfFullscreenButton/MagazinePdfFullscreenButtonStateContext";

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

// Self-hosted (copied into /public by scripts/copy-pdf-worker.mjs) instead of pulled from a
// CDN, so a third-party outage or rate limit can't block rendering. The worker runs in its own
// global scope, so the polyfill above doesn't reach it; the "legacy" build ships its own shims
// for older browsers.
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

const PDF_FILE_PATH = `/documents/magazines/tourmaline-code-tdd-uwdc.pdf`;

// A4 page aspect ratio (width / height), used to size the spread
const PAGE_ASPECT_RATIO = 0.7071;

const PAGE_RENDER_BUFFER = 1;

// react-slick clones this element and merges in className/style/onClick (plus a disabled
// variant of className when there's nowhere left to go), so those props - not our own JSX -
// drive the actual rendered attributes; see react-slick's PrevArrow/NextArrow for the merge.
function MagazinePdfViewArrow({
  direction,
  className,
  style,
  onClick,
}: {
  direction: 'prev' | 'next';
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  const Icon = direction === `prev` ? IconChevronLeft : IconChevronRight;

  return (
    <button
      type="button"
      className={clsx(`magazine-pdf-view__arrow-button`, className)}
      style={style}
      onClick={onClick}
      aria-label={direction === `prev` ? `Предыдущий разворот` : `Следующий разворот`}
    >
      <Icon
        className="magazine-pdf-view__arrow-icon"
        aria-hidden="true"
      />
    </button>
  );
}

export function MagazinePdfView() {
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

  const viewRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const counterState = useMemo(() => new MagazinePdfCounterState(), []);
  const fullscreenButtonState = useMemo(() => new MagazinePdfFullscreenButtonState(), []);

  const slidesToShow = wrapperWidth >= Breakpoint.TABLET ? 2 : 1;

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const sentinelElement = sentinelRef.current;

    if (!wrapperElement || !sentinelElement) {
      return undefined;
    }

    // ResizeObserver reports layout size and ignores pinch-zoom. Two observers: the wrapper's
    // width is stable, but its height depends on the page size being computed here, so the
    // height ceiling comes from the sentinel - a fixed-size element that doesn't depend on the
    // wrapper's own content. Rounded so sub-pixel jitter between callbacks doesn't re-trigger a
    // re-render of every mounted page.
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

  // wrapperWidth/maxPageHeight are still 0 before the observers' first callback, skip sizing off an empty box
  const pageHeight = wrapperWidth && maxPageHeight
    ? Math.min(maxPageHeight, wrapperWidth / slidesToShow / PAGE_ASPECT_RATIO)
    : 0;
  const sliderWidth = pageHeight * PAGE_ASPECT_RATIO * slidesToShow;

  const progressText = loadProgress && loadProgress.total > 0
    ? `Загрузка журнала: ${Math.round((loadProgress.loaded / loadProgress.total) * 100)}%`
    : `Загрузка журнала...`;

  return (
    <>
      {!isPdfReady && (
        <MagazinePdfLoader progressText={progressText} />
      )}

      <div
        className="magazine-pdf-view"
        style={{
          display: isPdfReady ? `block` : `none`,
        }}
        data-testid="magazine-pdf-view"
        ref={viewRef}
      >
        <div
          className="magazine-pdf-view__viewport-sentinel"
          aria-hidden
          ref={sentinelRef}
        />

        <div
          className="magazine-pdf-view__wrapper"
          ref={wrapperRef}
        >
          <Document
            file={PDF_FILE_PATH}
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
                        renderAnnotationLayer={false}
                      />
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </Document>

          <MagazinePdfCounterStateContext.Provider value={counterState}>
            <MagazinePdfFullscreenButtonStateContext.Provider value={fullscreenButtonState}>
              <div className="magazine-pdf-view__toolbar">
                <MagazinePdfCounter
                  currentSlide={currentSlide}
                  totalPages={totalPages}
                  slidesToShow={slidesToShow}
                />

                <MagazinePdfFullscreenButton targetRef={viewRef} />
              </div>
            </MagazinePdfFullscreenButtonStateContext.Provider>
          </MagazinePdfCounterStateContext.Provider>
        </div>
      </div>
    </>
  );
}
