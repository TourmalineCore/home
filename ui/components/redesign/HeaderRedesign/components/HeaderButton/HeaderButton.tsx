import clsx from "clsx";
import { ReactNode } from "react";
import { useIsRussianCountry } from "../../../../../common/hooks";

export function HeaderButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick: (isOpen: boolean) => void;
}) {
  const isCountryRus = useIsRussianCountry();

  return (
    isCountryRus ? (
      <button
        className={clsx(
          `header-button`,
          className,
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
        )}
        role="button"
        href="mailto:contact@tourmalinecore.com"
      >
        {children}
      </a>
    )
  );
}
