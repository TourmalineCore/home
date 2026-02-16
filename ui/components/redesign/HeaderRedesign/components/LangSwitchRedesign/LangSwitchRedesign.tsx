import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';
import IconDownArrow from '../../../../../icons/icon-arrow-down-redesign.svg';
import GlobalIcon from '../../../../../icons/global-icon.svg';
import { DEFAULT_LOCALE } from '../../../../../common/constants';
import { useOnScrollDirections } from '../../../../../common/hooks';

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

  const {
    isScrollUp,
  } = useOnScrollDirections();

  return (
    <div
      className={clsx(
        `lang-switch-redesign`,
        className,
      )}
      data-testid="lang-switch"
    >
      <button
        type="button"
        className="lang-switch-redesign__button"
        aria-label={router.locale === `ru`
          ? `Выбрать язык`
          : `Select language`}
      >
        <GlobalIcon
          aria-hidden="true"
          className="lang-switch-redesign__icon"
        />
        <span aria-label={
          router.locale === `ru`
            ? `Сейчас выбран`
            : `Currently selected`
        }
        >
          {LANGUAGES[router.locale || DEFAULT_LOCALE].name}
        </span>
        <IconDownArrow
          aria-hidden="true"
          className="lang-switch-redesign__arrow"
        />
      </button>

      {isScrollUp && router.locales && (
        <ul className="lang-switch-redesign__list">
          {router.locales
            .filter((locale) => locale !== router.locale)
            .map((locale) => (
              <li
                key={locale}
                className="lang-switch-redesign__option"
              >
                <Link
                  role="presentation"
                  href={router.asPath}
                  locale={locale}
                  className="lang-switch-redesign__link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (router.locale !== locale) {
                      window.open((e.target as HTMLAnchorElement).href, `_self`);
                    }
                  }}
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
