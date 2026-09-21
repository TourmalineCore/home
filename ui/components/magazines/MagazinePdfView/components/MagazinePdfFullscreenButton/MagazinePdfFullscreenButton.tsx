import IconMaximize from '../../../../../icons/icon-maximize.svg';
import IconMinimize from '../../../../../icons/icon-minimize.svg';

export function MagazinePdfFullscreenButton({
  targetId,
  isFullscreen,
  onClick,
}: {
  targetId: string;
  isFullscreen: boolean;
  onClick: () => void;
}) {
  const Icon = isFullscreen ? IconMinimize : IconMaximize;

  return (
    <button
      type="button"
      className="magazine-pdf-fullscreen-button"
      data-testid="magazine-pdf-fullscreen-button"
      aria-controls={targetId}
      aria-label={isFullscreen ? `Свернуть журнал` : `Развернуть журнал на весь экран`}
      onClick={onClick}
    >
      <Icon
        className="magazine-pdf-fullscreen-button__icon"
        aria-hidden="true"
      />

      <span>
        {isFullscreen ? `Свернуть` : `На весь экран`}
      </span>
    </button>
  );
}
