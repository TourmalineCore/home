import clsx from 'clsx';
import { ReactNode, useRef } from 'react';
import { useRouter } from 'next/router';
import { Footer } from '../Footer/Footer';
import { SkipLink } from '../SkipLink/SkipLink';
import { isChineseLanguage } from '../../common/utils';
import { HeaderRedesign } from '../redesign/HeaderRedesign/HeaderRedesign';
import { HeaderRedesignProps } from '../../common/types';

export function Layout({
  children,
  headerContent,
  mainClassName,
}: {
  children: ReactNode;
  headerContent: HeaderRedesignProps;
  mainClassName?: string;
}) {
  const {
    locale,
  } = useRouter();

  const mainElementRef = useRef<null | HTMLDivElement>(null);

  return (
    <div className={clsx(`layout`, {
      'layout--zh': isChineseLanguage(locale),
    })}
    >
      <SkipLink
        mainElementRef={mainElementRef}
      />
      <HeaderRedesign
        navigationLists={headerContent.navigationLists}
        buttonLabel={headerContent.buttonLabel}
        emailCaption={headerContent.emailCaption}
        emailAddress={headerContent.emailAddress}
        socialLinks={headerContent.socialLinks}
      />
      <main
        id="main-content"
        ref={mainElementRef}
        className={mainClassName}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
