import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import IconMaximize from '../../../../../icons/icon-maximize.svg';
import IconMinimize from '../../../../../icons/icon-minimize.svg';
import { MagazinePdfFullscreenButtonStateContext } from './MagazinePdfFullscreenButtonStateContext';

export const MagazinePdfFullscreenButtonContent = observer(({
  onToggleClick,
}: {
  onToggleClick: () => unknown;
}) => {
  const fullscreenButtonState = useContext(MagazinePdfFullscreenButtonStateContext);
  const Icon = fullscreenButtonState.isFullscreen ? IconMinimize : IconMaximize;
  const label = fullscreenButtonState.isFullscreen ? `Свернуть` : `На весь экран`;

  return (
    <button
      type="button"
      className="magazine-pdf-fullscreen-button"
      data-testid="magazine-pdf-fullscreen-button"
      aria-pressed={fullscreenButtonState.isFullscreen}
      aria-label={fullscreenButtonState.isFullscreen ? `Свернуть журнал` : `Развернуть журнал на весь экран`}
      onClick={onToggleClick}
    >
      <Icon
        className="magazine-pdf-fullscreen-button__icon"
        aria-hidden="true"
      />

      <span>
        {label}
      </span>
    </button>
  );
});
