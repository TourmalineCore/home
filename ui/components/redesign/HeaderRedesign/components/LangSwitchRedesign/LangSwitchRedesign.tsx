import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import IconDownArrow from '../../../../../icons/icon-arrow-down-redesign.svg';
import GlobalIcon from '../../../../../icons/global-icon.svg';
import { useAutoClose, useDeviceSize, useOnScrollDirections } from '../../../../../common/hooks';
import { DEFAULT_LOCALE } from '../../../../../common/constants/languages';

type Languages = {
  [key: string]: {
    name: string;
  };
};

const LANGUAGES: Languages = {
  en: {
    name: `EN`,
  },
  ru: {
    name: `RU`,
  },
  zh: {
    name: `中文`,
  },
};

export function LangSwitchRedesign({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const langSwitchRef = useRef<HTMLDivElement>(null);

  useAutoClose(langSwitchRef, setIsOpen);

  const {
    isScrollUp,
  } = useOnScrollDirections();

  // The header hides on scroll down, so the list closes with it instead of sticking out below
  useEffect(() => {
    if (!isScrollUp) {
      setIsOpen(false);
    }
  }, [isScrollUp]);

  const {
    isDesktop,
  } = useDeviceSize();

  return (
    <div
      ref={langSwitchRef}
      className={clsx(
        `lang-switch-redesign`,
        className,
        {
          'lang-switch-redesign--is-open': isOpen,
        },
      )}
      data-testid="lang-switch"
      {...(isDesktop && {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
      })}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        className="lang-switch-redesign__button"
        {...(!isDesktop ? {
          onClick: () => setIsOpen((prev) => !prev),
        } : {
          onFocus: () => setIsOpen(true),
          onBlur: (e) => {
            if (!langSwitchRef.current?.contains(e.relatedTarget as Node)) {
              setIsOpen(false);
            }
          },
        })}
        aria-label={router.locale === `ru`
          ? `Выбрать язык, сейчас выбран ${LANGUAGES[router.locale || DEFAULT_LOCALE].name}`
          : `Select language, currently selected ${LANGUAGES[router.locale || DEFAULT_LOCALE].name}`}
      >
        <GlobalIcon
          aria-hidden="true"
          className="lang-switch-redesign__icon"
        />
        <span>
          {LANGUAGES[router.locale || DEFAULT_LOCALE].name}
        </span>
        <IconDownArrow
          aria-hidden="true"
          className="lang-switch-redesign__arrow"
        />
      </button>

      {router.locales && (
        <ul className="lang-switch-redesign__list">
          {router.locales
            .filter((locale) => locale !== router.locale)
            .map((locale) => (
              <li
                key={locale}
                className="lang-switch-redesign__option"
              >
                <Link
                  href={router.asPath}
                  locale={locale}
                  className="lang-switch-redesign__link"
                >
                  {LANGUAGES[locale].name}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
