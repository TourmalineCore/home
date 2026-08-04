"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Slider from "react-slick";
import { Breakpoint } from '../../../common/enums';
import { useDeviceSize } from '../../../common/hooks';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// A4 page aspect ratio (width / height), used to size the spread
const PAGE_ASPECT_RATIO = 0.7071;

export function MagazinePdfView() {
  const [totalPages, setTotalPages] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    width,
    height,
    isMobile,
  } = useDeviceSize();

  const slidesToShow = isMobile ? 1 : 2;

  // sticky header height, reserved at the top so the header can't covers the spread
  const headerHeight = width >= Breakpoint.DESKTOP_XL ? 104 : 80;
  // side strips reserved for the slider's navigation arrows
  const arrowSpace = width >= Breakpoint.TABLET_XL ? 44 : 34;

  const maxPageWidth = (width - arrowSpace * 2) / slidesToShow;
  const availableHeight = height - headerHeight;
  // width/height are still 0 before useDeviceSize's first resize, skip sizing off an empty viewport
  const pageHeight = width && height
    ? Math.min(availableHeight, maxPageWidth / PAGE_ASPECT_RATIO)
    : 0;
  const sliderWidth = pageHeight * PAGE_ASPECT_RATIO * slidesToShow;

  return (
    <div
      className="magazine-pdf-view"
      data-testid="magazine-pdf-view"
    >
      <div className="magazine-pdf-view__wrapper">
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
