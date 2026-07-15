"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Slider from "react-slick";
import { useDeviceSize } from '../../../common/hooks';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function MagazinePdfView() {
  const [totalPages, setTotalPages] = useState<number>();
  const [slidesToShow, setSlidesToShow] = useState<number>(2);

  function onDocumentLoadSuccess({
    numPages,
  }: {
    numPages: number;
  }) {
    setTotalPages(numPages);
  }

  const {
    isMobile,
  } = useDeviceSize();

  useEffect(() => {
    if (isMobile) {
      setSlidesToShow(1);
    } else {
      setSlidesToShow(2);
    }
  }, [isMobile]);

  return (
    <div
      className="magazine-pdf-view"
      data-testid="magazine-pdf-view"
    >
      <div className="magazine-pdf-view__wrapper">
        <Document
          file="/documents/magazines/tourmaline-code-tdd-uwdc.pdf"
          // eslint-disable-next-line react/jsx-no-bind
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Slider
            className="magazine-pdf-view__slider"
            dots={false}
            infinite={false}
            slidesToShow={slidesToShow}
            slidesToScroll={slidesToShow}
          >
            {Array.from(
              new Array(totalPages),
              (_, index) => (
                <div
                  key={index}
                >
                  <Page
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ),
            )}
          </Slider>
        </Document>
      </div>
    </div>
  );
}
