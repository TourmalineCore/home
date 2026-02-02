import { MutableRefObject } from 'react';
import { useRouter } from 'next/router';

export function SkipLink({
  mainElementRef,
}: {
  mainElementRef: MutableRefObject<null | HTMLElement>;
}) {
  const router = useRouter();

  return (
    <a
      href="#main-content"
      role="button"
      className="skip-link button"
      data-testid="skip-link"
      onClick={() => {
        mainElementRef.current!.focus();
      }}
    >
      {
        router.locale === `ru`
          ? `Перейти к основному контенту`
          : `Skip to main content`
      }
    </a>
  );
}
