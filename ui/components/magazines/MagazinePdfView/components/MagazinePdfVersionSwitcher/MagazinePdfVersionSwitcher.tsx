import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { useRef, useState } from 'react';
import IconArrowDown from '../../../../../icons/icon-arrow-down-redesign.svg';
import { useAutoClose } from '../../../../../common/hooks';
import { getMagazinePdfVersion, MagazinePdfVersion, MagazinePdfVersionId } from '../../magazinePdfVersions';

export function MagazinePdfVersionSwitcher({
  versions,
  selectedVersionId,
  onChange,
}: {
  versions: MagazinePdfVersion[];
  selectedVersionId: MagazinePdfVersionId;
  onChange: (versionId: MagazinePdfVersionId) => void;
}) {
  const {
    t,
  } = useTranslation(`magazinePdfView`);

  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  useAutoClose(rootRef, setIsOpen);

  const selectedVersion = getMagazinePdfVersion({
    versions,
    versionId: selectedVersionId,
  });

  return (
    <div
      ref={rootRef}
      className={clsx(`magazine-pdf-version-switcher`, {
        'magazine-pdf-version-switcher--is-open': isOpen,
      })}
      data-testid="magazine-pdf-version-switcher"
    >
      <button
        type="button"
        className="magazine-pdf-version-switcher__trigger"
        data-testid="magazine-pdf-version-switcher-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>
          {`${t(`versions.${selectedVersion.id}`)} · ${t(`pagesCount`, {
            count: selectedVersion.pagesCount,
          })}`}
        </span>

        <IconArrowDown
          aria-hidden="true"
          className="magazine-pdf-version-switcher__trigger-icon"
        />
      </button>

      <ul
        className="magazine-pdf-version-switcher__list"
        role="listbox"
        aria-label={t(`versionSwitcherAriaLabel`)}
      >
        {versions.map((version) => (
          <li key={version.id}>
            <button
              type="button"
              role="option"
              className="magazine-pdf-version-switcher__option"
              data-testid={`magazine-pdf-version-switcher-option-${version.id}`}
              aria-selected={version.id === selectedVersionId}
              onClick={() => {
                onChange(version.id);
                setIsOpen(false);
              }}
            >
              <span
                className="magazine-pdf-version-switcher__option-marker"
                aria-hidden="true"
              />

              <span className="magazine-pdf-version-switcher__option-text">
                <span className="magazine-pdf-version-switcher__option-label">
                  {t(`versions.${version.id}`)}
                </span>

                <span className="magazine-pdf-version-switcher__option-meta">
                  {t(`pagesCount`, {
                    count: version.pagesCount,
                  })}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
