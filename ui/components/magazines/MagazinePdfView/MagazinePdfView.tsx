"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Slider from "react-slick";
import { useDeviceSize } from '../../../common/hooks';

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

// The worker has its own global scope, so the polyfill above doesn't apply there,
// this "legacy" build bundles its own shims for older browsers instead.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.8.69/legacy/build/pdf.worker.min.mjs`;

// A4 page aspect ratio (width / height), used to size the spread
const PAGE_ASPECT_RATIO = 0.7071;

export function MagazinePdfView() {
  const [totalPages, setTotalPages] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [maxPageHeight, setMaxPageHeight] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    isMobile,
  } = useDeviceSize();

  const slidesToShow = isMobile ? 1 : 2;

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const sentinelElement = sentinelRef.current;

    if (!wrapperElement || !sentinelElement) {
      return undefined;
    }

    // ResizeObserver reports layout size and ignores pinch-zoom. Two observers: the wrapper's width is stable, but its height depends on
    // the page size being computed here, so the height ceiling comes from the sentinel - a
    // fixed-size element that doesn't depend on the wrapper's own content.
    const wrapperObserver = new ResizeObserver(([entry]) => {
      setWrapperWidth(entry.contentRect.width);
    });
    const sentinelObserver = new ResizeObserver(([entry]) => {
      setMaxPageHeight(entry.contentRect.height);
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

  return (
    <div
      className="magazine-pdf-view"
      data-testid="magazine-pdf-view"
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
          file="/documents/magazines/tourmaline-code-tdd-uwdc.pdf"
          // eslint-disable-next-line react/jsx-no-bind
          onLoadSuccess={({
            numPages,
          }) => setTotalPages(numPages)}
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
              beforeChange={(_, nextSlide) => setCurrentSlide(nextSlide)}
            >
              {Array.from({
                length: totalPages,
              }, (_, index) => (
                <div key={index}>
                  <Page
                    pageNumber={index + 1}
                    height={pageHeight || undefined}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </Document>
      </div>
    </div>
  );
}
