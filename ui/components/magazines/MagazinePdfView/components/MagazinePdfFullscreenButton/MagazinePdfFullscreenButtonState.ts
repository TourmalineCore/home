import { makeAutoObservable } from 'mobx';

export class MagazinePdfFullscreenButtonState {
  private _isFullscreen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isFullscreen() {
    return this._isFullscreen;
  }

  setIsFullscreen({
    isFullscreen,
  }: {
    isFullscreen: boolean;
  }) {
    this._isFullscreen = isFullscreen;
  }
}
