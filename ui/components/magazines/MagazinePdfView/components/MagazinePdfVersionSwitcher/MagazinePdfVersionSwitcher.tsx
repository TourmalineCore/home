import clsx from 'clsx';
import { useRef, useState } from 'react';
import IconArrowDown from '../../../../../icons/icon-arrow-down-redesign.svg';
import { useAutoClose } from '../../../../../common/hooks';
import { getMagazinePdfVersion, MAGAZINE_PDF_VERSIONS, MagazinePdfVersionId } from '../../magazinePdfVersions';

export function MagazinePdfVersionSwitcher({
  selectedVersionId,
  onChange,
}: {
  selectedVersionId: MagazinePdfVersionId;
  onChange: (versionId: MagazinePdfVersionId) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  useAutoClose(rootRef, setIsOpen);

  const selectedVersion = getMagazinePdfVersion(selectedVersionId);

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
          {`${selectedVersion.label} · ${selectedVersion.pagesCount} стр.`}
        </span>

        <IconArrowDown
          aria-hidden="true"
          className="magazine-pdf-version-switcher__trigger-icon"
        />
      </button>

      <ul
        className="magazine-pdf-version-switcher__list"
        role="listbox"
        aria-label="Версия журнала"
      >
        {MAGAZINE_PDF_VERSIONS.map((version) => (
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
                  {version.label}
                </span>

                <span className="magazine-pdf-version-switcher__option-meta">
                  {`${version.pagesCount} стр.`}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
