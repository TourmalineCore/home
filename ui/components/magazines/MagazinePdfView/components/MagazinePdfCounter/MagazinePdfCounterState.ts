import { makeAutoObservable } from 'mobx';

export class MagazinePdfCounterState {
  private _currentSlide: number = 0;

  private _totalPages: number = 0;

  private _slidesToShow: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setSlideInfo({
    currentSlide,
    totalPages,
    slidesToShow,
  }: {
    currentSlide: number;
    totalPages: number;
    slidesToShow: number;
  }) {
    this._currentSlide = currentSlide;
    this._totalPages = totalPages;
    this._slidesToShow = slidesToShow;
  }

  get currentPage() {
    return Math.min(this._currentSlide + 1, this._totalPages);
  }

  get currentPageEnd() {
    return Math.min(this._currentSlide + this._slidesToShow, this._totalPages);
  }

  get totalPages() {
    return this._totalPages;
  }
}
