import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export function SmartLink({
  href,
  className,
  children,
  ...props
}: LinkProps & PropsWithChildren & {
  className: string;
  href: string;
}) {
  const isExternal = /^(https?:)?\/\//.test(href);

  return isExternal ? (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ) : (
    <Link
      href={href}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
