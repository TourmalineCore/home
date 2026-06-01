import clsx from "clsx";
import { ReactNode } from "react";
import { useIsRussianCountry } from "../../../../../common/hooks";

export function HeaderButton({
  children,
  className,
  onClick,
  isMobileMenu,
}: {
  children: ReactNode;
  className?: string;
  onClick: (isOpen: boolean) => void;
  isMobileMenu: boolean;
}) {
  const isCountryRus = useIsRussianCountry();

  return (
    isCountryRus ? (
      <button
        className={clsx(
          `header-button`,
          className,
          {
            'header-button--mobile-menu': isMobileMenu,
          },
        )}
        type="button"
        onClick={() => onClick(true)}
      >
        {children}
      </button>
    ) : (
      <a
        className={clsx(
          `header-button`,
          className,
          {
            'header-button--mobile-menu': isMobileMenu,
          },
        )}
        role="button"
        href="mailto:contact@tourmalinecore.com"
      >
        {children}
      </a>
    )
  );
}
