import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { LangSwitchRedesign } from "./components/LangSwitchRedesign/LangSwitchRedesign";
import { HeaderButton } from "./components/HeaderButton/HeaderButton";
import { MobileMenu } from "./components/MobileMenuRedesign/MobileMenuRedesign";
import { useBodyScrollHidden } from "../../../common/hooks/useBodyScrollHidden";
import { HeaderRedesignProps } from "../../../common/types";
import { useDeviceSize, useOnScrollDirections } from "../../../common/hooks";
import { HeaderNavigationList } from "./components/HeaderNavigationList/HeaderNavigationList";
import { AppRoute } from "../../../common/enums";
import { FormModal } from "../../FormModal/FormModal";

export function HeaderRedesign({
  navigationLists,
  buttonLabel,
  emailCaption,
  emailAddress,
  socialLinks,
}: HeaderRedesignProps) {
  const {
    isTabletXl,
  } = useDeviceSize();

  const {
    asPath,
  } = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  useBodyScrollHidden(isMobileMenuOpen);

  const {
    isScrollUp,
  } = useOnScrollDirections();

  const {
    locale,
  } = useRouter();

  return (
    <header
      className={clsx(`header-redesign`, {
        'header-redesign--hidden': !isScrollUp && !isMobileMenuOpen,
      })}
      data-testid="header-redesign"
    >
      <div className="header-redesign__inner container-redesign">
        <Link
          className="header-redesign__logo-wrapper"
          href={AppRoute.Main}
          aria-label={
            locale === `ru`
              ? `Ссылка на главную страницу`
              : `Link to home page`
          }
        >
          <Image
            src="/images/logo.png"
            alt="Tourmaline core logo"
            aria-hidden="true"
            fill
          />
        </Link>

        <HeaderNavigationList
          className="header-redesign__nav"
          navigationLists={navigationLists}
        />

        <LangSwitchRedesign className="header-redesign__lang-switch" />

        <button
          className={clsx(`header-redesign__burger`, {
            'header-redesign__burger--open': isMobileMenuOpen,
          })}
          data-testid="header-redesign-burger"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={
            locale === `ru`
              ? `Открыть мобильное меню`
              : `Open mobile menu`
          }
        >
          <span className="header-redesign__line" />
          <span className="header-redesign__line" />
        </button>

        {isTabletXl && buttonLabel && (
          <HeaderButton
            className="header-redesign__button"
            onClick={setIsModalOpen}
          >
            {buttonLabel}
          </HeaderButton>
        )}
      </div>

      {isMobileMenuOpen && !isTabletXl && (
        <MobileMenu
          navigationLists={navigationLists}
          buttonLabel={buttonLabel}
          emailCaption={emailCaption}
          emailAddress={emailAddress}
          socialLinks={socialLinks}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isModalOpen && <FormModal setIsOpen={setIsModalOpen} />}
    </header>
  );
}
