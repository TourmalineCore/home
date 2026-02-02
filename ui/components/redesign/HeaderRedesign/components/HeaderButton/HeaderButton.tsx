import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

export function HeaderButton({
  children,
  className,
  // onClick,
}: {
  children: ReactNode;
  className?: string;
  // onClick: (isOpen: boolean) => void;
}) {
  return (
    // Todo: uncomment after editing the form
    // <button
    //   className={clsx(
    //     `header-button`,
    //     className,
    //   )}
    //   type="button"
    //   onClick={() => onClick(true)}
    // >
    //   {children}
    // </button>
    <Link
      className={clsx(
        `header-button`,
        className,
      )}
      href="mailto:contact@tourmalinecore.com"
    >
      {children}
    </Link>
  );
}
